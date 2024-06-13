import Modul from '../models/Model_Modul/Modul.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from "../config/firebase.config.js";

export const GetModulAll = async (req, res) => {
    const { idLabor } = req.params
    try {
        const modul_lab = await Modul.findAll({ where: { idLabor } });
        const payload = []
        for (const moduls of modul_lab) {
            const payloads = await moduls.toJSON();
            payload.push(payloads)
        }
        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Data Modul" });
    }
};

export const AddModul = async (req, res) => {
    const { nama_modul, tahun, idLabor } = req.body
    const file = req.file
    try {
        let modulFilename = null;
        if (file) {
            const storageRef = ref(storage, `modul/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            modulFilename = file.originalname;
        }
        await Modul.create({
            nama_file: modulFilename,
            nama_modul,
            tahun,
            idLabor
        });
        return res.status(201).json({ code: 201, status: "success", message: "Modul berhasil ditambahkan." });
    } catch (error) {
        console.error("Error saat menambahkan Modul:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat menambahkan Modul." });
    }
};

export const GetModulById = async (req, res) => {
    const { id } = req.params;
    try {
        const modulLab = await Modul.findOne({ where: { id } });
        return res.status(200).json({ code: 200, status: "success", data: modulLab });
    } catch (error) {
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Data Modul" });
    }
}

export const EditModul = async (req, res) => {
    const { id, nama_modul, tahun } = req.body;
    const file = req.file

    try {
        const moodulLab = await Modul.findOne({ where: { id } });
        let modulFilename = moodulLab.nama_file
        if (file) {
            const storageRef = ref(storage, `modul/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            modulFilename = file.originalname;
        }
        moodulLab.nama_modul = nama_modul;
        moodulLab.tahun = tahun;
        moodulLab.nama_file = modulFilename

        await moodulLab.save();
        res.status(200).json({ code: 200, status: "success", message: 'Modul Berhasil Di Memperbarui' });
    } catch (error) {
        console.error('Gagal Memperbarui Modul:', error);
        res.status(500).json({ code: 500, status: "error", message: 'Gagal Memperbarui Modul' });
    }
};

export const DeleteModul = async (req, res) => {
    const { id } = req.params
    try {
        const modulLab = await Modul.findOne({ where: { id } });
        await modulLab.destroy();
        return res.status(200).json({ code: 200, status: 'success', message: "Modul Berhasil Dihapus" });
    } catch (error) {
        return res.status(500).json({ code: 500, status: 'error', message: "Gagal Menghapus Modul" });
    }
}