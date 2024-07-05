import express from 'express';
import { AddLab, GetLab, GetLabByID, EditLab, DeleteLab, GetKepengurusanByIDLabor, GetInfoLab, GetInfoLabWithoutIdlabor, GetAdminLabor, GetAdminByIdLabor, EditAdminLabor, AddAdminLabor } from '../controllers/LabController.js';
import multer from 'multer';
import verifyToken from '../config/middleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/lab',verifyToken,GetLab);
router.get('/get-lab',GetLab);
router.get('/adminlab',verifyToken, GetAdminLabor);
router.get('/adminlabbyidLabor/:idLabor',verifyToken, GetAdminByIdLabor);
router.get('/infoLabwithoutidlabor',verifyToken, GetInfoLabWithoutIdlabor);
router.get('/infoLab/:idLabor',verifyToken, GetInfoLab);
router.get('/getkepengurusanbyidlabor/:idLabor',verifyToken, GetKepengurusanByIDLabor)
router.post('/add-lab',verifyToken, upload.single('logo'), AddLab);
router.post('/edit-adminlab',verifyToken, EditAdminLabor);
router.post('/add-adminlab',verifyToken, AddAdminLabor);
router.post('/labById',verifyToken, GetLabByID);
router.post('/edit-lab',verifyToken, upload.single('logo'), EditLab);
router.delete('/delete-lab/:id',verifyToken, DeleteLab)

export default router;