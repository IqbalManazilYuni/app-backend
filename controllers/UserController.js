import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Users from "../models/Users.js";
import crypto from 'crypto';
import { where } from 'sequelize';

export const RegisterUser = async (req, res) => {
    const {
        nama,
        nim,
        no_lab,
        password,
        role,
        nomor_hp,
        lab,
        tempat_lahir,
        tanggal_lahir,
        gender,
        alamat
    } = req.body;

    try {
        // Cek apakah pengguna sudah ada dalam basis data berdasarkan NIM atau nomor HP
        const existingUser = await Users.findOne({ where: { nim } });


        // Jika pengguna sudah ada, kirim respons bahwa pengguna sudah terdaftar
        if (existingUser) {
            return res.status(400).json({ message: "Pengguna dengan NIM tersebut sudah terdaftar." });
        }

        // Hash password menggunakan Argon2
        const hashedPassword = await argon2.hash(password);

        // Jika pengguna belum ada, tambahkan pengguna baru ke dalam basis data
        await Users.create({
            nama,
            nim,
            no_lab,
            password: hashedPassword, // Gunakan password yang telah di-hash
            role,
            nomor_hp,
            lab,
            tempat_lahir,
            tanggal_lahir,
            gender,
            alamat
        });

        return res.status(201).json({ message: "Pengguna berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan pengguna:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pengguna." });
    }
};

export const GetAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.findAll();
        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({ status: "error", code: 404, message: "Tidak ada pengguna yang ditemukan." });
        }
        return res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error saat mendapatkan semua pengguna:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendapatkan semua pengguna." });
    }
};

export const GetUserByRole = async (req, res) => {
    const { role } = req.body;
    try {
        const user = await Users.findAll({ where: { role } });
        if (!user) {
            return res.status(404).json({ message: "User role not found." });
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan role", error);
        return res.status(500).json({ message: "Terjadi Kesalahan saat memproses permintaan pengambilan role." });
    }
}

const decryptToken = (encryptedToken, secretKey) => {
    try {
        const key = Buffer.alloc(32);
        const providedKeyBuffer = Buffer.from(secretKey, 'utf8');
        providedKeyBuffer.copy(key, 0, 0, Math.min(providedKeyBuffer.length, key.length));
        const iv = Buffer.from(encryptedToken.slice(0, 32), 'hex');
        const encryptedText = encryptedToken.slice(32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error("Error saat mendekripsi token:", error);
        throw new Error("Gagal mendekripsi token");
    }
};

export const GetUserByToken = async (req, res) => {
    const { token } = req.body;
    try {
        const decryptedToken = decryptToken(token, 'encryption_secret_key');
        const decoded = jwt.verify(decryptedToken, 'secret_key');
        const user = await Users.findOne({ where: { nim: decoded.nim } });
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
};
const encryptToken = (token, secretKey) => {
    const key = Buffer.alloc(32);
    const providedKeyBuffer = Buffer.from(secretKey, 'utf8');
    providedKeyBuffer.copy(key, 0, 0, Math.min(providedKeyBuffer.length, key.length));
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
};

export const LoginUser = async (req, res) => {
    const { nim, password } = req.body;

    try {
        const user = await Users.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: "Pengguna dengan NIM tersebut tidak terdaftar." });
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login gagal. Cek kembali NIM dan password Anda." });
        }
        const jwtoken = jwt.sign({ nim: user.nim }, 'secret_key', { expiresIn: '1h' });
        const encryptedToken = encryptToken(jwtoken, 'encryption_secret_key');
        user.token = encryptedToken.slice(0, 16);
        await user.save();

        return res.status(200).json({ message: "Login berhasil.", token: encryptedToken });
    } catch (error) {
        console.error("Error saat proses login:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat proses login." });
    }
};

export const GetUserByUUID = async (req, res) => {
    const { uuid } = req.body;
    try {
        const user = await Users.findOne({ where: { uuid } });
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
}

export const GetUserByNim = async (req, res) => {
    const { nim } = req.body;
    try {
        const user = await Users.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }
        return res.status(200).json({user});
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
}

export const EditUser = async (req, res) => {
    const { uuid, nim, no_lab, nama, lab, tanggal_lahir, nomor_hp, gender, tempat_lahir, alamat, role } = req.body;
    try {
        const user = await Users.findOne({ where: { uuid } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cek apakah nim yang baru ingin diubah sudah ada di tabel Users
        const existingUserWithNim = await Users.findOne({ where: { nim } });
        if (existingUserWithNim && existingUserWithNim.uuid !== uuid) {
            return res.status(400).json({ message: 'NIM is already in use by another user' });
        }

        // Update data pengguna jika nim belum digunakan oleh pengguna lain
        user.nim = nim;
        user.no_lab = no_lab;
        user.nama = nama;
        user.lab = lab;
        user.tanggal_lahir = tanggal_lahir;
        user.nomor_hp = nomor_hp;
        user.gender = gender;
        user.tempat_lahir = tempat_lahir;
        user.alamat = alamat;
        user.role = role;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
}


export const DeletUser = async (req, res) => {
    const { uuid } = req.body;
    try {
        const user = await Users.findOne({ where: { uuid: uuid } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
