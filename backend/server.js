import express from 'express';
import products from './data/products.js'
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
connectDb();
const port = process.env.PORT || 5000;
const app = express();
 

app.get('/', (req, res)=>{
    res.send('App running')
})

app.get('/api/products', (req, res)=>{
    res.json(products)
})

app.get('/api/products/:id', (req, res)=>{
    res.json(products.find((p)=> p._id === req.params.id))
})

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})