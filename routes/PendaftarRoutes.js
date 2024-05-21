import express from 'express';
import { CreatePendaftar } from '../controllers/PendaftarControllers.js';

const router = express.Router();

router.post('/add-pendaftar', CreatePendaftar)

export default router;