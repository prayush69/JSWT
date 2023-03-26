
const express=require('express')
const dotenv=require('dotenv')
const app=express()
const connectDB=require('./database/database')
const path=require('path')

const mainRouter=require('./routes/main')


//PORT
dotenv.config({path:"config/config.env"})



const notFoundMiddleware=require('./middleware/notFound')
const errorHandlerMiddleware=require('./middleware/errorHandler')



const { dirname } = require('path')
const errorMiddleware = require('./middleware/errorMiddleware')


//middleware
app.use(express.json())
app.use('/api/v1',mainRouter)

app.use(express.static('./public'))



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)






app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port ${process.env.PORT}`)

})

connectDB()

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname + './public/index.html'))

// })


