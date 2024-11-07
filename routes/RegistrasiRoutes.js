import express from 'express';
import multer from "multer";
import { PreviewPDF, EditUserRegistrasi, GetUserByNimRegistrasi, RegisterUser, RegisterSuperAdmin } from '../controllers/RegistrasiController.js';
import verifyToken from '../config/middleware.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("File harus berupa PDF"), false);
      }
    },
  });

router.post('/register', upload.single("file"),RegisterUser);
router.post('/register/superadmin', RegisterSuperAdmin);
router.post('/register/getuserbynim', GetUserByNimRegistrasi)
router.post('/register/getuserbynimwithToken', verifyToken, GetUserByNimRegistrasi)
router.post('/register/edituser', EditUserRegistrasi)
router.post('/register/edituserwithtoken', EditUserRegistrasi)
router.post('/preview-pdf', verifyToken, PreviewPDF);

export default router;