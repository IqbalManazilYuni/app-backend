import express from 'express';
import { CreateDetailKepengurusan, CreateKepengurusan, DeleteDetaliKepengurusan, DeleteKepengurusan, DetailKepengurusanLab, EditDetailKepengurusan, EditKepengurusan, GetDetailKepengurusanByID, GetKepengurusan, GetKepengurusanById } from '../controllers/KepengurusanControllers.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

router.get('/getkepengurusanbyid/:id', verifyToken, GetKepengurusanById)
router.get('/getdetailkepengurusan/:idKepengurusan', verifyToken, DetailKepengurusanLab)
router.get('/getkepengurusan/:idLabor', verifyToken, GetKepengurusan);
router.post('/add-detailkepengurusan', verifyToken, CreateDetailKepengurusan);
router.get('/getdetailkepengurusanbyid/:id', verifyToken, GetDetailKepengurusanByID);
router.post('/edit-detailkepengurusan', verifyToken, EditDetailKepengurusan);
router.post('/add-kepengurusan', verifyToken, CreateKepengurusan);
router.post('/edit-kepengurusan', verifyToken, EditKepengurusan);
router.delete('/deletekepengurusan/:id', verifyToken, DeleteKepengurusan)
router.delete('/deletedetailkepengurusan/:id', verifyToken, DeleteDetaliKepengurusan)

export default router;