const jwt = require('jsonwebtoken')
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");


const protect = asyncHandler(async (req,res, next) =>{
    let token

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
        
    ){;
        try{
            token = req.headers.authorization.split(" ")[1]
            //decode token id

            const decode = jwt.verify(token, "chat");

            req.user = await User.findById(decode.id).select('-password')

            next()

        }catch(error){
            res.status(401)
            throw new Error(error + 'Not Authorized, Token Failed ')
        }
    }


    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = {protect}