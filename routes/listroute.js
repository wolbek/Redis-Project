import express from 'express'
// import { rpopFromList , getListLength , lpopFromList  } from "./controllers/list/lset.js";
import { rpopFromList , getListLength , lpopFromList,lpushToList } from '../controllers/list/lset.js';


const router = express.Router()

router.get('/len/:id', (req, res) => {
    try {
        const { id } = req.params;
        const listKey = id;

        getListLength(listKey, (err, listLength) => {
            if (err) {
                res.status(500).send({ message: 'Error found while processing', error: err });
            } else {
                if (listLength === 0) {
                    res.status(404).send({ message: 'No such list. Please enter correct list name/id' });
                } else {
                    res.status(200).json({ listLength });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error found', error: err });
    }
})

router.get('/lpop/:id', (req, res) => {
    try {
        const { id } = req.params;
        const listKey = id;

        lpopFromList(listKey, (err, poppedElement) => {
            if (err) {
                res.status(500).send({ message: 'Error found while popping element', error: err });
            } else {
                if (poppedElement === null) {
                    res.status(404).send({ message: 'No elements to pop from the list' });
                } else {
                    res.status(200).json({ 'front poppedElement': poppedElement });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error found', error: err });
    }
})

router.get('/rpop/:id', (req, res) => {
    try {
        const { id } = req.params;
        const listKey = id;

        rpopFromList(listKey, (err, poppedElement) => {
            if (err) {
                res.status(500).send({ message: 'Error found while popping element', error: err });
            } else {
                if (poppedElement === null) {
                    res.status(404).send({ message: 'No elements to pop from the list' });
                } else {
                    res.status(200).json({ 'Rear poppedElement': poppedElement });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error found', error: err });
    }
})


router.post('/list/lpush/:id', (req, res) => {
    try {
      const { id } = req.params;
      const listKey = id;
      const { values } = req.body;
  
  
      lpushToList(listKey, values, (err, newLength) => {
        if (err) {
          res.status(500).send({ message: 'Error found while pushing elements', error: err });
        } else {
          res.status(200).json({ newLength });
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error found', error: err });
    }
  });

export default router

