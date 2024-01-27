import express from 'express'
import hashRoutes from './routes/hashRoutes.js';
import stringRoutes from './routes/stringRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use('/hash',hashRoutes);
app.use('/string',stringRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found'
    })
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(8000, ()=>{
    console.log("Working fine!!")
})