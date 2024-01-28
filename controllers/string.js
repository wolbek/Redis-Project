const string = {};

export const setString = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const value = req.body[key];
        const response = await set(key, value); 

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
}

const set = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            string[key] = value;
            resolve('Successfully saved.');
        } catch (err) {
            reject(err);
        }
    });
}

export const getString = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await get(key); 

        return res.status(200).json({response:response});
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
                reject(new Error('Not Found'));
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const deleteString = async (req, res, next) => {
    try{
        const key = req.body.key;
        const response = await getdel(key); 

        return res.status(200).json({response:response});
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
                reject(new Error('Not Found'));
            }
        } catch(err){
            reject(err);
        }
    });
}

export const getStringLength = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await strlen(key);

        return res.status(200).json({response:response});
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
                reject(new Error('Not Found'));
            }
        } catch(err){
            reject(err);
        }
    });
}