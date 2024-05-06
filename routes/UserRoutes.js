import express from 'express';

import { EditUser, GetUserByNim, RegisterUser} from '../controllers/UserController.js';

const router = express.Router();

// router.get('/', GetAllUsers)
router.post('/register', RegisterUser);
// router.post('/login', LoginUser);
// router.post('/getuserbytoken', GetUserByToken)
// router.post('/getuserbyuuid', GetUserByUUID)
// router.post('/getuserbypengguna', GetUsersByPengguna)
router.post('/getuserbynim', GetUserByNim)
router.post('/edituser', EditUser)
// router.delete('/deleteuser', DeletUser)

export default router;