import { log } from "console";
import fs from "fs";
import path from "path";

const listsData = {};

const DATA_FILE_PATH = path.join("controllers", "list", "list_data.json");

//appending new element in the extreme left side
export const lpushToList = (listKey, value, callback) => {
  try {
    console.log(value);
    if (!listsData[listKey]) {
      listsData[listKey] = [];
    }

    // Push the value to the left end of the list
    value.forEach((element) => {
      console.log(element);
      if (!element) {
        callback(null, { message: "Value is absent" }, 400);
        return;
      }
      listsData[listKey].unshift(element);
    });

    const newLength = listsData[listKey].length;
    // const resp_obj = {"Element added to leftmost side",newLength}

    callback(null, {
      message: "Element added to leftmost side.",
      newLength,
      value,
    },201);
  } catch (err) {
    callback(err, null);
  }
};

//pushing element to the end
export const rpushToList = (listKey, value, callback) => {
  try {
    console.log(value);
    if (!listsData[listKey]) {
      listsData[listKey] = [];
    }

    //checking if the value(array) is empty or not
    // if(!value){
    //   callback(null, { message: "Value is absent" } ,401 );
    //   return
    // }

    // Push the value to the left end of the list and checking if the value(array) is empty or not
    value.forEach((element) => {
      if (!element) {
        callback(null, { message: "Value is absent" }, 400);
        return;
      }
      console.log(element);
      listsData[listKey].push(element);
    });
    const newLength = listsData[listKey].length;

    callback(
      null,
      { message: "Element added to righmost side.", newLength, value },
      201
    );
  } catch (err) {
    callback(err, null);
  }
};

//remove element from the end
export const rpopFromList = (listKey, callback) => {
  try {
    if (!listsData[listKey] || listsData[listKey].length === 0) {
      callback(null, { removedElement: null });
      return;
    }

    const removedElement = listsData[listKey].pop();
    const newLength = listsData[listKey].length;
    callback(null, {
      message: `Element removed from righmost side: ${removedElement}`,
      newLength, 
    },201);
  } catch (err) {
    callback(err, null);
  }
};

//remove element from front
export const lpopFromList = (listKey, callback) => {
  try {
    if (!listsData[listKey] || listsData[listKey].length === 0) {
      callback(null, { removedElement: null }, 400);
      return;
    }

    const removedElement = listsData[listKey].shift();
    const newLength = listsData[listKey].length;
    callback(
      null,
      {
        message: `Element removed from leftmost side`,
        newLength,
        removedElement,
      },
      201
    );
  } catch (err) {
    callback(err, null);
  }
};

// Function to load existing data from the JSON file
export const loadListsFromFile = () => {
  try {
    const dataFromFile = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const parsedData = JSON.parse(dataFromFile);
    Object.assign(listsData, parsedData);
    console.log("Lists Data loaded from file successfully.");
  } catch (err) {
    console.error("Error loading data from file:", err);
  }
};

// Function to save the listsData to a JSON file
export const saveListsToFile = () => {
  const dataToSave = JSON.stringify(listsData, null, 2);
  fs.writeFileSync(DATA_FILE_PATH, dataToSave, "utf-8");
  console.log("Data saved to file successfully.");
};

export const getListLength = (listKey, callback) => {
  try {
    if (!listsData[listKey]) {
      const resp_obj = "listkey not present in list";
      callback(null, resp_obj, 400);
    } else {
      const listLength = listsData[listKey].length;

      callback(null, { listLength }, 200);
    }
  } catch (err) {
    callback(err, null);
  }
};
