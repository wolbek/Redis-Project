import express from "express";
import {
  saddToSet,
  smembersOfSet,
  loadSetsFromFile,
  sremFromSet,
  smoveMember
} from "../controllers/set/set_controller.js";
import { saveSetsToFile } from "../controllers/set/set_controller.js";

const router = express.Router();

loadSetsFromFile();
router.post("/sadd/:id", (req, res,next) => {
  try {
    const { id } = req.params;
    const setKey = id;
    let { value } = req.body;
    // If members is a single element, convert it into an array
    if (!Array.isArray(value)) {
      value = [value];
    }

    saddToSet(setKey, value, (err, result,status) => {
      if (err) {
        console.log("inside the err loop saddtoset", err);
        next(err)
      } else {
        res.status(status).json(result);
        // saveSetsToFile()
      }
    });
  } catch (err) {
    next(err)
  }
});

// Route to smembers (get all members of a set)
router.get("/smembers/:id", (req, res ,next) => {
  try {
    const { id } = req.params;
    const setKey = id;

    smembersOfSet(setKey, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    next(err)
  }
});

// Route to srem (remove members from a set)
router.post("/srem/:id", (req, res,next) => {
  try {
    const { id } = req.params;
    const setKey = id;
    let { value } = req.body;

    // If members is a single element, convert it into an array
    if (!Array.isArray(value)) {
      value = [value];
    }

    sremFromSet(setKey, value, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
        // Save the updated data to the file after each srem
        saveSetsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

// Route to smove (move a member from one set to another)
router.post('/smove/:sourceSet/:destinationSet', (req, res,next) => {
  try {
    const { sourceSet, destinationSet } = req.params;
    const { member } = req.body;

    smoveMember(sourceSet, destinationSet, member, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    next(err)
  }
});






export default router;
