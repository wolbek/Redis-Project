import express from 'express'
import hashRoutes from './routes/hashRoutes.js';
import stringRoutes from './routes/stringRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use('/hash',hashRoutes);
app.use('/string',stringRoutes);

app.listen(8080 , ()=>{
    console.log("Working fine!!")
})