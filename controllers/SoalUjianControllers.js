import SoalUjian from "../models/Model_Recruitment/SoalUjian.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";
import SoalEssay from "../models/Model_Soal/SoalEssay.js";
import SoalMultiple from "../models/Model_Soal/SoalMultple.js";

export const CreateSoalUjianList = async (req, res) => {
    const listSoal = req.body;
    try {
        const { idUjian, idSoal, tahun } = listSoal;
        const existingSoal = await SoalUjian.findAll({ where: { idSoal: idSoal, idUjian: idUjian } });
        if (existingSoal.length > 0) {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: "Satu atau lebih soal sudah diinputkan",
                existingSoal: existingSoal.map(soal => soal.idSoal)
            });
        }
        const newSoalData = idSoal.map(soal => ({
            idUjian: idUjian,
            idSoal: soal,
            tahun: tahun
        }));
        await SoalUjian.bulkCreate(newSoalData);
        return res.status(201).json({
            code: 201,
            status: "success",
            message: 'Data berhasil dibuat'
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: 'Terjadi kesalahan saat membuat data',
            error: error
        });
    }
};

export const GetSoalUjianId = async (req, res) => {
    const { idUjian } = req.params
    try {
        const datasoalujian = await SoalUjian.findAll({ where: { idUjian } });
        const payload = [];
        for (const data of datasoalujian) {
            const banksoal = await BankSoal.findByPk(data.idSoal);
            let soal = null;
            let pilihan1 = null;
            let pilihan2 = null;
            let pilihan3 = null;
            let pilihan4 = null;
            let kunci = null;

            if (banksoal.tipe_soal === "Essay") {
                const soalEssay = await SoalEssay.findOne({ where: { idBankSoal: banksoal.id } });
                soal = soalEssay ? soalEssay.soal : null;
            } else if (banksoal.tipe_soal === "Multiple") {
                const soalMultiple = await SoalMultiple.findOne({ where: { idBankSoal: banksoal.id } });
                if (soalMultiple) {
                    soal = soalMultiple.soal;
                    pilihan1 = soalMultiple.pilihan1;
                    pilihan2 = soalMultiple.pilihan2;
                    pilihan3 = soalMultiple.pilihan3;
                    pilihan4 = soalMultiple.pilihan4;
                    kunci = soalMultiple.kunci;
                }
            }
            const banksoalData = {
                id: data.id,
                tipe_soal: banksoal.tipe_soal,
                tahun: data.tahun,
                createdAt: banksoal.createdAt,
                updatedAt: banksoal.updatedAt,
                soal: soal
            };

            if (banksoal.tipe_soal === "Multiple") {
                banksoalData.pilihan1 = pilihan1;
                banksoalData.pilihan2 = pilihan2;
                banksoalData.pilihan3 = pilihan3;
                banksoalData.pilihan4 = pilihan4;
                banksoalData.kunci = kunci;
            }

            payload.push(banksoalData);
        }
        return res.status(200).json({ code: 200, status: "success", data: payload });
    } catch (error) {
        console.error("Error saat proses Mengambil Soal: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Mengambil Soal" });

    }
};

export const DeleteDataSoalUjianList = async (req, res) => {
    const { id } = req.params
    try {
        const datasoal = await SoalUjian.findOne({ where: { id } });
        await datasoal.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Data Berhasil Dihapus" })
    } catch (error) {
        console.error("Error saat proses Menghapus Soal: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Menghapus Soal" });
    }
}