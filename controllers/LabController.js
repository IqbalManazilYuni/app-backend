
import storage from "../config/firebase.config.js";
import DetailKepengurusan from "../models/Model_Kepengurusan/DetailKepengurusan.js";
import Divisi from "../models/Model_Kepengurusan/Divisi.js";
import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import User from "../models/Model_User/Users.js";

export const AddLab = async (req, res) => {
    const { nama_Labor, deskripsi } = req.body;
    const file = req.file;

    try {
        let logoFileName = null;
        if (file) {
            const storageRef = ref(storage, `logo/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            logoFileName = file.originalname;
        }

        const newLab = await Labor.create({
            logo: logoFileName,
            nama_Labor,
            deskripsi
        });
        return res.status(201).json({ code: 201, status: "success", message: "Laboratorium berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan Laboratorium:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendaftarkan Laboratorium." });
    }
};

export const GetLab = async (req, res) => {
    try {
        const allLab = await Labor.findAll();
        if (!allLab || allLab.length === 0) {
            return res.status(404).json({ status: "error", code: 404, message: "Tidak ada Laboratorium yang ditemukan." });
        }
        return res.status(200).json({ code: 200, status: "success", message: "Data Laboratorium ditemukan", data: allLab });
    } catch (error) {
        console.error("Error saat mendapatkan semua Laboratorium:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendapatkan semua Laboratorium." });
    }
};

export const GetLabByID = async (req, res) => {
    const { id } = req.body;
    try {
        const lab = await Labor.findOne({ where: { id } })
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Laboratorium Not Found" });
        }
        return res.status(200).json({ code: 200, status: "status", message: "Laboratorium Ditemukan", data: lab })
    } catch (error) {
        console.error("Error saat mengambil Laboratorium berdasarkan id", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi Kesalahan saat memproses permintaan pengambilan id." });
    }
};

export const EditLab = async (req, res) => {
    const { id, nama_Labor, deskripsi } = req.body;
    const file = req.file;

    try {
        const lab = await Labor.findOne({ where: { id } });
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: 'Laboratorium not found' });
        }

        let logoFileName = lab.logo;
        if (file) {
            const storageRef = ref(storage, `logo/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            logoFileName = file.originalname;
        }

        lab.nama_Labor = nama_Labor;
        lab.deskripsi = deskripsi;
        lab.logo = logoFileName;

        await lab.save();
        res.status(200).json({ code: 200, status: "success", message: 'Laboratorium updated successfully'});
    } catch (error) {
        console.error('Error updating Laboratorium:', error);
        res.status(500).json({ code: 500, status: "error", message: 'Failed to update Laboratorium' });
    }
};

export const DeleteLab = async (req, res) => {
    const { id } = req.params;
    try {
        const lab = await Labor.findOne({ where: { id } });
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: 'Laboratorium not found' });
        }
        await lab.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Laboratorium deleted successfully" });
    } catch (error) {
        console.error('Error Delete Laboratorium:', error);
        res.status(500).json({ code: 500, status: "error", message: 'Failed to delete Laboratorium' });
    }
};
export const GetKepengurusanByIDLabor = async (req, res) => {
    const { idLabor } = req.params;
    try {
        // Ambil data semua kepengurusan berdasarkan idLabor
        const kepengurusanLabor = await Kepengurusan.findAll({ where: { idLabor } });

        // Siapkan array untuk menyimpan semua promises
        const detailKepengurusanPromises = kepengurusanLabor.map(async (kepengurusan) => {
            const detailKepengurusanList = await DetailKepengurusan.findAll({ where: { idKepengurusan: kepengurusan.id } });
            const payloads = kepengurusan.toJSON();
            payloads.details = [];

            if (detailKepengurusanList.length > 0) {
                // Ambil detail divisi dan user untuk setiap detail kepengurusan
                for (const detailKepengurusan of detailKepengurusanList) {
                    const divisi = await Divisi.findOne({ where: { id: detailKepengurusan.idDivisi } });
                    const user = await User.findOne({ where: { id: detailKepengurusan.idUsers } });

                    const detailPayload = {
                        idUsers: detailKepengurusan.idUsers,
                        idDivisi: detailKepengurusan.idDivisi,
                        jabatan: detailKepengurusan.jabatan,
                        idDetail: detailKepengurusan.id,
                        nama_divisi: divisi ? divisi.nama_divisi : null,
                        deskripsi: divisi ? divisi.deskripsi : null,
                        nama: user ? user.nama : null,
                        nomor_asisten: user ? user.nomor_asisten : null,
                        JenisKelamin: user ? user.JenisKelamin : null
                    };

                    payloads.details.push(detailPayload);
                }
            }
            return payloads;
        });
        const detailKepengurusanLabor = await Promise.all(detailKepengurusanPromises);
        return res.status(200).json({ code: 200, status: "success", data: detailKepengurusanLabor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
}


