import express from 'express'
import { rpopFromList , getListLength , lpopFromList  } from "./controllers/list/lset.js";
import listrouter from './routes/listroute.js';


const app = express()

app.use(express.json());

// pushValuesToLeftEnd(1)
// pushValuesToRightEnd(2)
// getListLength('myList2',(err, listLength) => {
//     if (err) {
//       console.error('error found in len');
//     } else {
//       console.log(listLength)
//     }
//   })
// popfromfront()



//getting the length of the list
app.use('/list' , listrouter)


app.listen(3000, ()=>{
    console.log("Server running fine!")
})