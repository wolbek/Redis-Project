import express from 'express'
import {setString, getString, getAllString, deleteString, getStringLength} from '../controllers/string.js';

const router = express.Router()

router.post('/set', setString);
router.get('/get/:key', getString);
router.get('/getall',getAllString);
router.post('/getdel', deleteString);
router.get('/strlen/:key',getStringLength);

export default router;