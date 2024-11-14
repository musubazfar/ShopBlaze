import express from 'express';
import dotenv from 'dotenv';
import productsRoute from './routes/ProductsRoute.js'
dotenv.config();
import connectDb from './config/db.js';
connectDb();
const port = process.env.PORT || 5000;
const app = express();
 

app.get('/', (req, res)=>{
    res.send('App running')
})

app.use('/api/products', productsRoute)


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})