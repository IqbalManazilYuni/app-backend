import express from 'express';
import { AddModul, DeleteModul, EditModul, GetModulAll, GetModulById } from '../controllers/ModulControllers.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/getmodulbyidlabor/:idLabor', GetModulAll)
router.get('/getmodulbyid/:id', GetModulById);
router.post('/add-modul', upload.single('nama_file'), AddModul);
router.post('/edit-modul', upload.single('nama_file'), EditModul);
router.delete('/delete-modul/:id', DeleteModul)

export default router;