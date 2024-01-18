import express from 'express'
import {setHashField, getHashField} from '../controllers/hash.js';

const router = express.Router()

router.post('/hset', setHashField);
router.get('/hget/:key/:field', getHashField);

export default router;