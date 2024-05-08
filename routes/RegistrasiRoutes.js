import express from 'express';

import { DownloadPdf, EditUserRegistrasi, GetUserByNimRegistrasi, RegisterUser} from '../controllers/RegistrasiController.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/register/getuserbynim', GetUserByNimRegistrasi)
router.post('/register/edituser', EditUserRegistrasi)
router.get('/download/:id', DownloadPdf);

export default router;