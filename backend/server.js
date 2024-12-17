import express from 'express';
import dotenv from 'dotenv';
import productsRoute from './routes/ProductsRoute.js'
import orderRoute from './routes/orderRoutes.js'
import userRoute from './routes/UsersRoute.js'
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

app.use('/api/products', productsRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use(notFound)
app.use(errorHandler)


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})