import express from 'express'
import { signIn, signUp } from '../controllers/userController.js'
import authenticateUser from '../middlewares/userAuth.js'

const userRouter = express.Router()

userRouter.get('/', (req, res) =>{
    res.send("user routes")
})

userRouter.post('/signup', authenticateUser, signUp)

userRouter.post('/signin', signIn)

export default userRouter