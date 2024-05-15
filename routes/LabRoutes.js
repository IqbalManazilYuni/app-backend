import express from 'express';
import { AddLab, GetLab, GetLabByID, EditLab, DeleteLab } from '../controllers/LabController.js';

const router = express.Router();

router.get('/lab', GetLab);
router.post('/add-lab', AddLab);
router.post('/labById', GetLabByID);
router.post('/edit-lab', EditLab);
router.delete('/delete-lab/:id', DeleteLab)

export default router;