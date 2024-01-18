import express from 'express'
import listrouter from './routes/listroute.js';


const app = express()
app.use(express.json());


app.use('/list' , listrouter)




app.listen(3000, ()=>{
    console.log("Server running fine!")
})