import { where } from "sequelize";
import PesertaWawancara from "../models/Model_Recruitment/PesertaWawancara.js";
import Recruitment from "../models/Model_Recruitment/Recruitment.js"
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Wawancara from "../models/Model_Recruitment/Wawancara.js";
import User from "../models/Model_User/Users.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import NilaiWawancara from "../models/Model_Recruitment/NilaiWawancara.js"
export const GetWawancaraByIdLabor = async (req, res) => {
    const { idLabor } = req.params;
    try {
        // Mengambil semua recruitment berdasarkan idLabor
        const recruitments = await Recruitment.findAll({ where: { idLabor } });

        // Memproses setiap recruitment detail
        const payload = await Promise.all(recruitments.map(async (recruitment) => {
            // Mengambil semua tahapan wawancara berdasarkan idRecruitment dan jenis_tahapan
            const tahapanList = await Tahapan.findAll({ where: { idRecruitment: recruitment.id, jenis_tahapan: "Wawancara" } });
            // Mengambil semua wawancara berdasarkan idTahapan
            const wawancaraDetails = await Promise.all(tahapanList.map(async (tahapan) => {
                const wawancaras = await Wawancara.findAll({ where: { idTahapan: tahapan.id } });
                return wawancaras.map(wawancara => ({
                    ...wawancara.toJSON(),
                }));
            }));

            // Menggabungkan semua wawancara menjadi satu array
            const wawancaraFlat = wawancaraDetails.flat();

            return {
                // ...recruitment.toJSON(), kalau ingin menampilkan semua data
                // idLabor: recruitment.idLabor,
                nama_recruitment: recruitment.nama_recruitment,
                wawancara: wawancaraFlat
            };
        }));

        // Mengembalikan payload ke client
        res.status(200).json({ code: 200, status: "success", data: payload });
    } catch (error) {
        console.error("Error saat proses mengambil wawancara:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil wawancara." });
    }
};

export const GetWawancaraById = async (req, res) => {
    const { id } = req.params;
    try {
        const wawancara = await Wawancara.findOne({ where: { id } });
        const payload = {
            nama_wawancara: wawancara.nama_wawancara,
            metode_wawancara: wawancara.metode_wawancara,
        }
        return res.status(200).json({ code: 200, status: "success", message: "Wawancara Ditemukan", data: payload });
    } catch (error) {
        console.error("Error saat proses mengambil wawancara:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil wawancara." });
    }
};

export const GetPesertaWawancara = async (req, res) => {
    const { idWawancara } = req.params;
    try {
        // Find all peserta wawancara by idWawancara
        const peserta = await PesertaWawancara.findAll({ where: { idWawancara: idWawancara } });

        // If no peserta wawancara found, return a message indicating the list is empty
        if (peserta.length === 0) {
            return res.status(200).json({ code: 200, status: "success", message: "Peserta wawancara kosong", data: [] });
        }

        // Process each peserta wawancara
        const payload = await Promise.all(peserta.map(async (pesertas) => {
            // Find the pendaftar by idPendaftar
            const pendaftar = await Pendaftar.findOne({ where: { id: pesertas.idPendaftar } });

            // If pendaftar is found, find the user by idUsers
            if (pendaftar) {
                const user = await User.findOne({ where: { id: pendaftar.idUsers } });

                // If user is found, return the user's details
                if (user) {
                    return {
                        ...pesertas.toJSON(),
                        nama: user.nama,
                    };
                }
            }
            return null;
        }));

        // Filter out any null values in the payload
        const filteredPayload = payload.filter(item => item !== null);

        res.status(200).json({ code: 200, status: "success", message: "Peserta Wawancara Ditemukan", data: filteredPayload });

    } catch (error) {
        console.error("Error saat proses mengambil peserta wawancara:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil peserta wawancara." });
    }
};

export const CreatePesertaWawancara = async (req, res) => {
    const { idWawancara, idPendaftar, lokasi, jadwal_mulai, jadwal_selesai } = req.body;
    try {
        const pendaftar = await PesertaWawancara.findOne({ where: { idPendaftar } });
        if (pendaftar) {
            return res.status(404).json({ code: 404, status: "Found", message: "Pendaftar Sudah Terdaftar pada Peserta Wawancara" });
        }

        const mulai = new Date(jadwal_mulai);
        const selesai = new Date(jadwal_selesai);
        const tanggalSekarang = new Date();

        if (tanggalSekarang > mulai) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Mulai Invalid" });
        }
        if (selesai <= mulai) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Selesai Invalid" });
        }
        await PesertaWawancara.create({
            idWawancara,
            idPendaftar,
            lokasi,
            jadwal_mulai,
            jadwal_selesai,
        })
        res.status(201).json({ code: 201, status: "success", message: "Peserta Wawancara Berhasil ditambahkan" });

    } catch (error) {
        console.error("Error saat proses mendaftarkan peserta wawancara:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mendaftarkan peserta wawancara." });
    }
};

export const GetPendaftarByIDWawancara = async (req, res) => {
    const { idWawancara } = req.params;
    try {
        // Cari wawancara berdasarkan idWawancara
        const wawancara = await Wawancara.findOne({ where: { id: idWawancara } });

        if (!wawancara) {
            return res.status(404).json({ code: 404, status: "error", message: "Wawancara tidak ditemukan" });
        }
        console.log("Tahapan: ", wawancara)

        // Cari tahapan berdasarkan idTahapan dari wawancara
        const tahapan = await Tahapan.findOne({ where: { id: wawancara.idTahapan } });

        if (!tahapan) {
            return res.status(404).json({ code: 404, status: "error", message: "Tahapan tidak ditemukan" });
        }
        console.log("Tahapan: ", wawancara)

        // Cari pendaftar berdasarkan idRecruitment dari tahapan
        const pendaftarList = await Pendaftar.findAll({ where: { idRecruitment: tahapan.idRecruitment } });

        console.log("Tahapan: ", pendaftarList)

        if (pendaftarList.length === 0) {
            return res.status(200).json({ code: 200, status: "success", message: "Tidak ada pendaftar", data: [] });
        }
        // Ambil detail user berdasarkan idUsers dari pendaftar
        const payload = await Promise.all(pendaftarList.map(async (pendaftar) => {
            const user = await User.findOne({ where: { id: pendaftar.idUsers, status: 'Tahapan1' } });

            if (user) {
                return {
                    id: pendaftar.id,
                    nama: user.nama,
                };
            }
            return null;
        }));

        // Filter payload untuk menghapus nilai null
        const filteredPayload = payload.filter(item => item !== null);

        res.status(200).json({ code: 200, status: "success", message: "Pendaftar ditemukan", data: filteredPayload });

    } catch (error) {
        console.error("Error saat proses mengambil pendaftar:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil pendaftar." });
    }
};

export const GetJadwalWawancara = async (req, res) => {
    const { idWawancara, lokasi } = req.body
    try {
        const jadwal = await PesertaWawancara.findAll({
            where: { idWawancara, lokasi },
            order: [['jadwal_mulai', 'DESC']],
            limit: 1
        });

        const payloadJadwal = jadwal.map(jadwals => ({
            jadwal_mulai: new Date(jadwals.jadwal_mulai).toLocaleString(),
            jadwal_selesai: new Date(jadwals.jadwal_selesai).toLocaleString(),
        }));

        return res.status(200).json({ code: 200, status: "success", message: "Jadwal ditemukan", data: payloadJadwal })
    } catch (error) {
        console.error("Error saat proses mengambil jadwal:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil jadwal." });
    }
}

export const GetPesertaByID = async (req, res) => {
    const { id } = req.params;
    try {
        const peserta = await PesertaWawancara.findOne({ where: { id } });

        const pendaftar = await Pendaftar.findOne({ where: { id: peserta.idPendaftar } });

        const DetailUser = await User.findOne({ where: { id: pendaftar.idUsers } });

        const jadwalmulai = new Date(peserta.jadwal_mulai).toLocaleString();
        const jadwalselesai = new Date(peserta.jadwal_selesai).toLocaleString();

        const payload = {
            nama: DetailUser.nama,
            lokasi: peserta.lokasi,
            jadwal_mulai: jadwalmulai,
            jadwal_selesai: jadwalselesai,
        }
        return res.status(200).json({ code: 200, status: "success", message: "Peserta Ditemukan", data: payload })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Peserta Wawancara" })
    }
};

export const EditPesertaWawancara = async (req, res) => {
    const { id, jadwal_mulai, jadwal_selesai, lokasi } = req.body;
    try {

        const pesertaWawancara = await PesertaWawancara.findOne({ where: { id } });

        const mulai = new Date(jadwal_mulai);
        const selesai = new Date(jadwal_selesai);

        if (selesai <= mulai) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Selesai Invalid" });
        }

        const existingJadwal = await PesertaWawancara.findAll({
            where: { idWawancara: pesertaWawancara.idWawancara, lokasi: pesertaWawancara.lokasi },
            order: [['jadwal_mulai', 'DESC']],
        });

        // Array to store conflicting time slots
        const conflictingSlots = [];

        // Check if new start time falls within existing schedule
        existingJadwal.forEach(jadwal => {
            const existingStart = new Date(jadwal.jadwal_mulai);
            const existingEnd = new Date(jadwal.jadwal_selesai);

            if ((mulai >= existingStart && mulai <= existingEnd) || (selesai >= existingStart && selesai <= existingEnd)) {
                conflictingSlots.push({
                    start: existingStart.toLocaleString(),
                    end: existingEnd.toLocaleString()
                });
            }
        });

        if (conflictingSlots.length > 0) {
            const conflictingMessage = conflictingSlots.map(slot => `${slot.start} - ${slot.end}`).join(", ");
            return res.status(400).json({ code: 400, status: "error", message: `Jadwal bentrok dengan jadwal yang sudah ada: ${conflictingMessage}` });
        }

        pesertaWawancara.lokasi = lokasi;
        pesertaWawancara.jadwal_mulai = jadwal_mulai;
        pesertaWawancara.jadwal_selesai = jadwal_selesai;

        await pesertaWawancara.save();

        return res.status(200).json({ code: 200, status: "success", message: "Peserta Wawancara Berhasil Diperbarui" });

    } catch (error) {
        console.error("Error saat proses update tahapan:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses memperbarui Peserta Wawancara." });
    }
};



export const DeletePesertaWawancara = async (req, res) => {
    const { id } = req.params;
    try {
        const peserta = await PesertaWawancara.findOne({ where: { id } });
        await peserta.destroy();
        return res.status(200).json({ status: "success", code: 200, message: "Peserta Wawancara Berhasil Dihapus" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Menghapus Peserta Wawancara" })
    }
};

export const GetNilaiPewawancara = async (req, res) => {
    const { id } = req.params
    try {
        const nilai_wawancara = await NilaiWawancara.findAll({ where: { idPesertaWawancara: id } });
        const payload = [];
        for (const nilai_wawancaras of nilai_wawancara) {
            const payloads = nilai_wawancaras.toJSON();
            payload.push(payloads);
        }
        return res.status(200).json({ code: 200, status: "success", message: "Nilai Peserta Wawancara Ditemukan", data: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Nilai Peserta Wawancara" })
    }
};






