import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Ujian from "../models/Model_Recruitment/Ujian.js";
import PesertaUjian from "../models/Model_Recruitment/PesertaUjian.js"
import User from "../models/Model_User/Users.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";
import SoalUjian from "../models/Model_Recruitment/SoalUjian.js"
import SoalMultiple from "../models/Model_Soal/SoalMultple.js"
import SoalEssay from "../models/Model_Soal/SoalEssay.js"
import JawabanUjian from "../models/Model_Recruitment/JawabanUjian.js"
export const GetListUjianByIDLabor = async (req, res) => {
    const { idLabor } = req.params
    try {
        // Mengambil semua recruitment berdasarkan idLabor
        const recruitments = await Recruitment.findAll({ where: { idLabor } });

        // Memproses setiap recruitment detail
        const payload = await Promise.all(recruitments.map(async (recruitment) => {
            // Mengambil semua tahapan ujian berdasarkan idRecruitment dan jenis_tahapan
            const tahapanList = await Tahapan.findAll({ where: { idRecruitment: recruitment.id, jenis_tahapan: "Ujian" } });
            // Mengambil semua ujian berdasarkan idTahapan
            const ujianDetails = await Promise.all(tahapanList.map(async (tahapan) => {
                const ujians = await Ujian.findAll({ where: { idTahapan: tahapan.id } });
                return ujians.map(ujian => ({
                    ...ujian.toJSON(),
                    jadwal_mulai: new Date(ujian.jadwal_mulai).toLocaleString(),
                    jadwal_selesai: new Date(ujian.jadwal_selesai).toLocaleString()
                }));
            }));

            // Menggabungkan semua ujian menjadi satu array
            const ujianFlat = ujianDetails.flat();

            return {
                // ...recruitment.toJSON(), kalau ingin menampilkan semua data
                // idLabor: recruitment.idLabor,
                nama_recruitment: recruitment.nama_recruitment,
                ujian: ujianFlat
            };
        }));

        // Mengembalikan payload ke client
        res.status(200).json({ code: 200, status: "success", data: payload });
    } catch (error) {
        console.error("Error saat proses mengambil ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil ujian." });
    }
};

export const GetUjianByID = async (req, res) => {
    const { id } = req.params
    try {
        const ujian = await Ujian.findOne({ where: { id } });
        const payload = {
            ...ujian.toJSON(),
            jadwal_mulai: new Date(ujian.jadwal_mulai).toLocaleString(),
            jadwal_selesai: new Date(ujian.jadwal_selesai).toLocaleString(),
        }
        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        console.error("Error saat proses mengambil ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil ujian." });
    }
};

export const GetPesertaUjianByID = async (req, res) => {
    const { id } = req.params
    try {
        const pesertaujian = await PesertaUjian.findAll({ where: { idUjian: id } });
        const payload = []
        for (const pesertaujians of pesertaujian) {
            const pendaftar = await Pendaftar.findByPk(pesertaujians.idPendaftar);
            const user = await User.findByPk(pendaftar.idUsers);
            const userAsisten = await User.findByPk(pesertaujians.idUsers)
            const namaUjian = await Ujian.findByPk(pesertaujians.idUjian)
            const payloads = await pesertaujians.toJSON();
            payloads.nama = user.nama;
            payloads.nama_penanggung_jawab = userAsisten.nama;
            // payloads.nama_ujian = namaUjian.nama_ujian,
            // payloads.kode_ujian = namaUjian.kode_ujian,
            payload.push(payloads)
        }
        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        console.error("Error saat proses mengambil ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil ujian." });
    }
};
export const GetpesertaUjianByid = async (req, res) => {
    const { id } = req.params
    try {
        const PesertaUjianGet = await PesertaUjian.findOne({ where: { id } });
        return res.status(200).json({ code: 200, status: "success", data: PesertaUjianGet })
    } catch (error) {
        console.error("Error saat proses mengambil ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil ujian." });
    }
}

export const UpdatePenganggungJawab = async (req, res) => {
    const { id, idUsers } = req.body
    try {
        const PesertaUjianGet = await PesertaUjian.findOne({ where: { id } });
        PesertaUjianGet.idUsers = idUsers
        await PesertaUjianGet.save();
        return res.status(200).json({ code: 200, status: "success", message: "Penanggung Jawab Berhasil Diperbarui" })
    } catch (error) {
        console.error("Error saat proses memperbarui Penanggung Jawab:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses memperbarui Penanggung Jawab." });
    }
}

export const GetPesertaUjianByIdTahapan = async (req, res) => {
    const { idTahapan } = req.params;
    try {
        const tahapan = await Tahapan.findOne({ where: { id: idTahapan } });
        const pendaftar = await Pendaftar.findAll({ where: { idRecruitment: tahapan.idRecruitment } });

        const payload = [];

        for (const pendaftars of pendaftar) {
            const user = await User.findByPk(pendaftars.idUsers);
            const payloads = pendaftars.toJSON();
            const data = {
                nama: user.nama,
                idPendaftar: pendaftars.id,
            }
            payload.push(data);
        }
        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        console.error("Error saat proses mengambil peserta ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil peserta ujian." });
    }
};

export const CreatePesertaUjian = async (req, res) => {
    const { idPendaftar, idUjian, nilaiUjian, idUsers } = req.body;
    try {
        for (const pesertaId of idPendaftar) {
            const existingRecord = await PesertaUjian.findOne({
                where: {
                    idPendaftar: pesertaId
                }
            });
            if (existingRecord) {
                return res.status(400).json({ message: "Sudah Terdapat Peserta Ujian yang sama sudah anda inputkan" });
            }
        }
        for (const pesertaId of idPendaftar) {
            await PesertaUjian.create({
                idPendaftar: pesertaId,
                idUjian,
                nilaiUjian,
                idUsers
            });
        }
        return res.status(201).json({ code: 201, status: "success", message: 'Peserta Ujian created successfully' });
    } catch (error) {
        console.error("Error creating peserta ujian", error.message);
        return res.status(500).json({ code: 500, status: "error", message: 'Internal server error' });
    }
};

export const DeletePesertaUjian = async (req, res) => {
    const { id } = req.params;
    try {
        const Pesertaujian = await PesertaUjian.findOne({ where: { id } });
        await Pesertaujian.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Berhasil Menghapus Peserta Ujian" })
    } catch (error) {
        console.error("Error menghapus peserta ujian", error.message);
        return res.status(500).json({ code: 500, status: "error", message: 'Internal server error' });
    }
};

export const GetJadwalUjian = async (req, res) => {
    const { idLabor } = req.params;
    try {
        const recruitmentList = await Recruitment.findAll({
            where: { idLabor },
            attributes: ['id', 'nama_recruitment']
        });

        const tahapanListPromises = recruitmentList.map(async (recruitment) => {
            const tahapan = await Tahapan.findAll({
                where: {
                    idRecruitment: recruitment.id,
                    jenis_tahapan: "Ujian"
                }
            });

            const ujianInfoPromises = tahapan.map(async (tahapanItem) => {
                const ujian = await Ujian.findOne({
                    where: { idTahapan: tahapanItem.id },
                    attributes: ['id', 'nama_ujian', 'jadwal_mulai', 'jadwal_selesai', 'status', 'kode_ujian']
                });
                return ujian;
            });

            const ujianInfo = await Promise.all(ujianInfoPromises);

            return {
                idRecruitment: recruitment.id,
                nama_recruitment: recruitment.nama_recruitment,
                ujianInfo: ujianInfo
            };
        });

        const fullData = await Promise.all(tahapanListPromises);

        return res.status(200).json({ code: 200, status: "success", data: fullData });
    } catch (error) {
        console.error("Error mengambil jadwal ujian", error.message);
        return res.status(500).json({ code: 500, status: "error", message: 'Internal server error' });
    }
}

export const GetUjianTimeByNIM = async (req, res) => {
    const { nim } = req.params;
    try {
        const userbynim = await User.findOne({ where: { nim } });
        if (!userbynim) {
            return res.status(404).json({ code: 404, status: "error", message: "User tidak ditemukan" });
        }

        const pendaftarList = await Pendaftar.findAll({ where: { idUsers: userbynim.id } });
        const ujianPromises = pendaftarList.map(async (pendaftar) => {
            const pesertaUjianList = await PesertaUjian.findAll({ where: { idPendaftar: pendaftar.id } });
            const tahapanPromises = pesertaUjianList.map(async (pesertaUjian) => {
                const ujian = await Ujian.findOne({ where: { id: pesertaUjian.idUjian } });
                if (ujian) {
                    const tahapan = await Tahapan.findOne({ where: { id: ujian.idTahapan } });
                    if (tahapan) {
                        const recruitment = await Recruitment.findOne({ where: { id: tahapan.idRecruitment } });
                        return {
                            idUjian: ujian.id,
                            nama_ujian: ujian.nama_ujian,
                            jadwal_mulai: ujian.jadwal_mulai,
                            jadwal_selesai: ujian.jadwal_selesai,
                            kode_ujian: ujian.kode_ujian,
                            status: ujian.status,
                            idTahapan: tahapan.id,
                            idRecruitment: tahapan.idRecruitment,
                            nama_recruitment: recruitment ? recruitment.nama_recruitment : null,
                            idPesertaUjian: pesertaUjian.id
                        };
                    }
                }
            });
            return Promise.all(tahapanPromises);
        });

        const ujianData = (await Promise.all(ujianPromises)).flat().filter(item => item !== undefined);

        return res.status(200).json({ code: 200, status: "success", data: ujianData });
    } catch (error) {
        console.error("Terjadi Kesalahan saat Mengambil Jadwal Wawancara", error.message);
        return res.status(500).json({ code: 500, status: "error", message: 'Terjadi Kesalahan Pada Server' });
    }
};


export const UpdateStatusUjianRecruitment = async (req, res) => {
    const { date } = req.body;
    try {
        const ujianList = await Ujian.findAll();
        const jadwal = new Date(date);

        const updatePromises = ujianList.map(async (ujian) => {
            const jadwalbuka = new Date(ujian.jadwal_mulai);
            const jadwaltutup = new Date(ujian.jadwal_selesai);
            let status = ujian.status;

            if (jadwalbuka < jadwal && jadwal < jadwaltutup) {
                status = "Open";
            } else if (jadwal > jadwaltutup || jadwal < jadwalbuka) {
                status = "Close";
            }
            if (status !== ujian.status) {
                await Ujian.update({ status }, { where: { id: ujian.id } });
            }
            return {
                ...ujian.toJSON(),
                jadwaltutup,
                status
            };
        });
        await Promise.all(updatePromises);
        return res.status(200).json({ code: 200, status: "success", message: "Recruitment telah diperbarui" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Recruitment" });
    }
};

export const GetSoalUjianByIdUjian = async (req, res) => {
    const { idTahapan } = req.params
    try {
        const ujianId = await Ujian.findOne({ where: { idTahapan } })
        const idSoals = await SoalUjian.findAll({ where: { idUjian: ujianId.id } });
        const payload = [];
        for (const bankSoal of idSoals) {
            const bankSoalId = await BankSoal.findOne({ where: { id: bankSoal.idSoal } });
            let soal = null;
            let pilihan1 = null;
            let pilihan2 = null;
            let pilihan3 = null;
            let pilihan4 = null;
            let kunci = null;
            if (bankSoalId.tipe_soal === "Essay") {
                const soalEssay = await SoalEssay.findOne({ where: { idBankSoal: bankSoalId.id } })
                soal = soalEssay ? soalEssay.soal : null
            }
            else if (bankSoalId.tipe_soal === "Multiple") {
                const soalMultiple = await SoalMultiple.findOne({ where: { idBankSoal: bankSoalId.id } })
                soal = soalMultiple ? soalMultiple.soal : null;
                pilihan1 = soalMultiple ? soalMultiple.pilihan1 : null;
                pilihan2 = soalMultiple ? soalMultiple.pilihan2 : null;
                pilihan3 = soalMultiple ? soalMultiple.pilihan3 : null;
                pilihan4 = soalMultiple ? soalMultiple.pilihan4 : null;
                kunci = soalMultiple ? soalMultiple.kunci : null;
            }
            const banksoalData = {
                id: bankSoal.id,
                tipe_soal: bankSoalId.tipe_soal,
                tahun: bankSoal.tahun,
                soal: soal
            };
            if (bankSoalId.tipe_soal === "Multiple") {
                banksoalData.pilihan1 = pilihan1;
                banksoalData.pilihan2 = pilihan2;
                banksoalData.pilihan3 = pilihan3;
                banksoalData.pilihan4 = pilihan4;
                banksoalData.kunci = kunci;
            }
            payload.push(banksoalData)
        }
        return res.status(200).json({ code: 200, status: "success", data: payload })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Soal" });
    }
};

export const CekKodeUjian = async (req, res) => {
    const { kode_ujian, idUjian, date } = req.body;
    try {
        const getUjian = await Ujian.findOne({ where: { id: idUjian } });
        const tanggalSekarang = new Date(date)
        if (getUjian.status === "Close") {
            if (tanggalSekarang > getUjian.jadwal_selesai) {
                return res.status(400).json({ status: "Error", code: 400, message: "Pengerjaan Ujian Sudah tutup" })
            }
            else if (tanggalSekarang < getUjian.jadwal_mulai) {
                return res.status(400).json({ status: "Error", code: 400, message: "Pengerjaan Ujian belum buka" })
            }
        }
        if (getUjian.kode_ujian !== kode_ujian) {
            return res.status(400).json({ status: "Error", code: 400, message: "Kode Ujian Tidak Benar" })
        }
        if ((getUjian.status === "Open") && (getUjian.kode_ujian === kode_ujian))
            return res.status(200).json({ status: "success", code: 200 })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Pengecekan Kode Ujian" });
    }
}

export const CreateJawabanUjian = async (req, res) => {
    const jawabanUser = req.body;
    try {
        const idPesertaUjians = jawabanUser[0]?.idPesertaUjian;
        const pesertaUjian = await PesertaUjian.findOne({ where: { id: idPesertaUjians } });
        const soalUjian = await SoalUjian.findAll({ where: { idUjian: pesertaUjian.idUjian } });
        let kunciMultipleSoal = [];
        for (const soal of soalUjian) {
            const bankSoal = await BankSoal.findOne({ where: { id: soal.idSoal } });
            if (!bankSoal) {
                continue;
            }
            if (bankSoal.tipe_soal === "Multiple") {
                const soalMultiple = await SoalMultiple.findOne({ where: { idBankSoal: bankSoal.id } });
                kunciMultipleSoal.push({ idSoal: soal.id, kunci: soalMultiple.kunci });
            }
        }
        let totalScore = 0;
        for (const jawaban of jawabanUser) {
            if (jawaban.tipe_soal === "Multiple") {
                const kunci = kunciMultipleSoal.find(k => k.idSoal === jawaban.id);
                if (kunci && kunci.kunci === jawaban.jawaban) {
                    totalScore += 10;
                }
            }
        }
        for (const jawaban of jawabanUser) {
            await JawabanUjian.create({
                idPesertaUjian: jawaban.idPesertaUjian,
                idSoalUjian: jawaban.id,
                Jawaban: jawaban.jawaban,
                nilai: jawaban.tipe_soal === "Multiple" && kunciMultipleSoal.find(k => k.idSoal === jawaban.id)?.kunci === jawaban.jawaban ? 10 : 0
            });
        }
        return res.status(201).json({ status: 'success', code: 201, message: "Anda Telah Menyelesaikan Ujian" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Membaut Jawaban Ujian" });
    }
}