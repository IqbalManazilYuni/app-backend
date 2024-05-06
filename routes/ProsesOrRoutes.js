import express from 'express';
import { CreateProsesOr, GetProsesOrByLabor } from '../controllers/ProsesOrController';

const router = express.Router();

router.post('/proses-lab', GetProsesOrByLabor);
router.post('/add-proses', CreateProsesOr);

export default router;