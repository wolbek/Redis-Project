import express from 'express';
import fs from 'fs';


const app = express();
// const router = app.router()
const port = 3000;

// Set up the path for the set data file
const setsFilePath = '/home/akshay/redis_project/controllers/set/set_data.json';

// Initialize an object to store sets in memory
let setsData = {};

// Middleware to parse JSON in requests
app.use(express.json());

const stringifiabledata_handler = () => {
  let stringifiableData ={}
  for (const key in setsData) {
    if (Object.prototype.hasOwnProperty.call(setsData, key)) {
      const value = setsData[key];
  
      if (value instanceof Set) {
        stringifiableData[key] = Array.from(value);
      } else {
        stringifiableData[key] = value;
      }
    }
  }
  return stringifiableData

}

export const saveSetsToFile = () => {
  const stringifiableData = stringifiabledata_handler();
  // for (const key in setsData) {
  //   if (Object.prototype.hasOwnProperty.call(setsData, key)) {
  //     const value = setsData[key];
  
  //     if (value instanceof Set) {
  //       stringifiableData[key] = Array.from(value);
  //     } else {
  //       stringifiableData[key] = value;
  //     }
  //   }
  // }
  const dataToSave = JSON.stringify(stringifiableData, null, 2);
  console.log("datatosave",dataToSave)
  fs.writeFileSync(setsFilePath, dataToSave, 'utf-8');
  console.log('Sets data saved to file successfully.');
};

// Function to load sets data from the file
export const loadSetsFromFile = () => {
  try {
    const dataFromFile = fs.readFileSync(setsFilePath, 'utf-8');
    setsData = JSON.parse(dataFromFile);
    console.log('Sets data loaded from file successfully.');
  } catch (err) {
    console.error('Error loading sets data from file:', err);
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

    // members.forEach(member => {
    //   console.log(member);
    //   // setsData[setKey]=member;
    //   setsData[setKey].add("demo")
    //   console.log(setsData[setKey])
    //   setsData[setKey].add(member)
    // });

    const existingSetArray = Array.from(setsData[setKey]);
    const combinedArray = existingSetArray.concat(members);
    setsData[setKey] = new Set(combinedArray);
    console.log(setsData)

    console.log("outside the members loop ");

    callback(null, { message: 'Members added to the set successfully' });
    // Save the updated data to the file after each sadd
    saveSetsToFile();
  } catch (err) {
    callback(err, null);
  }
};

export const smembersOfSet = (setKey, callback) => {
  try {
    const members = setsData[setKey] ? Array.from(setsData[setKey]) : [];
    const resp_obj ={
      setKey,members
    }
    callback(null, resp_obj);
  } catch (err) {
    callback(err, null);
  }
};


