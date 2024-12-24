import express from 'express'
import userCredits, { clerkWebhooks, paymentRazorpay, verifyRazorpay } from '../controller/userController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-razor',authUser,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)

export default userRouter