import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.SE;

// user token 
export const generateToken = (email)=>{
    return jwt.sign({data: email}, secretKey, {expiresIn: "1d"})
}

// admin's token 
export const adminToken = (user)=>{
    return jwt.sign({data: user.id, role: user.role}, secretKey, {expiresIn: "1d"})
}