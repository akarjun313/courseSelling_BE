import mongoose from "mongoose"

const instructorSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minLength : 5,
        maxLength : 20
    },
    email : {
        required : true,
        type : String,
        unique : true,
        minLength : 3
    },
    role : {
        type : String,
        required : true,
        enum : ["instructor", "admin"]
    },
    hashPassword : {
        type : String,
        required : true,
        minLength : 6
    },
    courses : [{type : mongoose.Types.ObjectId, ref : "Course"}]
},{ timestamps : true })

const Instructor = mongoose.model('Instructor', instructorSchema)
export default Instructor