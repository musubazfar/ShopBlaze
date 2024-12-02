import AsyncHandler from "../middleware/AsyncHnadler.js";
import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24
        })
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Incorrect Credentials');
    }
});

const registerUser = AsyncHandler(async(req,res)=>{
    res.send('User Registered')
})

const logoutUser = AsyncHandler(async (req, res) => {
    // Check if the 'jwt' cookie exists
    if (!req.cookies.jwt) {
        return res.status(400).json({ message: 'No cookie found, cannot log out.' });
    }

    // Clear the cookie by setting it to an empty value and expiring it
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: 'Logged out successfully.' });
});

const getUserProfile = AsyncHandler(async(req,res)=>{
    res.send('User Profile Fetched')
})

const updateUserProfile = AsyncHandler(async(req,res)=>{
    res.send('User Profile Updated by updateUserProfile')
})

const getUsers = AsyncHandler(async(req,res)=>{
    res.send('Users fetched in Get Users')
})

const getUsersByID = AsyncHandler(async(req,res)=>{
    res.send('Users fetched in getUsersbyID')
})

const updateUser = AsyncHandler(async(req,res)=>{
    res.send('User updated by admin updateUser')
})

const deleteUser = AsyncHandler(async(req,res)=>{
    res.send('Deleted User')
})


export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUsersByID, updateUser, deleteUser}