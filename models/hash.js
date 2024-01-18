import fs from 'fs';

import path from 'path';

const p = path.join('data','storage.json');

const storedData = () => {
  return JSON.parse(fs.readFileSync(p));
}

export default class RedisHash {
    constructor() {
      this.data = {};
    }
  
    hset(key, fields) {
      if (!this.data[key]) {
        this.data[key] = {};
      }
  
      for(let fieldName in fields){
        this.data[key][fieldName] = fields[fieldName];
      }

      const allData = storedData();

      if(!allData['hash']){
        allData['hash'] ={};
      }
      allData['hash'][key]=this.data[key];
      fs.writeFileSync(p, JSON.stringify(allData));
      return 'Successfully saved.';
    }
  
    hget(key, field) {
      const allData = storedData();
      if (allData['hash'][key] && allData['hash'][key][field] !== undefined) {
        return allData['hash'][key][field];
      }
  
      return "Not found";
    }
  
    // hgetall(key) {
    //   return res.status(200).json({values:this.data[key] || {}}); // Return the entire hash or an empty object if key not found
    // }
    
  }
  
  
  