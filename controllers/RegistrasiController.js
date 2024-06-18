import argon2 from 'argon2';
import Labor from '../models/Model_Kepengurusan/Labor.js';
import User from '../models/Model_User/Users.js';
import dotenv from 'dotenv';
import storage from '../config/firebase.config.js';
import { ref, getDownloadURL } from 'firebase/storage';

dotenv.config();

export const PreviewPDF = async (req, res) => {
    const { id, nama_file, file_type } = req.body;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User Tidak Ditemukan" });
        }

        let folderPath;
        switch (file_type) {
            case 'file_krs':
                folderPath = '/krs';
                break;
            case 'file_permohonan':
                folderPath = '/file_permohonan';
                break;
            case 'nama_file':
                folderPath = '/cv';
                break;
            default:
                return res.status(400).json({ message: 'Invalid file type' });
        }

        const fileRef = ref(storage, `${folderPath}/${nama_file}`);
        const url = await getDownloadURL(fileRef);
        return res.status(200).json({ code: 200, status: "success", URL: url });
    } catch (error) {
        console.error('Error downloading PDF:', error);
        return res.status(500).json({ message: 'Failed to download PDF' });
    }
};

export const RegisterUser = async (req, res) => {
    const {
        nama,
        email,
        nim,
        nomor_asisten,
        password,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        AksesRole,
        angkatan,
        status,
        nama_file,
    } = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password harus terdiri dari setidaknya 8 karakter dan mengandung setidaknya satu huruf besar, satu angka, dan satu karakter khusus." });
    }
    try {
        const existingUser = await User.findOne({ where: { nim } });
        if (existingUser) {
            return res.status(400).json({ message: "User dengan NIM tersebut sudah terdaftar." });
        }
        const existtingEmail = await User.findOne({ where: { email } });
        if (existtingEmail) {
            return res.status(400).json({ message: "User dengan Email tersebut sudah terdaftar." });
        }
        const tanggalLahir = new Date(tanggal_lahir);
        const tanggalSekarang = new Date();
        if (tanggalSekarang < tanggalLahir) {
            return res.status(400).json({ code: 400, status: "error", message: "Tanggal Lahir Tidak Benar" });
        }
        const hashedPassword = await argon2.hash(password);
        await User.create({
            nama,
            nim,
            email,
            nomor_asisten,
            password: hashedPassword,
            status,
            idLabor,
            angkatan,
            jenisPengguna,
            nomor_hp,
            tempat_lahir,
            tanggal_lahir,
            JenisKelamin,
            alamat,
            AksesRole,
            nama_file,
        });

        return res.status(201).json({ code: 201, status: "success", message: "User berhasil didaftarkan." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, message: error.errors[0].message });
    }
};

export const GetUserByNimRegistrasi = async (req, res) => {
    const { nim } = req.body;
    console.log(nim)
    try {
        const user = await User.findOne({
            where: { nim },
            attributes: ['id', 'nama', 'email', 'nim', 'status', 'angkatan', 'nomor_asisten', 'jenisPengguna', 'nomor_hp', 'idLabor', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'nama_file'],
        });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        const labor = await Labor.findByPk(user.idLabor);
        user.setDataValue('labor', labor);
        const formattedUser = {
            id: user.id,
            nama: user.nama,
            nim: user.nim,
            email: user.email,
            nomor_asisten: user.nomor_asisten,
            jenisPengguna: user.jenisPengguna,
            nomor_hp: user.nomor_hp,
            idLabor: user.idLabor,
            status: user.status,
            tempat_lahir: user.tempat_lahir,
            tanggal_lahir: user.tanggal_lahir,
            JenisKelamin: user.JenisKelamin,
            alamat: user.alamat,
            nama_file: user.nama_file,
            angkatan: user.angkatan,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        console.log(formattedUser);
        return res.status(200).json({ code: 200, status: "success", message: "Data Ditemukan", formattedUser });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan nim:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const EditUserRegistrasi = async (req, res) => {
    const {
        id,
        nama,
        nim,
        email,
        nomor_asisten,
        idLabor,
        jenisPengguna,
        nomor_hp,
        angkatan,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        status,
        nama_file,
    } = req.body;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingUserWithNim = await User.findOne({ where: { nim } });
        if (user.nim !== nim) {
            if (existingUserWithNim && existingUserWithNim.nim === nim) {
                return res.status(400).json({ message: 'NIM Sudah Digunakan Oleh User Lain' });
            }
        }
        const tanggalLahir = new Date(tanggal_lahir);
        const tanggalSekarang = new Date();
        if (tanggalSekarang < tanggalLahir) {
            return res.status(400).json({ code: 400, status: "error", message: "Tanggal Lahir Tidak Benar" });
        }
        const existingUserWithEmail = await User.findOne({ where: { email } });
        if (user.email !== email) {
            if (existingUserWithEmail && existingUserWithEmail.email === email) {
                return res.status(400).json({ message: 'Email Sudah Digunakan Oleh User Lain' });
            }
        }
        user.nama = nama,
            user.nim = nim,
            user.email = email,
            user.angkatan = angkatan,
            user.nomor_asisten = nomor_asisten,
            user.status = status,
            user.idLabor = idLabor,
            user.jenisPengguna = jenisPengguna,
            user.nomor_hp = nomor_hp,
            user.tempat_lahir = tempat_lahir,
            user.tanggal_lahir = tanggal_lahir,
            user.JenisKelamin = JenisKelamin,
            user.alamat = alamat,
            user.nama_file = nama_file,
            await user.save();
        res.status(200).json({ code: 200, status: "success", message: 'Berhasil Memperbarui Data Pengguna' });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.errors[0].message });
    }
};

