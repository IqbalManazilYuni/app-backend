import express from 'express';
import { CreateRecruitment, DeleteRecruitment, EditRecruitment, GetRecruitment, GetRecruitmentByID, GetRecruitmentByLabor, UpdateStatusRecruitment } from '../controllers/RecruitmentControllers.js';
import verifyToken from '../config/middleware.js';
const router = express.Router();

router.get('/getrecruitment/:idLabor', verifyToken, GetRecruitmentByLabor)
router.get('/getrecruitmentbyid/:id', verifyToken, GetRecruitmentByID)
router.get('/getrecruitmentbykegiatan/:idKegiatan', verifyToken, GetRecruitment)
router.post('/add-recruitment', verifyToken, CreateRecruitment);
router.post('/edit-recruitment', verifyToken, EditRecruitment);
router.post('/update-date-recruitment', verifyToken, UpdateStatusRecruitment);
router.delete('/delete-recruitment/:id', verifyToken, DeleteRecruitment);


export default router;