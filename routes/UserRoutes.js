import express from 'express';

import { RegisterUser, GetAllUsers, LoginUser, GetUserByToken, GetUserByUUID, GetUserByRole, GetUserByNim,EditUser, DeletUser} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', GetAllUsers)
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/getuserbytoken', GetUserByToken)
router.post('/getuserbyuuid', GetUserByUUID)
router.post('/getuserbyrole', GetUserByRole)
router.post('/getuserbynim', GetUserByNim)
router.post('/edituser', EditUser)
router.delete('/deleteuser', DeletUser)

export default router;