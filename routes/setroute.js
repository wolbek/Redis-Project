import express from 'express'
import { saddToSet , smembersOfSet ,loadSetsFromFile, } from '../controllers/set/set_controller.js'
import { saveSetsToFile } from '../controllers/set/set_controller.js';

const router = express.Router()

loadSetsFromFile();
router.post('/sadd/:id', (req, res) => {
  try {
    const { id } = req.params;
    const setKey = id;
    const { value } = req.body;
    // If members is a single element, convert it into an array
    if (!Array.isArray(value)) {
      value = [value];
    }

    saddToSet(setKey, value, (err, result) => {
      if (err) {
        console.log("inside the err loop saddtoset", err)
        res.status(500).json({ message: 'Error found', error: err });
      } else {
        res.status(200).json(result);
        // saveSetsToFile()
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error found', error: err });
  }
});

// Route to smembers (get all members of a set)
router.get('/smembers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const setKey = id;

    smembersOfSet(setKey, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error found', error: err });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error found', error: err });
  }
});
  export default router