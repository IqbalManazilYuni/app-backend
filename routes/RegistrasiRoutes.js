import express from 'express';

import { EditUserRegistrasi, GetUserByNimRegistrasi, RegisterUser} from '../controllers/RegistrasiController.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/register/getuserbynim', GetUserByNimRegistrasi)
router.post('/register/edituser', EditUserRegistrasi)

export default router;