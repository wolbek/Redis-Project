import express from 'express'
import {setHashField, getHashField, getHashAllFields, deleteHashField, findHashLength} from '../controllers/hash.js';

const router = express.Router()

router.post('/hset', setHashField);
router.get('/hget/:key/:field', getHashField);
router.get('/hgetall/:key',getHashAllFields);
router.post('/hdel', deleteHashField);
router.get('/hlen/:key', findHashLength);

export default router;