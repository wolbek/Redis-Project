export default class RedisHash {
    constructor () {
        this.data = {};
    }

    hset(key, fields){
        return new Promise((resolve, reject) => {
            try {
                this.data[key] = {...this.data[key], ...fields};
                resolve('Successfully saved.');
            } catch (err) {
                reject(err);
            }
        });
    }

    hget(key, field) {
        return new Promise((resolve, reject) => {
            try {
                if (this.data[key] && this.data[key][field] !== undefined) {
                    resolve(this.data[key][field]);
                } else {
                    reject(new Error('Not Found'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    hgetall(key){
        return new Promise((resolve, reject) => {
            try{
                if (this.data[key] !== undefined){
                    resolve(this.data[key]);
                }else{
                    reject(new Error('Not Found'));
                }
            } catch(err){
                reject(err);
            }
        });
    }

    hdel(key, fields){
        return new Promise((resolve, reject) => {
            try{
                if(this.data[key]!== undefined){

                    for(let field of fields){
                        if(this.data[key][field]=== undefined){
                            reject(new Error('Some fields does not exist'));
                        }
                    }
                    for(let field of fields){
                        delete this.data[key][field];
                    }
                    
                    resolve(`Successfully deleted given fields.`);

                }else{
                    reject(new Error('Not Found'));
                }
            } catch(err){
                reject(err);
            }
        });
    }

    hlen(key){
        return new Promise((resolve, reject) => {
            try{
                if (this.data[key] !== undefined){
                    resolve(Object.keys(this.data[key]).length);
                }else{
                    reject(new Error('Not Found'));
                }
            } catch(err){
                reject(err);
            }
        });
    }
}