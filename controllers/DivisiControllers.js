import Divisi from "../models/Model_Kepengurusan/Divisi.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";

export const CreateDivisi = async (req, res) => {
    const { nama_divisi, idLabor, deskripsi } = req.body;
    try {
        const divisi = await Divisi.create({
            nama_divisi,
            idLabor,
            deskripsi
        });
        return res.status(201).json({ code: 201, status: "success", message: "Berhasil Membuat Divisi Baru" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Divisi" })
    }
};

export const EditDivisi = async (req, res) => {
    const { id, nama_divisi, idLabor, deskripsi } = req.body;
    try {
        const divisi = await Divisi.findOne({ where: { id } });
        if(!divisi){
            return res.status(404).json({ code:404, status:"Not Found", message:"Divisi Tidak Ditemukan"});
        }
        divisi.nama_divisi = nama_divisi,
        divisi.idLabor = idLabor,
        divisi.deskripsi = deskripsi
        await divisi.save();
        return res.status(200).json({code:200, status:"success", message:"Berhasi Melakukan Update Pada Divisi"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengupdate Divisi" });
    }
}

export const DivisiById = async (req, res) => {
    const { id } = req.params;
    try {
        const divisi = await Divisi.findOne({ where: { id } });
        if (!divisi) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Divisi Tidak Ditemukan" });
        }
        const labor = await Labor.findByPk(divisi.idLabor);
        divisi.setDataValue('labor', labor);

        const payload = {
            ...divisi.dataValues,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        return res.status(200).json({ code: 200, status: "Ok", message: "Divisi Ditemukan", data: payload });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Divisi" });
    }
};

export const GetDivisi = async (req, res) => {
    try {
        const divisi = await Divisi.findAll();
        if (!divisi) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Divisi Tidak Ditemukan" });
        }
        const payload = [];
        for (const divisis of divisi) {
            const labor = await Labor.findByPk(divisis.idLabor);
            const payloads = divisis.toJSON();
            payloads.nama_Labor = labor ? labor.nama_Labor : null;
            payload.push(payloads);
        }
        return res.status(200).json({ code: 200, status: "Ok", message: "Divisi Ditemukan", data: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membuat Divisi" })
    }
};