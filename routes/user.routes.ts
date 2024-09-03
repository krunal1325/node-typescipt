import express from 'express'
import { userCreate, userDelete, userDetails, userDetailsUpdate, userLists } from '../controllers/user.controller'

const router = express.Router()

router.get('/list', userLists);
router.post('/delete', userDelete);
router.post('/create', userCreate);
router.put('/update', userDetailsUpdate);
router.get('/:user_id', userDetails);


export default router