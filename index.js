import express from 'express'
import hashRoutes from './routes/hashRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/hash',hashRoutes);

app.listen(8081 , ()=>{
    console.log("Working fine!!")
})