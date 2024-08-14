import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/Model_User/Users.js';
import Labor from '../models/Model_Kepengurusan/Labor.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import Pendaftar from '../models/Model_Recruitment/Pendaftar.js';
import Akun from '../models/Model_User/Akun.js';

// export const GetAllUsers = async (req, res) => {
//     try {
//         const allUsers = await User.findAll();
//         if (!allUsers || allUsers.length === 0) {
//             return res.status(404).json({ status: "error", code: 404, message: "Tidak ada pengguna yang ditemukan." });
//         }
//         return res.status(200).json(allUsers);
//     } catch (error) {
//         console.error("Error saat mendapatkan semua pengguna:", error);
//         return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendapatkan semua pengguna." });
//     }
// };


export const GetUserByToken = async (req, res) => {
    const { token } = req.body;
    try {
        const decryptedToken = decryptToken(token, 'encryption_secret_key');
        const decoded = jwt.verify(decryptedToken, 'secret_key');
        const user = await Akun.findOne({ where: { nim: decoded.nim } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        if (user.AksesRole !== "Super Admin") {
            const mahasiswa = await User.findOne({ where: { idAkun: user.id } })
            const labor = await Labor.findByPk(mahasiswa.idLabor);
            user.setDataValue('labor', labor);
            const payload = {
                id: mahasiswa.id,
                nama: user.nama,
                nim: user.nim,
                idLabor: mahasiswa.idLabor,
                nama_Labor: labor ? labor.nama_Labor : null,
                jenisPengguna: mahasiswa.jenisPengguna,
                JenisKelamin: mahasiswa.JenisKelamin,
                AksesRole: user.AksesRole,
            }
            return res.status(200).json({ code: 200, message: "User found", data: payload });
        } else {
            const payload = {
                id: user.id,
                nama: user.nama,
                nim: user.nim,
                AksesRole: user.AksesRole,
            }
            return res.status(200).json({ code: 200, message: "User found", data: payload });
        }
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
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

export const decryptToken = (encryptedToken, secretKey) => {
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

export const LoginUser = async (req, res) => {
    const { nim, password } = req.body;

    try {
        const user = await Akun.findOne({ where: { nim } });

        if (!user) {
            return res.status(404).json({ message: "User dengan NIM tersebut tidak terdaftar." });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login gagal. Cek kembali NIM dan password Anda." });
        }
        if (user.status_akun !== "Terverifikasi") {
            return res.status(404).json({ message: `Akun Anda Belum Terverifikasi` });
        }
        const expiresIn = 10600; // Waktu kedaluwarsa token dalam detik
        const jwtoken = jwt.sign({ nim: user.nim }, 'secret_key', { expiresIn: `${expiresIn}s` });
        const encryptedToken = encryptToken(jwtoken, 'encryption_secret_key');
        const expiry = Math.floor(Date.now() / 1000) + expiresIn;
        return res.status(200).json({ code: 200, status: "success", message: "Login berhasil.", token: encryptedToken, expiry });
    } catch (error) {
        console.error("Error saat proses login:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses login." });
    }
};

export const LoginWeb = async (req, res) => {
    const { nim, password } = req.body;

    try {
        const user = await Akun.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: "User dengan NIM tersebut tidak terdaftar." });
        }
        let mahasiswa = null
        if (user.AksesRole !== "Super Admin") {
            mahasiswa = await User.findOne({ where: { idAkun: user.id } })
        }
        const payload = {
            idLabor: user.AksesRole === "Super Admin" ? "" : mahasiswa.idLabor,
            AksesRole: user.AksesRole,
            nama: user.nama
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login gagal. Cek kembali NIM dan password Anda." });
        }
        if (user.AksesRole !== "Admin" && user.AksesRole !== "Super Admin") {
            return res.status(404).json({ message: `${user.AksesRole} Tidak Memiliki Akses Ke Dashboard Admin` });
        }
        if (user.AksesRole !== "Super Admin") {
            if (mahasiswa.jenisPengguna !== "Asisten") {
                return res.status(404).json({ message: `${user.jenisPengguna} Tidak Memiliki Akses Ke Dashboard Admin` });
            }
        }
        if (user.AksesRole !== "Super Admin") {
            if (user.status_akun !== "Terverifikasi") {
                return res.status(404).json({ message: `Akun Anda Belum Terverifikasi` });
            }
        }
        const expiresIn = 3600;
        const jwtoken = jwt.sign({ nim: user.nim }, 'secret_key', { expiresIn: `${expiresIn}s` });
        const encryptedToken = encryptToken(jwtoken, 'encryption_secret_key');
        const expiry = Math.floor(Date.now() / 1000) + expiresIn;
        return res.status(200).json({ code: 200, status: "success", message: "Login berhasil.", token: encryptedToken, expiry, data: payload });
    } catch (error) {
        console.error("Error saat proses login:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses login." });
    }
};


export const GetUsersByPengguna = async (req, res) => {
    const { jenisPengguna, idLabor } = req.body;
    if (!jenisPengguna || jenisPengguna.length === 0) {
        return res.status(400).json({ message: "At least one jenisPengguna parameter is required." });
    }

    try {
        const users = await User.findAll({
            where: { jenisPengguna: jenisPengguna, idLabor: idLabor },
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Users with these jenis pengguna not found." });
        }
        const formattedUsers = [];
        for (const user of users) {
            const labor = await Labor.findByPk(user.idLabor);
            const akunUser = await Akun.findByPk(user.idAkun);
            const formattedUser = user.toJSON();
            formattedUser.nama_Labor = labor ? labor.nama_Labor : null;
            formattedUser.nama = akunUser ? akunUser.nama : null;
            formattedUser.nim = akunUser ? akunUser.nim : null;
            formattedUsers.push(formattedUser);
        }
        return res.status(200).json({ code: 200, status: "success", message: "Data Ditemukan", formattedUsers });

    } catch (error) {
        console.error("Error fetching users by role", error);
        return res.status(500).json({ code: 500, status: "error", message: "An error occurred while processing the request." });
    }
};

export const EditUser = async (req, res) => {
    const {
        id,
        nama,
        nim,
        email,
        nomor_asisten,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        angkatan,
        JenisKelamin,
        alamat,
        note,
        Status_Pendaftar,
        verifikasi,
        idPendaftar,
        status_akun,
    } = req.body;
    let encryptedToken, expiry;
    try {
        const user = await User.findOne({ where: { id } });
        const mahasiswaAkun = await Akun.findOne({ where: { id: user.idAkun } })
        if (mahasiswaAkun.nim !== nim && mahasiswaAkun.AksesRole === "Admin") {
            const expiresIn = 3600;
            const jwtoken = jwt.sign({ nim: nim }, 'secret_key', { expiresIn: `${expiresIn}s` });
            encryptedToken = encryptToken(jwtoken, 'encryption_secret_key');
            expiry = Math.floor(Date.now() / 1000) + expiresIn;
        }
        const change = mahasiswaAkun.nim !== nim;
        if (change) {
            const existingUserWithNim = await Akun.findOne({ where: { nim } });
            if (existingUserWithNim && existingUserWithNim.nim === nim) {
                return res.status(400).json({ message: 'NIM Sudah Digunakan Oleh User Lain' });
            }
        }
        const tanggalSekarang = new Date();
        const tanggalLahir = new Date(tanggal_lahir);
        if (tanggalSekarang < tanggalLahir) {
            return res.status(400).json({ code: 400, status: "error", message: "Tanggal Lahir Tidak Benar" });
        }
        const change1 = mahasiswaAkun.email !== email;
        if (change1) {
            const existingUserWithEmail = await Akun.findOne({ where: { email } });
            if (existingUserWithEmail && existingUserWithEmail.email === email) {
                return res.status(400).json({ message: 'Email Sudah Digunakan Oleh User Lain' });
            }
        }
        if (user.jenisPengguna === "Calon Asisten") {
            const dataPendaftar = await Pendaftar.findOne({ where: { id: idPendaftar, idUsers: id } });
            let status = Status_Pendaftar
            if (dataPendaftar.verifikasi_berkas !== verifikasi) {
                if (verifikasi === "Terverifikasi") {
                    status = "Tahapan1"
                } else {
                    status = "Pendaftar"
                }
            }
            dataPendaftar.verifikasi_berkas = verifikasi;
            dataPendaftar.note = note;
            dataPendaftar.Status_Pendaftar = status
            await dataPendaftar.save();
        }
        mahasiswaAkun.nama = nama;
        mahasiswaAkun.nim = nim;
        user.angkatan = angkatan
        mahasiswaAkun.email = email;
        user.nomor_asisten = nomor_asisten;
        user.idLabor = idLabor;
        user.jenisPengguna = jenisPengguna;
        user.nomor_hp = nomor_hp;
        user.tempat_lahir = tempat_lahir;
        user.tanggal_lahir = tanggal_lahir;
        user.JenisKelamin = JenisKelamin;
        user.alamat = alamat;
        user.status_akun = status_akun;
        await user.save();
        await mahasiswaAkun.save();
        res.status(200).json({ code: 200, status: "success", message: 'User updated successfully', token: encryptedToken, expiry });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ code: 500, message: error.errors[0].message });
    }
}

export const GetUserById = async (req, res) => {
    const { id, idPendaftar } = req.body;
    try {
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        const akunMahasiswa = await Akun.findOne({ where: { id: user.idAkun } })
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        let verifikasiberkas = null
        if (user.jenisPengguna === "Calon Asisten") {
            verifikasiberkas = await Pendaftar.findOne({ where: { id: idPendaftar, idUsers: id } })
        }
        const labor = await Labor.findByPk(user.idLabor);
        user.setDataValue('labor', labor);
        const formattedUser = {
            nama: akunMahasiswa.nama,
            nim: akunMahasiswa.nim,
            email: akunMahasiswa.email,
            status_akun: akunMahasiswa.status_akun,
            angkatan: user.angkatan,
            nomor_asisten: user.nomor_asisten,
            jenisPengguna: user.jenisPengguna,
            nomor_hp: user.nomor_hp,
            idLabor: user.idLabor,
            tempat_lahir: user.tempat_lahir,
            tanggal_lahir: user.tanggal_lahir,
            JenisKelamin: user.JenisKelamin,
            alamat: user.alamat,
            nama_file: user.nama_file,
            verifikasi_berkas: verifikasiberkas?.verifikasi_berkas,
            note: verifikasiberkas?.note,
            statusPendaftar: verifikasiberkas?.Status_Pendaftar,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        return res.status(200).json({ code: 200, status: "success", message: "User Ditemukan", formattedUser });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const GetCvById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            res.status(404).json({ message: "User Tidak Ditemukan" });
        }
        return res.status(200).json({ code: 200, status: "success", nama_file: user.nama_file });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan id:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
}

export const DeletUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ code: 404, status: "Not Found", message: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ code: 200, status: "success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Error saat menghapus pengguna berdasarkan id:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
}

export const GetUserByJenisPenggunaAndIdLabor = async (req, res) => {
    const { jenisPengguna, idLabor } = req.body;
    try {
        const users = await User.findAll({ where: { jenisPengguna: jenisPengguna, idLabor: idLabor } });
        if (!users || users.length === 0) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "User Tidak Ditemukan" });
        }
        const payload = await Promise.all(users.map(async asisten => {
            const akunPeserta = await Akun.findByPk(asisten.idAkun);
            return {
                idUser: asisten.id,
                nama: akunPeserta.nama,
            }
        }))
        return res.status(200).json({ code: 200, status: "success", message: "User Ditemukan", data: payload });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan jenis pengguna dan ID laboratorium:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const GetUserByNIM = async (req, res) => {
    const { nim, email } = req.body;
    try {
        const user = await Akun.findOne({ where: { nim, email } });

        if (!user) {
            return res.status(404).json({ code: 404, status: "error", message: "Pengguna tidak ditemukan." });
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        user.kode_verifikasi = code;
        await user.save();
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
            subject: 'Kode Verifikasi Anda',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <div style="background-color: #f8f8f8; padding: 20px; border-radius: 10px; display: inline-block; margin-top: 50px;">
                        <h2 style="color: #333;">Verifikasi pemulihan password Anda</h2>
                        <p style="color: #555;">RecruitLabDSI menerima permintaan untuk menggunakan</p>
                        <p style="color: #555; font-weight: bold;">${email}</p>
                        <p style="color: #555;">sebagai email pemulihan untuk password anda. Gunakan kode ini untuk menyelesaikan penyiapan pemulihan password:</p>
                        <h1 style="color: #333; font-size: 36px; margin: 20px 0;">${code}</h1>
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
            return res.status(200).json({ code: 200, status: "success", message: "Kode verifikasi telah dikirim ke email Anda." });
        });

    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan nim: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const GetUserByKode = async (req, res) => {
    const { kode_verifikasi } = req.body;
    try {
        const user = await Akun.findOne({ where: { kode_verifikasi } });
        if (!user) {
            return res.status(404).json({ code: 404, status: "error", message: "Kode Verifikasi Anda Salah" });
        }
        const payload = {
            id: user.id,
        };
        user.kode_verifikasi = null;
        await user.save();
        return res.status(200).json({ code: 200, status: "success", message: "Kode Verifikasi Anda Benar", data: payload })
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan Kode Verifikasi: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

export const ChangePassword = async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await Akun.findOne({ where: { id } });
        const hashPassword = await argon2.hash(password);
        user.password = hashPassword
        await user.save();
        return res.status(200).json({ code: 200, status: "success", message: "Password Berhasi Diubah, Silahkan Login Kembali" })
    } catch (error) {
        console.error("Error saat mengupdate password: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
}

export const DeleteKodeVerifikasiByNIM = async (req, res) => {
    const { nim } = req.body;
    try {
        const akunUser = await Akun.findOne({ where: { nim: nim } });
        akunUser.kode_verifikasi = null
        await akunUser.save();
        return res.status(200).json({ code: 200 })
    } catch (error) {
        console.error("Error saat mengupdate KodeVerifikasi: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
};

