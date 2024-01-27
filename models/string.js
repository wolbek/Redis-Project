export default class RedisString {
    constructor () {
        this.data = {};
    }

    set(key, value){
        return new Promise((resolve, reject) => {
            try {
                this.data[key] = value;
                resolve('Successfully saved.');
            } catch (err) {
                reject(err);
            }
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            try {
                if (this.data[key] !== undefined) {
                    resolve(this.data[key]);
                } else {
                    reject(new Error('Not Found'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    getdel(key){
        return new Promise((resolve, reject) => {
            try{
                if(this.data[key]!== undefined){
                    const deletedValue = this.data[key];
                    delete this.data[key];
                    
                    resolve(deletedValue);

                }else{
                    reject(new Error('Not Found'));
                }
            } catch(err){
                reject(err);
            }
        });
    }

    strlen(key){
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