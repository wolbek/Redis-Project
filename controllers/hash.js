import RedisHash from "../models/hash.js";

const hash = new RedisHash();

export const setHashField = async (req, res, next) => {
    try{
        const key = Object.keys(req.body)[0];
        const fields = req.body[key];
        const response = await hash.hset(key, fields);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

export const getHashField = async (req, res, next) => {
    try{
        const {key, field} = req.params;
        const response = await hash.hget(key, field);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

export const getHashAllFields = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await hash.hgetall(key);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

export const deleteHashField = async (req, res, next) => {
    try{
        const key = req.body.key;
        const fields = req.body.fields;
        const response = await hash.hdel(key, fields);

        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};

export const findHashLength = async (req, res, next) => {
    try{
        const key = req.params.key;
        const response = await hash.hlen(key);
        
        return res.status(200).json({response:response});
    }
    catch(err){
        next(err);
    }
};