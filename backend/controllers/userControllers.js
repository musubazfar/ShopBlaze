import AsyncHandler from "../middleware/AsyncHnadler.js";
import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import generateToken from "../Utils/generateToken.js";

const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user.id)
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
    const {name, email, password} = req.body;
    const userExist = await userModel.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error("User Already Exists")
    }

    const user = await userModel.create({
        name,
        email,
        password
    })
    console.log(user)

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error("Inavlid user Data")
    }
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
    const user = await userModel.findById(req.user._id)
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else{
        res.status(404);
        throw new Error('User not Found')
    }
})

const updateUserProfile = AsyncHandler(async(req,res)=>{
    const user = await userModel.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name, 
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not Found')
    }
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