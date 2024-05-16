import express from 'express'
import { connectDb } from '../config/db.js'
import userRouter from '../routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import instructorRouter from '../routes/instructorRoutes.js'

const app = express()

const port = 3050

// middlewares 
app.use(express.json())
app.use(cookieParser())

// route to 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/instructor', instructorRouter)


// DB connection 
connectDb()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)

})