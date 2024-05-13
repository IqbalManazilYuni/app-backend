import express from 'express';
import { DeletUser, EditUser, GetCvById, GetUserById, GetUserByToken, GetUsersByPengguna, LoginUser, LoginWeb } from '../controllers/UserController.js';

const router = express.Router();

router.get('/get-cv/:id', GetCvById);
router.post('/login', LoginUser);
router.post('/login-web', LoginWeb);
router.post('/getuserbytoken', GetUserByToken);
router.post('/GetUsersByPengguna', GetUsersByPengguna);
router.post('/User/Edit-User', EditUser);
router.post('/GetUserById', GetUserById);
router.delete('/deleteuser/:id',DeletUser)


export default router;