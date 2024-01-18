import express from 'express'
import listrouter from './routes/listroute.js';
import setroute from './routes/setroute.js';


const app = express()
app.use(express.json());


app.use('/list' , listrouter)
app.use('/set' ,  setroute)



app.listen(3000, ()=>{
    console.log("Server running fine!")
})