import express from "express";
import {
  loadListsFromFile,
  getListLength,
  saveListsToFile,
  lpushToList,
  rpushToList,
  rpopFromList,
  lpopFromList,
} from "../controllers/list/list_controller.js";

const router = express.Router();

//loading file from local storage to server startup
loadListsFromFile();

router.get("/len/:id", (req, res,next) => {
  try {
    const { id } = req.params;
    const listKey = id;

    getListLength(listKey, (err, result) => {
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

router.post("/lpush/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const listKey = id;
    const { value } = req.body;

    lpushToList(listKey, value, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
        // Save the updated data to the file after each push
        saveListsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

router.post("/rpush/:id", (req, res , next) => {
  try {
    const { id } = req.params;
    const listKey = id;
    const { value } = req.body;

    rpushToList(listKey, value, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
        // Save the updated data to the file after each push
        saveListsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

router.get("/rpop/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const listKey = id;

    rpopFromList(listKey, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
        // Save the updated data to the file after each pop
        saveListsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

router.get("/lpop/:id", (req, res,next) => {
  try {
    const { id } = req.params;
    const listKey = id;

    lpopFromList(listKey, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(result);
        // Save the updated data to the file after each pop
        saveListsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

export default router;
