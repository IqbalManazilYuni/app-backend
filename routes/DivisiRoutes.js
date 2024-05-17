import express from 'express';
import { CreateDivisi, DeleteDivisi, DivisiById, EditDivisi, GetDivisi, GetDivisiByIdLabor } from '../controllers/DivisiControllers.js';
const router = express.Router();

router.get('/getdivisibyid/:id',DivisiById)
router.get('/getdivisi/:idLabor', GetDivisi);
router.post('/add-divisi', CreateDivisi);
router.post('/edit-divisi', EditDivisi);
router.delete('/deletedivisi/:id', DeleteDivisi)

export default router;