import express from 'express'
import {setString, getString, getAllString} from '../controllers/string.js';

const router = express.Router()

router.post('/set', setString);
router.get('/get/:key', getString);
router.get('/getall',getAllString);

export default router;