import express from 'express';
import { CreateDetailKepengurusan, CreateKepengurusan, DeleteDetaliKepengurusan, DeleteKepengurusan, DetailKepengurusanLab, EditDetailKepengurusan, EditKepengurusan, GetDetailKepengurusanByID, GetKepengurusan, GetKepengurusanById } from '../controllers/KepengurusanControllers.js';

const router = express.Router();

router.get('/getkepengurusanbyid/:id',GetKepengurusanById)
router.get('/getdetailkepengurusan/:idKepengurusan', DetailKepengurusanLab)
router.get('/getkepengurusan/:idLabor', GetKepengurusan);
router.post('/add-detailkepengurusan', CreateDetailKepengurusan);
router.get('/getdetailkepengurusanbyid/:id', GetDetailKepengurusanByID);
router.post('/edit-detailkepengurusan', EditDetailKepengurusan);
router.post('/add-kepengurusan', CreateKepengurusan);
router.post('/edit-kepengurusan', EditKepengurusan);
router.delete('/deletekepengurusan/:id', DeleteKepengurusan)
router.delete('/deletedetailkepengurusan/:id', DeleteDetaliKepengurusan)

export default router;