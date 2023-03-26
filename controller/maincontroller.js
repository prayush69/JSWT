
const jwt=require('jsonwebtoken')

const CustomAPIError=require('../error/CustomAPIError')
const NewErrorHandler = require('../error/newErrorHanlder')




const login=async(req,res,next)=>{
    const{username,password}=req.body
    
    if(!username || !password){
       return next(new CustomAPIError('Please provide proper details',400))
     
        
      
    }
    const id= new Date().getDate()
    //sign accept 3 arguments 
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})

}



const dashboard=async(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)


    }
    const token = authHeader.split(' ')[1]


    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const luckyNumber=Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello Mr ${decode.username} `, secret:`your lucky number is ${luckyNumber}`})
    } catch (error) {
        return next( new CustomAPIError('Not authorized to access this data , First create user ',400))

      
    }
    
    
}

module.exports={
    login,dashboard

}