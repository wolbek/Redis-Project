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
// loadListsFromFile();

router.get("/len/:id", (req, res,next) => {
  try {
    const { id } = req.params;
    const listKey = id;

    getListLength(listKey, (err, result,status) => {
      if (err) {
        next(err)
      } else {
        // if(result)
        res.status(status).json(result);
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
    let { value } = req.body;

    if (!Array.isArray(value)) {
      value = [value];
    }

    lpushToList(listKey, value, (err, result, status) => {
      if (err) {
        next(err)
      } else {
        res.status(status).json(result);
        // Save the updated data to the file after each push
        // saveListsToFile();
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
    let { value } = req.body;

    if (!Array.isArray(value)) {
      value = [value];
    }

    rpushToList(listKey, value, (err, result , status) => {
      if (err) {
        next(err)
      } else {
        res.status(status).json(result);
        // Save the updated data to the file after each push
        // saveListsToFile();
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

    rpopFromList(listKey, (err, result,status) => {
      if (err) {
        next(err)
      } else {
        res.status(status).json(result);
        // Save the updated data to the file after each pop
        // saveListsToFile();
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

    lpopFromList(listKey, (err, result,status) => {
      if (err) {
        next(err)
      } else {
        res.status(status).json(result);
        // Save the updated data to the file after each pop
        // saveListsToFile();
      }
    });
  } catch (err) {
    next(err)
  }
});

export default router;
