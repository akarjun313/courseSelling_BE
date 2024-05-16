// INSTRUCTOR AND COURSE ROUTES

import express from 'express'
import { getCourses, createCourse, deleteCourse, updateCourse } from '../controllers/courseController.js'
import { getAllInstructors, signIn, signUp, removeInstructor } from '../controllers/instructorController.js'
import upload from '../middlewares/multerMiddleware.js'
import authenticateAdmin from '../middlewares/adminAuth.js'
import authenticateInstructor from '../middlewares/instructorAuth.js'


const instructorRouter = express.Router()

// instructor routes 
instructorRouter.post("/signup", signUp)
instructorRouter.post("/signin", signIn)
instructorRouter.get("/get-instructors", getAllInstructors)
instructorRouter.delete("/delete-instructor/:id", authenticateInstructor, removeInstructor)


// course routes 
instructorRouter.get("/get-courses", getCourses)
instructorRouter.post("/add-course", authenticateAdmin, upload.single("image"), createCourse)
instructorRouter.put("/update-course/:id", authenticateAdmin, updateCourse)
instructorRouter.delete("/delete-course/:id", authenticateAdmin, deleteCourse)

export default instructorRouter