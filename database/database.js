
const mongoose=require('mongoose')

const connectDB=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/JSWT')
    console.log('Connected to MongoDB')
}


module.exports=connectDB