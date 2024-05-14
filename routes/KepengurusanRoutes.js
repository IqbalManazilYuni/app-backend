import express from 'express';
import { CreateKepengurusan, DeleteKepengurusan, EditKepengurusan, GetKepengurusan, GetKepengurusanById } from '../controllers/KepengurusanControllers.js';

const router = express.Router();

router.get('/getkepengurusanbyid/:id',GetKepengurusanById)
router.get('/getkepengurusan', GetKepengurusan);
router.post('/add-kepengurusan', CreateKepengurusan);
router.post('/edit-kepengurusan', EditKepengurusan);
router.delete('/deletekepengurusan/:id', DeleteKepengurusan)

export default router;