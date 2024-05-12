import express from 'express';
import { CreateKepengurusan, GetKepengurusan, GetKepengurusanById } from '../controllers/KepengurusanControllers.js';

const router = express.Router();

router.get('/getkepengurusanbyid/:id',GetKepengurusanById)
router.get('/getkepengurusan', GetKepengurusan);
router.post('/add-kepengurusan', CreateKepengurusan);

export default router;