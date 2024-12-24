import jwt from 'jsonwebtoken'

//middleware function to decode jwt token to get clerkid
const authUser = async (req,res,next) =>{
    try{

        // console.log('Request object:', req);

        const { token } = req.headers

        // console.log('Retrieved token:', token);
        if(!token){
            return res.json({
                success:false,
                message:'Not Authorize Login Again'
            })
        }
        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId
        next()

    }catch(error){
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authUser

