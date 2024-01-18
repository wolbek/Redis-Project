import express from 'express'
import { saddToSet , getsetmembers } from '../controllers/set/s_union.js'


const router = express.Router()


router.post('/sadd/:id',(req, res) => {
    try {
      const { id } = req.params;
      const setKey = id;
      const { value } = req.body;
  
      saddToSet(setKey, value, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error found while adding members to the set', error: err });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error found', error: err });
    }
  })


  router.get('/info/:id', (req,res)=>{
    try{
        const { id } = req.params;
      const setKey = id;
      const { value } = req.body;

      getsetmembers(setKey , (err , result )=>{
        if (err) {
            res.status(500).send({ message: 'Error found while adding members to the set', error: err });
          } else {
            res.status(200).json(result);
          }
      } )

    }
    catch(err){
        res.status(500).json({ message: 'Error found', error: err });

    }
  })

  export default router