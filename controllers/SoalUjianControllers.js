import SoalUjian from "../models/Model_Recruitment/SoalUjian.js";

export const CreateSoalUjianList = async (req, res) => {
    const listSoal = req.body
    try {
        const { idUjian, idSoal, tahun } = listSoal;
        idSoal.forEach(async (soal) => {
            const data = {
                idUjian: idUjian,
                idSoal: soal,
                tahun: tahun
            };
           await SoalUjian.create(data);
        });
        return res.status(201).json({ code: 201, status: "success", message: 'Data berhasil dibuat' });
    } catch (error) {
        return res.status(500).json({ code: 500, status: "error", message: 'Terjadi kesalahan saat membuat data', error: error });
    }
}