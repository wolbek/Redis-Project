import express from "express";
import fs from "fs";
import { stringifiabledata_handler } from "./utils/stringifiabledata_handler.js";
import path from "path";

const app = express();
// const router = app.router()
const port = 3000;

// Set up the path for the set data file
const setsFilePath = path.join("controllers", "set", "set_data.json");

// Initialize an object to store sets in memory
let setsData = {};

export const saveSetsToFile = () => {
  const stringifiableData = stringifiabledata_handler(setsData);

  const dataToSave = JSON.stringify(stringifiableData, null, 2);
  // console.log("datatosave", dataToSave);
  fs.writeFileSync(setsFilePath, dataToSave, "utf-8");
  console.log("Sets data saved to file successfully.");
};

// Function to load sets data from the file
export const loadSetsFromFile = () => {
  try {
    const dataFromFile = fs.readFileSync(setsFilePath, "utf-8");
    setsData = JSON.parse(dataFromFile);
    console.log("Sets data loaded from file successfully.");
  } catch (err) {
    console.error("Error loading sets data from file:", err);
  }
};

export const saddToSet = (setKey, members, callback) => {
  try {
    console.log("inside the saddtoset");

    if (!setsData[setKey]) {
      console.log("inside the if loop");

      setsData[setKey] = new Set();
    } else {
      console.log("inside the else loop");
      const existingSetArray = Array.from(setsData[setKey]);
      // const combinedArray = existingSetArray.concat(members);
      setsData[setKey] = new Set(existingSetArray);
    }

    console.log(members);

    //if there is already a set with the keyid, then add the members

    members.forEach((element) => {
      if (element=="") {
        callback(null, { message: "Value cannot be null" }, 400);
        return;
      }
      setsData[setKey].add(element);
    });

    console.log(setsData);

    console.log("outside the members loop ");
    // saveSetsToFile();
    callback(null, { message: "Members added to the set successfully" }, 201);
    // Save the updated data to the file after each sadd
    // saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};

export const smembersOfSet = (setKey, callback) => {
  try {
    if (!setsData[setKey]) {
      // listsData[listKey] = [];
      callback(null, { message: "setkey not found" }, 400);
      return;
    }
    const members = Array.from(setsData[setKey]);
    const resp_obj = {
      setKey,
      members,
    };
    callback(null, resp_obj, 200);
  } catch (err) {
    callback(err, null);
  }
};

// Function to remove members from a set
export const sremFromSet = (setKey, members, callback) => {
  try {
    console.log("inside the sremFromSet");

    if (!setsData[setKey]) {
      console.log("Set not found");
      callback(null, { message: "Set not found" });
      return;
    }
    console.log("inside the sremFromSet 2");

    //converting the array into set
    setsData[setKey] = new Set(setsData[setKey]);

    // Remove members from the set
    for (const member of members) {
      if (!setsData[setKey].has(member)) {
        callback(null, { message: 'Member not present in set' }, 400);
        return;
      }
      setsData[setKey].delete(member);
    }
    console.log("outside the foreach")
    const new_length = setsData[setKey].size;

    callback(null, {
      message: `Members removed from the set successfully `,
      new_length,
    },201);
    // Save the updated data to the file after each srem
    saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};

// Function to move a member from one set to another
export const smoveMember = (
  sourceSetKey,
  destinationSetKey,
  member,
  callback
) => {
  try {
    console.log("inside the smoveMember");

    if (!setsData[sourceSetKey] || !setsData[destinationSetKey]) {
      console.log("Source or destination set not found");
      callback(null, { message: "Source or destination set not found" },400);
      return;
    }

    //first convert the array into set
    setsData[sourceSetKey] = new Set(setsData[sourceSetKey]);
    setsData[destinationSetKey] = new Set(setsData[destinationSetKey]);

    // if!(setsData[sourceSetKey].has(member)){
    //   callback(null , {message:"Value absent in source set"},400)
    //   return
    // }

    // Move the member from the source set to the destination set
    setsData[sourceSetKey].delete(member);
    setsData[destinationSetKey].add(member);

    console.log("Member moved successfully");

    callback(null, { message: "Member moved successfully" },201);
    // Save the updated data to the file after each smove
    saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};
