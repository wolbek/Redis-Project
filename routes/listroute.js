import express from 'express'
// import { rpopFromList , getListLength , lpopFromList  } from "./controllers/list/lset.js";
import { rpopFromList , getListLength , lpopFromList,lpushToList  , lposInList,rpushToList} from '../controllers/list/lset.js';


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


router.post('/lpush/:id', (req, res) => {
    try {
      const { id } = req.params;
      const listKey = id;
      const { value } = req.body;
  
  
      lpushToList(listKey, value, (err, response_obj) => {
        console.log("inside lpush")
        if (err) {
          res.status(500).send({ message: 'Error found while pushing elements', error: err });
        } else {

          res.status(200).json(response_obj);
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error found', error: err });
    }
  });

  router.post('/rpush/:id', (req, res) => {
    try {
      const { id } = req.params;
      const listKey = id;
      const { value } = req.body;
  
  
      rpushToList(listKey, value, (err, response_obj) => {
        console.log("inside rpush")
        if (err) {
          res.status(500).send({ message: 'Error found while pushing elements', error: err });
        } else {

          res.status(200).json(response_obj);
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error found', error: err });
    }
  });



  router.get('/lpos/:id', (req, res) => {
    try {
      const { id } = req.params;
      const listKey = id;
      const { value } = req.body;
  
      lposInList(listKey, value, (err, position) => {
        if (err) {
          res.status(500).send({ message: 'Error found while getting position', error: err });
        } else {
          res.status(200).json({ position });
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error found', error: err });
    }
  });

export default router
