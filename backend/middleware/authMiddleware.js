import jwt from 'jsonwebtoken'
import AsyncHandler from './AsyncHnadler.js'
import Users from '../model/userModel.js'


const protect = AsyncHandler(async(req, res, next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await Users.findById(decoded.userId)
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Token Failed')
        }
    } else {
        res.status(401);
        throw new Error("Authentication Failed. No Token")
    }
})

const admin = AsyncHandler(async(req,res,next)=>{
    console.log(req.user)
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401)
        throw new Error("Unauthorized. Admin Access Only");
        
    }
})

export {protect, admin};