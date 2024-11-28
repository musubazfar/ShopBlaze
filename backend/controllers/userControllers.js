import AsyncHandler from "../middleware/AsyncHnadler.js";
import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'

const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
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

const logoutUser = AsyncHandler(async(req,res)=>{
    res.send('Logout User')
})

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