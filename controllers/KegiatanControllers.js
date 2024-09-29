import { update } from "firebase/database";
import Kegiatan from "../models/Model_Recruitment/Kegiatan.js";
import User from "../models/Model_User/Users.js";
import { where } from "sequelize";

export const CreateKegiatan = async (req, res) => {
    const { nama_kegiatan, tahun } = req.body;
    try {
        const UserList = await User.findAll({ where: { jenisPengguna: "Calon Asisten" } });
        await Kegiatan.create({
            nama_kegiatan,
            tahun,
        });
        // const listUser = UserList.map(async (user) => {
        //     const tahunAngkatan = user.angkatan
        //     const tahunKegiatan = Number(tahun);
        //     const tahunAngkatanUser = Number(tahunAngkatan);
        //     const limitTahunDaftar = tahunKegiatan - tahunAngkatanUser;
        //     let status = user.status
        //     if (limitTahunDaftar >= 0 && limitTahunDaftar <= 1) {
        //         status = "Pendaftar"
        //         await User.update({ status }, { where: { id: user.id } });
        //     }
        // })
        return res.status(201).json({ code: 201, status: "success", message: "Kegiatan Berhasil Dibuat" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kegiatan" })
    }
};

export const GetKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findAll();
        const payload = [];
        for (const kegiatans of kegiatan) {
            const payloads = kegiatans.toJSON();
            payload.push(payloads);
        }
        return res.status(200).json({ code: 200, status: "success", message: "Kegiatan Ditemukan", data: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kegiatan" })
    }
};

export const GetKegiatanByID = async (req, res) => {
    const { id } = req.params;
    try {
        const kegiatan = await Kegiatan.findOne({ where: { id } });
        const payload = {
            id:kegiatan.id,
            nama_kegiatan: kegiatan.nama_kegiatan,
            status: kegiatan.status,
            tahun: kegiatan.tahun,
        }
        return res.status(200).json({ code: 200, status: "success", message: "Kegiatan Ditemukan", data: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kegiatan" })
    }
};

export const EditKegiatan = async (req, res) => {
    const { id, nama_kegiatan, status, tahun } = req.body;
    try {
        const kegiatan = await Kegiatan.findOne({ where: { id } });
            kegiatan.nama_kegiatan = nama_kegiatan
            kegiatan.status = status
            kegiatan.tahun = tahun
            kegiatan.status = status
            await kegiatan.save();
        return res.status(200).json({ code: 200, status: "success", message: "Kegiatan Berhasil Diperbarui" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Kegiatan" })
    }
}

export const DeleteKegiatan = async (req, res) => {
    const { id } = req.params;
    try {
        const kegiatan = await Kegiatan.findOne({ where: { id } });
        await kegiatan.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Kegiatan Berhasil Dihapus" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Kegiatan" })
    }
}