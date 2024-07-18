import express from 'express';

import { PreviewPDF, EditUserRegistrasi, GetUserByNimRegistrasi, RegisterUser, RegisterSuperAdmin } from '../controllers/RegistrasiController.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/register/superadmin', RegisterSuperAdmin);
router.post('/register/getuserbynim', GetUserByNimRegistrasi)
router.post('/register/getuserbynimwithToken', verifyToken, GetUserByNimRegistrasi)
router.post('/register/edituser', EditUserRegistrasi)
router.post('/register/edituserwithtoken', EditUserRegistrasi)
router.post('/preview-pdf', verifyToken, PreviewPDF);

export default router;