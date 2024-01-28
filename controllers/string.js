const string = {};

export const setString = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const value = req.body[key];
        const response = await set(key, value); 

        return res.status(201).json({message:response});
    }
    catch(err){
        next(err);
    }
}

const set = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            if(typeof(value)==='string'){
                string[key] = value;
                resolve('Successfully saved.');
            }else{
                const err = new Error('Invalid input.');
                err.statusCode = 400;
                reject(err);
            }
            
        } catch (err) {
            reject(err);
        }
    });
}

export const getString = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await get(key); 

        return res.status(200).json({data:response});
    }
    catch(err){
        next(err);
    }
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        try {
            if (string[key] !== undefined) {
                resolve(string[key]);
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

export const getStringLength = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await strlen(key);

        return res.status(200).json({data:response});
    }
    catch(err){
        next(err);
    }
}

const strlen = (key) => {
    return new Promise((resolve, reject) => {
        try{
            if (string[key] !== undefined){
                resolve(Object.keys(string[key]).length);
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

export const deleteString = async (req, res, next) => {
    try{
        const key = req.body.key;
        const response = await getdel(key); 

        return res.status(200).json({data:response});
    }
    catch(err){
        next(err);
    }
}

const getdel = (key) => {
    return new Promise((resolve, reject) => {
        try{
            if(string[key]!== undefined){
                const deletedValue = string[key];
                delete string[key];
                
                resolve(deletedValue);

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

