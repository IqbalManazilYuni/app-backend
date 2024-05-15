import express from 'express';
import { CreateDivisi, DivisiById, EditDivisi, GetDivisi } from '../controllers/DivisiControllers.js';
const router = express.Router();

router.get('/getdivisibyid/:id',DivisiById)
router.get('/getdivisi', GetDivisi);
router.post('/add-divisi', CreateDivisi);
router.post('/edit-divisi', EditDivisi);
// router.delete('/deletekepengurusan/:id', DeleteKepengurusan)

export default router;