const getAllHash = () => {
  
}

export default class RedisHash {
    constructor() {
      this.data = {};
    }
  
    hset(key, fieldValues) {
      
      if (!this.data[key]) {
        this.data[key] = {};
      }
  
      let field='';
      let value='';

      for(let fieldValue in fieldValues){
        field = fieldValue[0]
        value = fieldValue[1]
        this.data[key][field] = value;

      }

      this.save();
      return res.status(200).json('Successfully saved.');
    }
  
    hget(key, field) {
      if (this.data[key] && this.data[key][field] !== undefined) {
        return res.status(200).json({value:this.data[key][field]});
      }
  
      return res.status(404).json({message:"Not found"}); // Field not found
    }
  
    hgetall(key) {
      return res.status(200).json({values:this.data[key] || {}}); // Return the entire hash or an empty object if key not found
    }
    
    save() {
      const storage = fs.existsSync('storage.json') ? JSON.parse(fs.readFileSync('storage.json')) : [];
      storage.push(this.data);
      fs.writeFileSync('storage.json', JSON.stringify(storage, null, 2));
    }

  }
  
  
  