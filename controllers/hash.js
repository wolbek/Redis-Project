const hash = {}

export const setHashField = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const fields = req.body[key];
        const response = await hset(key, fields);

        return res.status(201).json({message:response});
    }
    catch(err){
        next(err);
    }
};

const hset = (key, fields) => {
    return new Promise((resolve, reject) => {
        try {
            if(typeof fields === 'object' && !Array.isArray(fields) && fields !== null){
                hash[key] = {...hash[key], ...fields};
                resolve('Successfully saved.');
            }else {
                const err = new Error('Invalid input.');
                err.statusCode = 400;
                reject(err);
            }
            
        } catch (err) {
            reject(err);
        }
    });
}

export const getHashField = async (req, res, next) => {
    try{
        const {key, field} = req.params;
        const response = await hget(key, field);
        return res.status(200).json({data:response});
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
                const err = new Error('The requested data does not exist.');
                err.statusCode = 400;
                reject(err);
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

        return res.status(200).json({data:response});
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
                const err = new Error('The requested data does not exist.');
                err.statusCode = 400;
                reject(err);
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
        
        return res.status(200).json({data:response});
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
                const err = new Error('The requested data does not exist, unable to determine its length.');
                err.statusCode = 400;
                reject(err);
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

        return res.status(200).json({message:response});
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
                        const err = new Error('Some fields does not exist.');
                        err.statusCode = 400;
                        reject(err);
                    }
                }
                for(let field of fields){
                    delete hash[key][field];
                }
                
                resolve(`Successfully deleted given fields.`);

            }else{
                const err = new Error('The data requested to be deleted does not exist.');
                err.statusCode = 400;
                reject(err);
            }
        } catch(err){
            reject(err);
        }
    });
}

