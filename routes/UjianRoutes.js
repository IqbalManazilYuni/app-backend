import express from 'express';
import { GetListUjianByIDLabor } from '../controllers/UjianControllers.js';

const router = express.Router();

router.get('/getujianbyidlabor/:idLabor', GetListUjianByIDLabor)

export default router;