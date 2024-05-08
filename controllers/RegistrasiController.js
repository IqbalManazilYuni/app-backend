import argon2 from 'argon2';
import Pengguna from '../models/PenggunaModels.js';
import Labor from '../models/LaborModels.js';
import { getStorage } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const RegisterUser = async (req, res) => {
    const {
        nama,
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
        const existingUser = await Pengguna.findOne({ where: { nim } });
        if (existingUser) {
            return res.status(400).json({ message: "Pengguna dengan NIM tersebut sudah terdaftar." });
        }
        const hashedPassword = await argon2.hash(password);
        await Pengguna.create({
            nama,
            nim,
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

        return res.status(201).json({ message: "Pengguna berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan pengguna:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pengguna." });
    }
};

export const GetUserByNimRegistrasi = async (req, res) => {
    const { nim } = req.body;
    try {
        const user = await Pengguna.findOne({
            where: { nim },
            attributes: ['nama', 'nim', 'status', 'file_path', 'nomor_asisten', 'jenisPengguna', 'nomor_hp', 'idLabor', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'nama_file'],
        });
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }
        const labor = await Labor.findByPk(user.idLabor);
        user.setDataValue('labor', labor);
        const formattedUser = {
            nama: user.nama,
            nim: user.nim,
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
        nomor_asisten,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        password,
        status,
        file_path,
        nama_file,
    } = req.body;
    try {
        const user = await Pengguna.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingUserWithNim = await Pengguna.findOne({ where: { nim } });
        if (existingUserWithNim && existingUserWithNim.nim !== nim) {
            return res.status(400).json({ message: 'NIM Sudah Digunakan Oleh Pengguna Lain' });
        }
        user.nama = nama,
            user.nim = nim,
            user.nomor_asisten = nomor_asisten,
            user.password = password ? await argon2.hash(password) : existingUser.password, // hanya hash password baru jika diberikan,
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

async function uploadImage(file, quantity) {
    const storageFB = getStorage();

    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH);

    if (quantity === 'single') {
        const dateTime = Date.now();
        const fileName = `file/${dateTime}`;
        const storageRef = ref(storageFB, fileName);
        const metadata = {
            contentType: file.type,
        };
        await uploadBytesResumable(storageRef, file.buffer, metadata);
        return fileName;
    }

    // Assuming 'quantity' is either 'single' or 'multiple' based on your original code
    for (let i = 0; i < file.file.length; i++) {
        const dateTime = Date.now();
        const fileName = `file/${dateTime}`;
        const storageRef = ref(storageFB, fileName);
        const metadata = {
            contentType: file.file[i].mimetype,
        };

        // Assuming 'Image' is your mongoose model for saving image URLs
        const saveImage = await Image.create({ imageUrl: fileName });
        file.item.imageId.push({ _id: saveImage._id });
        await file.item.save();

        await uploadBytesResumable(storageRef, file.file[i].buffer, metadata);
    }
}

export const uploadPdf = async (req, res) => {
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer,
    };
    try {
        const buildFile = await uploadImage(file, 'file');
        res.send({
            status: "success",
            file: buildFile,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};