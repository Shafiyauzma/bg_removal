import { Webhook } from "svix"
import userModel from "../models/userModel.js"
import razorpay from 'razorpay'
import dotenv from 'dotenv'
import transactionModel from "../models/transactionModel.js"

dotenv.config()
//API Controller Function to manage Clerk user with database
//http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req,res) =>{

    try{

        // create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers['svix-timestamp'],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data,type} = req.body

        switch(type){
            case "user.created":{

                const userData ={
                    clerkId:data.id,
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }

                await userModel.create(userData)
                res.json({})
                break;
            }

            case "user.updated":{

                const userData ={
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }

                await userModel.findOneAndUpdate({clerkId:data.id},userData,{ upsert: true })
                res.json({})
                break;
            }

            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})
                break;
            }
        }

    }catch{
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export {clerkWebhooks}


//API Controller fuction to get user available credits data
const userCredits = async (req,res)=>{
    try{

        //clerkid come from after verification of token
        const { clerkId } = req.body

        if (!clerkId) {
            return res.json({
                success: false,
                message: "Missing Clerk ID",
            });
        }

        const userData = await userModel.findOne({clerkId})

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success:true,
            credits:userData.creditBalance,
        })

    }catch(error){
        console.log(error.message)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

//gateway initialize
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

// API to make payment for credits
export const paymentRazorpay = async (req,res)=>{
    try{

        const {clerkId, planId} = req.body
        const userData = await userModel.findOne({clerkId})

        if(!userData || !planId){
            return res.json({
                success:false,
                message:'Invalid Credentials'
            })
        }

        let credits,plan,amount,date

        switch (planId) {

            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
        
            default:
                break;
        }

        date = Date.now()

        //creating transaction
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount : amount * 100,
            currency: process.env.CURRENCY,
            receipt:newTransaction._id,
        }

        await razorpayInstance.orders.create(options,(error,order)=>{

            if(error){
                return res.json({
                    success:false,
                    message:error.message
                })
            }
            
            if (!order || !order.id) {
                return res.json({
                    success: false,
                    message: 'Order creation failed',
                });
            }
        
            return res.json({
                success:true,
                order
            })
        })

    }catch(error){
        console.log(error.message)
        res.json({
            success: false,
            message:error.message
        })
    }
}

//API Controller function to verify razorpay payment
export const verifyRazorpay = async (req,res)=>{

    try {

        const { razorpay_order_id } = req.body
        
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){

            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                res.json({
                   success:false,
                   message:'Payment Failed'
                })
            }

            //Adding credits in user data
            const userData = await userModel.findOne({
                clerkId:transactionData.clerkId
            })
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})

            // making the payment true
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

            res.json({
                success:true,
                message:"Credits Added"

            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message:error.message
        })
    }

}

export default userCredits