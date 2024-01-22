import express from "express";
import fs from "fs";
import { stringifiabledata_handler } from "./utils/stringifiabledata_handler.js";
import path from "path";


const app = express();
// const router = app.router()
const port = 3000;

// Set up the path for the set data file
const setsFilePath = path.join("controllers", "set" , "set_data.json");

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
    }

    console.log(members);

    //if there is already a set with the keyid, then add the members
    const existingSetArray = Array.from(setsData[setKey]);
    const combinedArray = existingSetArray.concat(members);
    setsData[setKey] = new Set(combinedArray);
    console.log(setsData);

    console.log("outside the members loop ");

    callback(null, { message: "Members added to the set successfully" });
    // Save the updated data to the file after each sadd
    saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};

export const smembersOfSet = (setKey, callback) => {
  try {
    const members = setsData[setKey] ? Array.from(setsData[setKey]) : [];
    const resp_obj = {
      setKey,
      members,
    };
    callback(null, resp_obj);
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
    members.forEach((member) => {
      setsData[setKey].delete(member);
    });
    const new_length = setsData[setKey].size;

    callback(null, {
      message: `Members removed from the set successfully `,
      new_length,
    });
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
      callback(null, { message: "Source or destination set not found" });
      return;
    }

    //first convert the array into set
    setsData[sourceSetKey] = new Set(setsData[sourceSetKey]);
    setsData[destinationSetKey] = new Set(setsData[destinationSetKey]);

    // Move the member from the source set to the destination set
    setsData[sourceSetKey].delete(member);
    setsData[destinationSetKey].add(member);

    console.log("Member moved successfully");

    callback(null, { message: "Member moved successfully" });
    // Save the updated data to the file after each smove
    saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};
