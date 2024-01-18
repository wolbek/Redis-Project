import RedisHash from '../models/hash';

const redisHash = new RedisHash();

export const setHash= (req, res, next) => {
    try{
        const {key, ...fieldValues} = req.body;
        const response = redisHash.hset(key, fieldValues);
        return response;
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}

export const getHash = async (req, res, next) => {
    try{
        const {key, field} = req.body;
        const response = redisHash.hget(key, field);
        return response;
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}