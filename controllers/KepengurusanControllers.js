import { where } from "sequelize";
import DetailKepengurusan from "../models/Model_Kepengurusan/DetailKepengurusan.js";
import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";
import User from "../models/Model_User/Users.js";
import Divisi from "../models/Model_Kepengurusan/Divisi.js";

export const CreateKepengurusan = async (req, res) => {
    const { nama_kepengurusan, tahun, idLabor, generasi_kepengurusan } = req.body;
    try {
        const existingKepengurusan = await Kepengurusan.findOne({ where: { idLabor, generasi_kepengurusan } });
        if (existingKepengurusan) {
            return res.status(400).json({ code: 400, status: "error", message: "Kepengurusan dengan idLabor dan generasi yang sama sudah ada" });
        }
        const kepengurusan = await Kepengurusan.create({
            nama_kepengurusan: nama_kepengurusan,
            tahun: tahun,
            idLabor: idLabor,
            generasi_kepengurusan: generasi_kepengurusan
        });
        return res.status(201).json({ code: 201, status: "success", message: "Kepengurusan Berhasil Dibuat", data: kepengurusan });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kepengurusa" })
    }
};

export const GetKepengurusan = async (req, res) => {
    const { idLabor } = req.body
    try {
        const kepengurusan = await Kepengurusan.findAll({ where: { idLabor } });
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan Tidak Ditemukan" });
        }
        const payload = [];
        for (const kepengurusans of kepengurusan) {
            const labor = await Labor.findByPk(kepengurusans.idLabor);
            const payloads = kepengurusans.toJSON();
            payloads.nama_Labor = labor ? labor.nama_Labor : null;
            payload.push(payloads);
        }
        return res.status(200).json({ code: 200, status: "Ok", message: "Kepengurusan Ditemukan", data: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kepengurusa" })
    }
}

export const GetKepengurusanById = async (req, res) => {
    const { id } = req.params;
    try {
        const kepengurusan = await Kepengurusan.findOne({ where: { id } });
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan Tidak Ditemukan" });
        }
        const labor = await Labor.findByPk(kepengurusan.idLabor);
        kepengurusan.setDataValue('labor', labor);

        const payload = {
            ...kepengurusan.dataValues,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        return res.status(200).json({ code: 200, status: "Ok", message: "Kepengurusan Ditemukan", data: payload });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Kepengurusan" });
    }
};

export const EditKepengurusan = async (req, res) => {
    const { id, nama_kepengurusan, tahun, idLabor, generasi_kepengurusan } = req.body;
    try {
        const kepengurusan = await Kepengurusan.findOne({ where: { id } });
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan Tidak Ditemukan" });
        }
        const change = kepengurusan.generasi_kepengurusan !== generasi_kepengurusan;
        if (change) {
            const existingKepengurusan = await Kepengurusan.findOne({ where: { idLabor, generasi_kepengurusan } });
            if (existingKepengurusan) {
                return res.status(400).json({ code: 400, status: "error", message: "Kepengurusan dengan idLabor dan generasi yang sama sudah ada" });
            }
        }
        kepengurusan.nama_kepengurusan = nama_kepengurusan;
        kepengurusan.tahun = tahun;
        kepengurusan.idLabor = idLabor;
        kepengurusan.generasi_kepengurusan = generasi_kepengurusan;
        await kepengurusan.save();
        return res.status(200).json({ code: 200, status: "success", message: "Kepengurusan berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengupdate Kepengurusan" });
    }
}

export const DeleteKepengurusan = async (req, res) => {
    const { id } = req.params;
    try {
        const kepengurusan = await Kepengurusan.findOne({ where: { id } });
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan tidak ditemukan" });
        }
        await kepengurusan.destroy();
        return res.status(200).json({ code: 200, status: "OK", message: "Kepengurusan berhasil dihapus" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Menghapus Kepengurusan" });
    }
};

export const CreateDetailKepengurusan = async (req, res) => {
    const { idKepengurusan, idUsers, idDivisi, jabatan } = req.body;
    try {
        console.log("ayam: ", jabatan);

        // Cek jika detail kepengurusan dengan idKepengurusan dan idUsers sudah ada
        const detailKepengurusan = await DetailKepengurusan.findOne({ where: { idKepengurusan, idUsers } });
        if (detailKepengurusan) {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Detail Kepengurusan dengan Users dan Kepengurusan yang sama sudah ada"
            });
        }

        // Cek jika sudah ada detail kepengurusan dengan idKepengurusan
        const checkDetailKepengurusan = await DetailKepengurusan.findAll({ where: { idKepengurusan } });
        if (checkDetailKepengurusan.length > 0) {
            // Pengecekan untuk jabatan khusus
            if (jabatan === "Koordinator Asisten" || jabatan === "Bendahara" || jabatan === "Sekretaris") {
                const failedJabatan = await DetailKepengurusan.findOne({ where: { idKepengurusan, jabatan } });
                if (failedJabatan) {
                    return res.status(400).json({
                        code: 400,
                        status: "error",
                        message: `Detail Kepengurusan dengan jabatan ${jabatan} sudah ada`
                    });
                }
            }

            // Pengecekan untuk jabatan Kepala Divisi
            if (jabatan === "Kepala Divisi") {
                const kepalaDivisiFailed = await DetailKepengurusan.findOne({ where: { idKepengurusan, idDivisi } });
                if (kepalaDivisiFailed && kepalaDivisiFailed.jabatan === "Kepala Divisi") {
                    return res.status(400).json({
                        code: 400,
                        status: "error",
                        message: `Detail Kepengurusan dengan jabatan ${jabatan} sudah ada`
                    });
                }
            }
        }

        // Membuat detail kepengurusan baru
        const kepengurusan = await DetailKepengurusan.create({
            idKepengurusan,
            idUsers,
            idDivisi,
            jabatan
        });

        return res.status(201).json({
            code: 201,
            status: "success",
            message: "Detail Kepengurusan Berhasil Dibuat",
            data: kepengurusan
        });
    } catch (error) {
        console.error("Terjadi Kesalahan Dalam Membuat Kepengurusan:", error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Terjadi Kesalahan Dalam Membuat Kepengurusan"
        });
    }
};



export const DetailKepengurusanLab = async (req, res) => {
    const { idKepengurusan } = req.body;
    try {
        const detailkepengurusan = await DetailKepengurusan.findAll({ where: { idKepengurusan } });
        if (!detailkepengurusan.length) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Detail Kepengurusan Tidak ditemukan" });
        }

        const payload = await Promise.all(detailkepengurusan.map(async detail => {
            const user = await User.findByPk(detail.idUsers);
            const divisi = await Divisi.findByPk(detail.idDivisi);

            return {
                ...detail.toJSON(),
                nama: user ? user.nama : null,
                nama_divisi: divisi ? divisi.nama_divisi : null
            };
        }));

        return res.status(200).json({ code: 200, status: "success", data: payload });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kepengurusan" });
    }
}
