import bcrypt from 'bcrypt'
import Instructor from '../models/instructorModel.js'
import { adminToken } from '../utils/generateToken.js'

export const signUp = async (req, res)=>{
    try {
        // console.log("req.body : ", req.body)

        const {email, password, name} = req.body

        const instructorExist = await Instructor.findOne({email})
        if(instructorExist) return res.send("Instructor already exist")

        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const newInstructor = new Instructor({
            name,
            email,
            hashPassword,
            role : "instructor"
        })

        const newInstructorCreated = await newInstructor.save()
        if(!newInstructorCreated) return res.send("Instructor sign-up failed")

        const token = adminToken(newInstructorCreated)
        res.cookie("token", token)
        res.json({message: "Signed-In", token})
    } catch (error) {
        console.log("Error occured in Instructor sign-up", error)
    }
}

// Instructor sign-In 
export const signIn = async (req, res)=>{
    try {
        // const body = req.body
        const {email, password} = req.body
        // console.log("Instructor sign-in body : ",req.body)

        const instructorExist = await Instructor.findOne({email})
        if(!instructorExist) return res.send("Instructor not found")

        const matchPassword = await bcrypt.compare(password, instructorExist.hashPassword)

        if(!matchPassword) return res.send("Password does not match")

        const token = adminToken(instructorExist)
        res.cookie("token", token)
        res.json({message: "Logged-In", token})
    } catch (error) {
        console.log("Error occured in Instructor Sign-In :", error)
        res.send(error)
    }
}

// Show all Instructors 
export const getAllInstructors = async (req, res) => {
    const instructors = await Instructor.find()
    return res.send(instructors)
}

// Delete/Remove Instructor 
export const removeInstructor = async (req, res)=>{
    const {id} = req.params
    console.log(id)

    const instructor = await Instructor.find({_id: id})
    if(!instructor) return res.send("Instructor not found")

    const remove = await Instructor.deleteOne({_id: id})
    if(!remove) return res.send("Instructor deletion not successful")

    return res.send("Instructor successfully deleted")
}