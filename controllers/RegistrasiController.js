import argon2 from 'argon2';
import Labor from '../models/Model_Kepengurusan/Labor.js';
import User from '../models/Model_User/Users.js';
import dotenv from 'dotenv';
import storage from '../config/firebase.config.js';
import { ref, getDownloadURL } from 'firebase/storage';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import crypto from 'crypto';
import { stat } from 'fs';

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
    const minLengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    let errorMessage = "Password harus terdiri dari setidaknya 8 karakter";

    if (!minLengthRegex.test(password)) {
        errorMessage += ", memiliki panjang minimal 8 karakter";
    }

    if (!uppercaseRegex.test(password)) {
        errorMessage += ", mengandung setidaknya satu huruf besar";
    }

    if (!lowercaseRegex.test(password)) {
        errorMessage += ", mengandung setidaknya satu huruf kecil";
    }

    if (!digitRegex.test(password)) {
        errorMessage += ", mengandung setidaknya satu angka";
    }

    if (errorMessage !== "Password harus terdiri dari setidaknya 8 karakter") {
        return res.status(400).json({ message: errorMessage });
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
        const token = crypto.randomBytes(32).toString('hex');
        console.log(token);
        const newUser = await User.create({
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
            status_akun: "Tidak Terverifikasi",
            verifikasiToken: token,
        });
        const link = `http://localhost:3000/verifikasi-akun/${token}`
        if (jenisPengguna === "Calon Asisten") {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            let mailOptions = {
                from: `"no-reply" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Verifikasi Akun Anda',
                html: `
    <div style="font-family: Arial, sans-serif; text-align: center;">
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 10px; display: inline-block; margin-top: 50px;">
            <h2 style="color: #333;">Verifikasi Akun yang telah Anda Daftarkan</h2>
            <p style="color: #555;">Anda Telah Mendaftarkan Akun Anda Pada aplikasi kami dengan menggunakan akun email</p>
            <p style="color: #555; font-weight: bold;">${email}</p>
            <p style="color: #555;">Selanjutnya Anda Diharapkan untuk Melakukan Verifikasi Akun Anda dengan Link Berikut:</p>
            <a href="${link}" style="background-color: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block; margin: 20px 0;">Verifikasi Akun Anda</a>
            <p style="color: #555;">Jika Ada kendala harap hubungi Admin Laboratorium.</p>
        </div>
    </div>
`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error saat mengirim email: ", error);
                    return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat mengirim email." });
                }
            });
        }
        return res.status(201).json({ code: 201, status: "success", message: "User berhasil didaftarkan." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, message: error.errors[0].message });
    }
};

export const VerifikasiAkun = async (req, res) => {
    const { token } = req.body
    try {
        const userToken = await User.findOne({ where: { verifikasiToken: token } });
        if (!userToken) {
            return res.status(400).json({ code: 404, status: "Bad Request", message: "Akun Anda Sudah Terverifikasi" })
        }
        userToken.status_akun = "Terverifikasi"
        userToken.verifikasiToken = null
        await userToken.save();
        return res.status(200).json({ code: 200, status: "success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, message: error.errors[0].message });
    }
}

export const GetUserByNimRegistrasi = async (req, res) => {
    const { nim } = req.body;
    console.log(nim)
    try {
        const user = await User.findOne({
            where: { nim }
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

