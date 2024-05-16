import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// console.log(process.env.DB_URL)


export async function connectDb(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connected successfully')
        
    } catch (error) {
        console.log('Failed to connect DB '+ error)
    }
}


 