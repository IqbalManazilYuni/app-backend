import jwt from 'jsonwebtoken';
import { decryptToken } from '../controllers/UserController.js';

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const splittoken = token.split(' ')[1];
        if (!splittoken) {
            return res.status(403).json({ code: 403, status: "error", message: "Token tidak tersedia" });
        }

        const decryptedToken = decryptToken(splittoken, 'encryption_secret_key');
        const decoded = jwt.verify(decryptedToken, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error saat verifikasi token:", error);
        return res.status(401).json({ code: 401, status: "error", message: "Token tidak valid atau telah kedaluwarsa" });
    }
};

export default verifyToken;