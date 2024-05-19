import express from 'express';
import { CreateRecruitment, DeleteRecruitment, EditRecruitment, GetRecruitment, GetRecruitmentByID, GetRecruitmentByLabor } from '../controllers/RecruitmentControllers.js';
const router = express.Router();

router.get('/getrecruitment/:idLabor',GetRecruitmentByLabor)
router.get('/getrecruitmentbyid/:id',GetRecruitmentByID)
router.get('/getrecruitmentbykegiatan/:idKegiatan',GetRecruitment)
router.post('/add-recruitment', CreateRecruitment);
router.post('/edit-recruitment', EditRecruitment);
router.delete('/delete-recruitment/:id', DeleteRecruitment);


export default router;