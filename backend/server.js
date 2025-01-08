import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import productsRoute from './routes/ProductsRoute.js'
import orderRoute from './routes/orderRoutes.js'
import userRoute from './routes/UsersRoute.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDb from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
connectDb();
const port = process.env.PORT || 5000;
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('App running')
})

//Routes End Points
app.use('/api/products', productsRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoutes)
app.use('/api/config/paypal', (req, res)=> res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Error handlers
app.use(notFound)
app.use(errorHandler)


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})