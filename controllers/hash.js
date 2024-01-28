const hash = {}

export const setHashField = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const fields = req.body[key];
        const response = await hset(key, fields);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

const hset = (key, fields) => {
    return new Promise((resolve, reject) => {
        try {
            hash[key] = {...hash[key], ...fields};
            resolve('Successfully saved.');
        } catch (err) {
            reject(err);
        }
    });
}

export const getHashField = async (req, res, next) => {
    try{
        const {key, field} = req.params;
        const response = await hget(key, field);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

const hget = (key, field) => {
    return new Promise((resolve, reject) => {
        try {
            if (hash[key] && hash[key][field] !== undefined) {
                resolve(hash[key][field]);
            } else {
                reject(new Error('Not Found'));
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const getHashAllFields = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await hgetall(key);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

const hgetall = (key) => {
    return new Promise((resolve, reject) => {
        try{
            if (hash[key] !== undefined){
                resolve(hash[key]);
            }else{
                reject(new Error('Not Found'));
            }
        } catch(err){
            reject(err);
        }
    });
}

export const deleteHashField = async (req, res, next) => {
    try{
        const key = req.body.key;
        const fields = req.body.fields;
        const response = await hdel(key, fields);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

const hdel = (key, fields) => {
    return new Promise((resolve, reject) => {
        try{
            if(hash[key]!== undefined){

                for(let field of fields){
                    if(hash[key][field]=== undefined){
                        reject(new Error('Some fields does not exist'));
                    }
                }
                for(let field of fields){
                    delete hash[key][field];
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

export const findHashLength = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await hlen(key);
        
        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

const hlen = (key) => {
    return new Promise((resolve, reject) => {
        try{
            if (hash[key] !== undefined){
                resolve(Object.keys(hash[key]).length);
            }else{
                reject(new Error('Not Found'));
            }
        } catch(err){
            reject(err);
        }
    });
}