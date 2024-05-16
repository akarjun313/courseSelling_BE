import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 3,
        maxLength : 30
    },
    hashPassword : {
        type : String,
        required : true,
        minLength : 6
    },
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    lastName : {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 20
    },
    courses : [{type : mongoose.Types.ObjectId, ref: "Course"}]
}, {timestamps: true})



const User = mongoose.model('User', userSchema)
export default User