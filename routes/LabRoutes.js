import express from 'express';
import { AddLab, GetLab, GetLabByID, EditLab, DeleteLab, GetKepengurusanByIDLabor } from '../controllers/LabController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/lab', GetLab);
router.get('/getkepengurusanbyidlabor/:idLabor', GetKepengurusanByIDLabor)
router.post('/add-lab', upload.single('logo'), AddLab);
router.post('/labById', GetLabByID);
router.post('/edit-lab', upload.single('logo'), EditLab);
router.delete('/delete-lab/:id', DeleteLab)

export default router;