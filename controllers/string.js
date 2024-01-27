import RedisString from "../models/string.js";

const string = new RedisString();

export const setString = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const value = req.body[key];
        const response = await string.set(key, value); 

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
}

export const getString = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await string.get(key); 

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
}

export const deleteString = async (req, res, next) => {
    try{
        const key = req.body.key;
        const response = await string.getdel(key); 

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
}

export const getStringLength = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await string.strlen(key);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
}