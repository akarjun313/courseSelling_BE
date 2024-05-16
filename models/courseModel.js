import mongoose from "mongoose"


const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 30,
        unique : true
    },
    description : {
        required : true,
        type : String,
        maxLength : 100,
        minLength : 3
    },
    price : {
        required : true,
        type : Number
    },
    image : {
        type : String
    },
    instructor : [{type : mongoose.Types.ObjectId, ref : "Instructor"}],
},
{ timestamps : true })

const Course = mongoose.model('Course', courseSchema)
export default Course