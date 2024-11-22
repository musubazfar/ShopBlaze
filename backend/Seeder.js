import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'
import Users from "./data/Users.js";
import products from "./data/products.js";
import UserModel from "./model/userModel.js";
import productsModel from "./model/ProductModel.js";
import Order from "./model/orderModel.js";
import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const importData = async()=>{
    try{
        await Order.deleteMany();
        await productsModel.deleteMany();
        await UserModel.deleteMany();

        const createUser = await UserModel.insertMany(Users)
        const adminuser = createUser[0]._id;
        const sampleProduct = products.map((product)=>{
            return {...product, user:adminuser}
        });
        await productsModel.insertMany(sampleProduct)
        console.log("Data inserted".green.inverse)
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}
const deleteData = async()=>{
    try{
        await Order.deleteMany();
        await productsModel.deleteMany();
        await UserModel.deleteMany();

        console.log("Data Deleted".red.inverse)
        process.exit();
    }catch(error){
        console.error(`${error}`.orange.inverse);
        process.exit(1)
    }
}

if(process.argv[2]=== '-d'){
    deleteData();
} else{
    importData();
}