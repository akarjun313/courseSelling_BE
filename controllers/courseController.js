import { cloudinaryInstance } from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import Instructor from "../models/instructorModel.js";

// get Courses 
export const getCourses = async (req, res) => {
    const courses = await Course.find()
    res.send(courses)
}

// create courses
export const createCourse = async (req, res) => {
    try {
        console.log("hitted on createCourse function") 
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" })
        }
        console.log("file uploaded, moving to cloudinary")

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log("Error", err)
                return res.status(400).json({ success: false, message: "Error" })
            }

            // console.log(result)

            const imageUrl = result.url
            // const body = req.body
            // console.log("body", body)

            const { title, description, price, instructorEmail } = req.body

            const findInstructor = await Instructor.findOne({ email: instructorEmail })
            if (!findInstructor) return res.send("Please add instructor first").status(400)

            const createNewCourse = new Course({
                title,
                description,
                price,
                instructor: findInstructor._id,
                image: imageUrl
            })

            const newCourseCreated = await createNewCourse.save()
            if (!newCourseCreated) return res.send("new course not created")

            return res.send("New course created")
        })


    } catch (error) {
        console.log("Error occured at course creation :", error)
        res.status(400).send("Failed to create new course ERROR OCCURED :")
    }
}

// update course 
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params

        const { title, description, price, instructor } = req.body

        const updatedCourse = await Course.findOneAndUpdate(
            { _id: id },
            { title, description, price, instructor },
            {
                new: true
            }
        )

        if (!updatedCourse) return res.send("Course updation failed")

        console.log("course updated")
        return res.send(updatedCourse)

    } catch (error) {
        console.log("Error : ", error)
        res.send(error).status(400)
    }
}


// course deletion 
export const deleteCourse = async (req, res)=>{
    const {id} = req.params

    const courseDeleteId = await Course.deleteOne({_id: id})

    if(!courseDeleteId) return res.send("Course deletion failed")

    console.log("Course deleted")
    return res.send("course deletion successful")
}