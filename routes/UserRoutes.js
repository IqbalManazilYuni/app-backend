import express from 'express';
import { ChangePassword, DeleteKodeVerifikasiByNIM, DeletUser, EditUser, GetCvById, GetUserById, GetUserByJenisPenggunaAndIdLabor, GetUserByKode, GetUserByNIM, GetUserByToken, GetUsersByPengguna, LoginUser, LoginWeb } from '../controllers/UserController.js';
import verifyToken from '../config/middleware.js';
import { VerifikasiAkun } from '../controllers/RegistrasiController.js';

const router = express.Router();

router.get('/get-cv/:id', verifyToken, GetCvById);
router.post('/login', LoginUser);
router.post('/login-web', LoginWeb);
router.post('/verifikasiAkun', VerifikasiAkun);
router.post('/getuserbytoken', verifyToken, GetUserByToken);
router.post('/getuserbytokenwithouttoken', GetUserByToken);
router.post('/GetUsersByPengguna', verifyToken, GetUsersByPengguna);
router.post('/User/Edit-User', verifyToken, EditUser);
router.post('/GetUserById', verifyToken, GetUserById);
router.post('/GetUserByJenisPenggunaAndIdLabor', verifyToken, GetUserByJenisPenggunaAndIdLabor);
router.delete('/deleteuser/:id', verifyToken, DeletUser)
router.post('/getuserbyNIM', verifyToken, GetUserByNIM);
router.post('/getuserbynimwithouttoken', GetUserByNIM);
router.post('/getuserbykode', GetUserByKode)
router.post('/deletekodeverifikasi', DeleteKodeVerifikasiByNIM)
router.post('/update-password', ChangePassword)

export default router;