import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function authenticateInstructor(req, res, next){
    console.log("hitted on authenticate instructor")
    const token = req.cookies.token

    jwt.verify(token, process.env.SE, (err, user)=>{
        console.log(err)

        if(err) return res.status(400).send("token missing or not valid", err)
        
        req.user = user

        console.log(req.user.role)

        if(req.user.role !== "admin" && req.user.role !== "instructor") return res.send("User not authenticated")
        
        console.log("moving to next functioning")
        next()
    })
}

export default authenticateInstructor