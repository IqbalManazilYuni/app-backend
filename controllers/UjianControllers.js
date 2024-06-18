import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Ujian from "../models/Model_Recruitment/Ujian.js";
import PesertaUjian from "../models/Model_Recruitment/PesertaUjian.js"
import User from "../models/Model_User/Users.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";

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
export const GetpesertaUjianByid = async(req, res) =>{
    const { id } = req.params
    try {
        const PesertaUjianGet = await PesertaUjian.findOne({ where:{id}});
        return res.status(200).json({ code: 200, status:"success", data:PesertaUjianGet})
    } catch (error) {
        console.error("Error saat proses mengambil ujian:", error);
        res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat proses mengambil ujian." });
    }
}

export const UpdatePenganggungJawab = async(req, res) =>{
    const { id, idUsers } = req.body
    try {
        const PesertaUjianGet = await PesertaUjian.findOne({ where:{id}});
        PesertaUjianGet.idUsers = idUsers
        await PesertaUjianGet.save();
        return res.status(200).json({ code: 200, status:"success", message:"Penanggung Jawab Berhasil Diperbarui"})
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
    const { idPendaftar, idUjian, nilaiUjian,idUsers } = req.body;
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
            attributes: ['id', 'nama_recruitment'] // Selecting specific attributes
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
                    attributes: ['id','nama_ujian', 'jadwal_mulai', 'jadwal_selesai', 'status', 'kode_ujian']
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

// export const GetPesertaUjianByIDUjian = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const idPesertaUjian = await PesertaUjian.findAll()
//     } catch (error) {
        
//     }
// }
