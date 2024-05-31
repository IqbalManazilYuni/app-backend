import argon2 from 'argon2';
import Labor from '../models/Model_Kepengurusan/Labor.js';
import User from '../models/Model_User/Users.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const DownloadPdf = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User Tidak Ditemukan" });
        }
        const nama_file = user.nama_file;

        const response = await fetch(`https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/pdfs%2F${encodeURIComponent(nama_file)}?alt=media`);
        if (!response.ok) {
            throw new Error("Failed to download file from Firebase Storage");
        }
        const fileBuffer = await response.buffer();

        // Set content-type header based on file type
        res.set('Content-Type', 'application/pdf');

        // Send the file to the client along with the filename
        res.json({ fileBuffer, fileName: nama_file });
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ message: 'Failed to download PDF' });
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
        status,
        file_path,
        nama_file,
    } = req.body;
    try {
        const existingUser = await User.findOne({ where: { nim } });
        if (existingUser) {
            return res.status(400).json({ message: "User dengan NIM tersebut sudah terdaftar." });
        }
        const existtingEmail = await User.findOne({ where: { email } });
        if (existtingEmail) {
            return res.status(400).json({ message: "User dengan Email tersebut sudah terdaftar." });
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
            jenisPengguna,
            nomor_hp,
            tempat_lahir,
            tanggal_lahir,
            JenisKelamin,
            alamat,
            AksesRole,
            file_path,
            nama_file,
        });

        return res.status(201).json({ message: "User berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan pengguna:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pengguna." });
    }
};

export const GetUserByNimRegistrasi = async (req, res) => {
    const { nim } = req.body;
    try {
        const user = await User.findOne({
            where: { nim },
            attributes: ['id', 'nama', 'email','nim', 'status', 'file_path', 'nomor_asisten', 'jenisPengguna', 'nomor_hp', 'idLabor', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'nama_file'],
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
            file_path: user.file_path,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        return res.status(200).json({ code: 200, status: "success", message: "Data Ditemukan", formattedUser });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const EditUserRegistrasi = async (req, res) => {
    const {
        nama,
        nim,
        email,
        nomor_asisten,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        status,
        file_path,
        nama_file,
    } = req.body;
    try {
        const user = await User.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingUserWithNim = await User.findOne({ where: { nim } });
        if (existingUserWithNim && existingUserWithNim.nim !== nim) {
            return res.status(400).json({ message: 'NIM Sudah Digunakan Oleh User Lain' });
        }
        const existingUserWithEmail = await User.findOne({ where: { email } });
        if (existingUserWithEmail && existingUserWithEmail.email !== email) {
            return res.status(400).json({ message: 'Email Sudah Digunakan Oleh User Lain' });
        }
        user.nama = nama,
            user.nim = nim,
            user.email = email,
            user.nomor_asisten = nomor_asisten,
            user.status = status,
            user.idLabor = idLabor,
            user.jenisPengguna = jenisPengguna,
            user.nomor_hp = nomor_hp,
            user.tempat_lahir = tempat_lahir,
            user.tanggal_lahir = tanggal_lahir,
            user.JenisKelamin = JenisKelamin,
            user.alamat = alamat,
            user.file_path = file_path,
            user.nama_file = nama_file,
            await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

