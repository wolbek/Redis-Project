import RedisHash from '../models/hash.js';

const redisHash = new RedisHash();

export const setHashField= (req, res, next) => {
    try{
        const {key, ...fields} = req.body;
        const response = redisHash.hset(key, fields);
        return res.status(200).json({message:response});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}

export const getHashField = (req, res, next) => {
    try{
        const {key, field} = req.params;
        const response = redisHash.hget(key, field);
        return res.status(200).json({value:response});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}

// export const getHashAllFields = (req, res, next) => {

// }