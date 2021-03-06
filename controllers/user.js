const env = process.eventNames.NODE_ENV || 'development'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const config = require('../config/config')[env]


const generateToken = data =>{
    const token = jwt.sign(data, config.privateKey)
    
    return token
}

const saveUser = async (req, res)=>{
    const{
        username,
        password
    }=req.body

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

   
        const user = new User({
            username,
            password: hashedPassword
        })
    
       const userObject =  await user.save()

       const token = generateToken({
        userID: userObject._id,
        username: userObject.username
       })
    
       res.cookie('aid', token)

    
       return true
}

const verifyUser = async (req, res)=>{
    const{
        username,
        password
    }=req.body

    //get User by username
    const user = await User.findOne({username})
    

  const status = await bcrypt.compare(password, user.password)

  if(status){

    const token = generateToken({
        userID: user._id,
        username: user.username
       })
    
       res.cookie('aid', token)

  }
  
  
  return status
  
}

module.exports = {
    saveUser,
    verifyUser
}