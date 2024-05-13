import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";

export const CreateKepengurusan = async (req, res) => {
    const { nama_kepengurusan, tahun, idLabor, generasi_kepengurusan } = req.body;
    try {
        console.log("ayam", tahun, idLabor)
        const labor = await Kepengurusan.findAll({ where: { idLabor } });
        const isDuplicateYear = labor.some(item => item.tahun === tahun);
        if (isDuplicateYear) {
            return res.status(400).json({ code: 400, status: "Bad Request", message: "Terdapat Kepengurusan dengan tahun yang sama" });
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
    try {
        const kepengurusan = await Kepengurusan.findAll();
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan Tidak Ditemukan" });
        }
        const payload = [];
        for(const kepengurusans of kepengurusan){
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
    const { id } = req.params
    try {
        const kepengurusan = await Kepengurusan.findOne({ where: { id } });
        if (!kepengurusan) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Kepengurusan Tidak Ditemukan" });
        }
        return res.status(200).json({ code: 200, status: "Ok", message: "Kepengurusan Ditemukan", data: kepengurusan });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Kepengurusa" })
    }
}