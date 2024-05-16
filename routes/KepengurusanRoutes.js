import express from 'express';
import { CreateDetailKepengurusan, CreateKepengurusan, DeleteKepengurusan, DetailKepengurusanLab, EditKepengurusan, GetKepengurusan, GetKepengurusanById } from '../controllers/KepengurusanControllers.js';

const router = express.Router();

router.get('/getkepengurusanbyid/:id',GetKepengurusanById)
router.post('/getdetailkepengurusan', DetailKepengurusanLab)
router.post('/getkepengurusan', GetKepengurusan);
router.post('/add-detailkepengurusan', CreateDetailKepengurusan);
router.post('/add-kepengurusan', CreateKepengurusan);
router.post('/edit-kepengurusan', EditKepengurusan);
router.delete('/deletekepengurusan/:id', DeleteKepengurusan)

export default router;