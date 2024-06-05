import Labor from "../models/Model_Kepengurusan/Labor.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";
import SoalEssay from "../models/Model_Soal/SoalEssay.js";
import SoalMultiple from "../models/Model_Soal/SoalMultple.js";

export const CreateSoalUjian = async (req, res) => {
    const { idLabor, tipe_soal, tahun, soal } = req.body;

    if (tipe_soal === "Essay") {
        try {
            const banksoal = await BankSoal.create({
                idLabor,
                tipe_soal,
                tahun
            });
            await SoalEssay.create({
                idBankSoal: banksoal.id,
                soal: soal,
            });
            return res.status(201).json({ code: 201, status: "success", message: "Berhasil Menambahkan Soal Essay" });

        } catch (error) {
            console.error("Error saat proses Menambahkan Soal Essay: ", error);
            return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Menambahkan Soal Essay." });
        }
    } else if (tipe_soal === "Multiple") {
        const { pilihan1, pilihan2, pilihan3, pilihan4, kunci } = req.body;
        try {
            const banksoal = await BankSoal.create({
                idLabor,
                tipe_soal,
                tahun
            });
            await SoalMultiple.create({
                idBankSoal: banksoal.id,
                soal: soal,
                pilihan1,
                pilihan2,
                pilihan3,
                pilihan4,
                kunci
            });
            return res.status(201).json({ code: 201, status: "success", message: "Berhasil Menambahkan Soal Multiple" });

        } catch (error) {
            console.error("Error saat proses Menambahkan Soal Multiple: ", error);
            return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Menambahkan Soal Multiple." });
        }
    }
};

export const GetBankSoal = async (req, res) => {
    const { idLabor } = req.params;
    try {
        const Banksoal = await BankSoal.findAll({ where: { idLabor } });
        const payload = [];

        for (const banksoal of Banksoal) {
            const labor = await Labor.findByPk(banksoal.idLabor);
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
                id: banksoal.id,
                idLabor: banksoal.idLabor,
                tipe_soal: banksoal.tipe_soal,
                tahun: banksoal.tahun,
                createdAt: banksoal.createdAt,
                updatedAt: banksoal.updatedAt,
                nama_Labor: labor ? labor.nama_Labor : null,
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




