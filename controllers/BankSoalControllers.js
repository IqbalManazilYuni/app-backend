import Labor from "../models/Model_Kepengurusan/Labor.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";
import SoalEssay from "../models/Model_Soal/SoalEssay.js";
import SoalMultiple from "../models/Model_Soal/SoalMultple.js";
import SoalUjian from "../models/Model_Recruitment/SoalUjian.js"
import JawabanUjian from "../models/Model_Recruitment/JawabanUjian.js"

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
export const CreateSoalUjianImport = async (req, res) => {
    const soalArray = req.body;

    if (!Array.isArray(soalArray) || soalArray.length === 0) {
        return res.status(400).json({ code: 400, status: "error", message: "Data yang akan diinputkan kosong" });
    }

    const validTipeSoal = ["Essay", "Multiple"];
    const errors = [];
    const successfullyProcessed = [];

    try {
        for (const item of soalArray) {
            const { idLabor, tipe_soal, tahun, soal } = item;

            // Validate tipe_soal
            if (!validTipeSoal.includes(tipe_soal)) {
                errors.push({ item, error: `Invalid tipe_soal: ${tipe_soal}` });
                continue;  // Skip to the next item
            }

            if (tipe_soal === "Essay") {
                const banksoal = await BankSoal.create({
                    idLabor,
                    tipe_soal,
                    tahun
                });
                await SoalEssay.create({
                    idBankSoal: banksoal.id,
                    soal: soal,
                });
            } else if (tipe_soal === "Multiple") {
                const { pilihan1, pilihan2, pilihan3, pilihan4, kunci } = item;
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
            }

            successfullyProcessed.push(item);
        }

        // Prepare the response
        const response = {
            code: 201,
            status: "success",
            message: "Berhasil Menambahkan Soal",
        };

        if (errors.length > 0) {
            response.invalidItems = errors;
            response.message = "Ada beberapa soal yang tidak diinputkan dalam database karena tipe soal tidak tersedia";
        }

        return res.status(201).json(response);
    } catch (error) {
        console.error("Error saat proses Menambahkan Soal: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Menambahkan Soal." });
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

export const DeleteSoal = async (req, res) => {
    const { id } = req.params
    try {
        const Banksoal = await BankSoal.findOne({ where: { id } });
        await Banksoal.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Data Berhasil Dihapus" })
    } catch (error) {
        console.error("Error saat proses Menghapus Soal: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Menghapus Soal" });
    }
}

export const GetSoalById = async (req, res) => {
    const { id } = req.params
    try {
        const Banksoal = await BankSoal.findOne({ where: { id } });
        let soal = null;
        let pilihan1 = null;
        let pilihan2 = null;
        let pilihan3 = null;
        let pilihan4 = null;
        let kunci = null;
        let payload = null

        if (Banksoal.tipe_soal === "Essay") {
            const soalEssay = await SoalEssay.findOne({ where: { idBankSoal: Banksoal.id } });
            soal = soalEssay ? soalEssay.soal : null;
            payload = {
                ...Banksoal.toJSON(),
                soal,
            }
        } else if (Banksoal.tipe_soal === "Multiple") {
            const soalMultiple = await SoalMultiple.findOne({ where: { idBankSoal: Banksoal.id } });
            if (soalMultiple) {
                soal = soalMultiple.soal;
                pilihan1 = soalMultiple.pilihan1;
                pilihan2 = soalMultiple.pilihan2;
                pilihan3 = soalMultiple.pilihan3;
                pilihan4 = soalMultiple.pilihan4;
                kunci = soalMultiple.kunci;
                payload = {
                    ...Banksoal.toJSON(),
                    soal,
                    pilihan1,
                    pilihan2,
                    pilihan3,
                    pilihan4,
                    kunci,
                }
            }
        }

        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        console.error("Error saat proses Mengambil Soal: ", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Mengambil Soal" });
    } F
}

export const EditSoal = async (req, res) => {
    const { id, idLabor, tipe_soal, tahun, pilihan1, pilihan2, pilihan3, pilihan4, kunci, soal } = req.body;
    const banksoal = await BankSoal.findOne({ where: { id } });
    if (banksoal.tipe_soal === tipe_soal) {
        banksoal.idLabor = idLabor;
        banksoal.tipe_soal = tipe_soal;
        banksoal.tahun = tahun;
        await banksoal.save();
        if (tipe_soal === "Essay") {
            try {
                const soalessay = await SoalEssay.findOne({ where: { idBankSoal: id } });
                soalessay.soal = soal;
                await soalessay.save();
                return res.status(200).json({ code: 200, status: "success", message: "Berhasil Memperbarui Soal Essay" });

            } catch (error) {
                console.error("Error saat proses Memperbarui Soal Essay: ", error);
                return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Memperbarui Soal Essay." });
            }
        } else if (tipe_soal === "Multiple") {
            try {
                const soalmulti = await SoalMultiple.findOne({ where: { idBankSoal: id } });
                if (soalmulti.kunci !== kunci) {
                    const soalUjian = await SoalUjian.findAll({ where: { idSoal: soalmulti.idBankSoal } });
                    for (const soal of soalUjian) {
                        const jawabanUjian = await JawabanUjian.findAll({ where: { idSoalUjian: soal.id } });
                        for (const jawaban of jawabanUjian) {
                            const nilai = jawaban.Jawaban === kunci ? 10 : 0;
                            await JawabanUjian.update({ nilai: nilai }, { where: { id: jawaban.id } });
                        }
                    }
                }
                soalmulti.soal = soal;
                soalmulti.pilihan1 = pilihan1;
                soalmulti.pilihan2 = pilihan2;
                soalmulti.pilihan3 = pilihan3;
                soalmulti.pilihan4 = pilihan4;
                soalmulti.kunci = kunci;
                await soalmulti.save();
                return res.status(200).json({ code: 200, status: "success", message: "Berhasil Memperbarui Soal Multiple" });

            } catch (error) {
                console.error("Error saat proses Menambahkan Soal Multiple: ", error);
                return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Memperbarui Soal Multiple." });
            }
        }
    } else if (banksoal.tipe_soal !== tipe_soal) {
        banksoal.idLabor = idLabor;
        banksoal.tipe_soal = tipe_soal;
        banksoal.tahun = tahun;
        await banksoal.save();
        if (tipe_soal === "Essay") {
            try {
                const destroyMultiple = await SoalMultiple.findOne({ where: { idBankSoal: id } });
                await destroyMultiple.destroy();
                await SoalEssay.create({
                    idBankSoal: banksoal.id,
                    soal: soal,
                });
                return res.status(200).json({ code: 200, status: "success", message: "Berhasil Memperbarui Soal Essay" });
            } catch (error) {
                console.error("Error saat proses Menambahkan Soal Essay: ", error);
                return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Memperbarui Soal Essay." });
            }
        }
        else if (tipe_soal === "Multiple") {
            try {
                const destroyEssay = await SoalEssay.findOne({ where: { idBankSoal: id } });
                await destroyEssay.destroy();
                await SoalMultiple.create({
                    idBankSoal: banksoal.id,
                    soal: soal,
                    pilihan1,
                    pilihan2,
                    pilihan3,
                    pilihan4,
                    kunci
                });
                return res.status(200).json({ code: 200, status: "success", message: "Berhasil Memperbarui Soal Essay" });

            } catch (error) {
                console.error("Error saat proses Menambahkan Soal Multiple: ", error);
                return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses Memperbarui Soal Multiple." });

            }
        }
    }

};
