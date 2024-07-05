import express from 'express';
import { CreateDivisi, DeleteDivisi, DivisiById, EditDivisi, GetDivisi, GetDivisiByIdLabor } from '../controllers/DivisiControllers.js';
import verifyToken from '../config/middleware.js';
const router = express.Router();

router.get('/getdivisibyid/:id', verifyToken, DivisiById)
router.get('/getdivisi/:idLabor', verifyToken, GetDivisi);
router.post('/add-divisi', verifyToken, CreateDivisi);
router.post('/edit-divisi', verifyToken, EditDivisi);
router.delete('/deletedivisi/:id', verifyToken, DeleteDivisi)

export default router;