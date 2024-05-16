import bcrypt from "bcrypt"
import { generateToken } from '../utils/generateToken.js'
import User from '../models/userModel.js'


// user sign-up 
export const signUp = async (req, res) => {

    try {
        const { firstName, lastName, password, email } = req.body
        
        const userExist = await User.findOne({ email })
        // console.log(userExist)
        if (userExist) {
            return res.send('user already exist')
        }

        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            email,
            firstName,
            lastName,
            hashPassword
        })
        
        // saving the user to DB 
        const userToDb = await newUser.save()

        

        if (!newUser) {
            console.log('new user not created')
            return res.send('new user not created')
        }

        if(!userToDb) return res.send('user created but not saved into DB').status(400)

        console.log("new user created successfully")

        const token = generateToken(email)
        res.cookie("token", token)
        res.send("Token created successfully, Sign-Up successfull")
        console.log("new user signed-In")
        
    } catch (error) {
        console.log(error)
        return res.send("error : "+ error)
    }
}


// user sign-in 
export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const userExist = await User.findOne({email})

        if(!userExist){
            console.log("user not exist")
            return res.send("user not exist. Create a user first")
        }

        const matchPassword = await bcrypt.compare(password, userExist.hashPassword)
        if(!matchPassword){
            console.log('Wrong password')   
            return res.send('Password entered is incorrect')
        }

        const token = generateToken(email)
        res.cookie("token", token)
        res.send("token created successfully, Logged In")
        console.log("Logged In")

    } catch (error) {
        console.log("error in Sign-In : "+ error)
        return res.send("error : "+ error)
    }
}