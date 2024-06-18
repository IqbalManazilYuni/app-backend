import Labor from "../models/Model_Kepengurusan/Labor.js";
import Kegiatan from "../models/Model_Recruitment/Kegiatan.js";
import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js"

export const CreateRecruitment = async (req, res) => {
    const { idLabor, limit_peserta, idKegiatan, nama_recruitment, tanggal_buka, tanggal_tutup } = req.body;
    try {
        const labor = await Recruitment.findOne({ where: { idLabor, idKegiatan } });
        if (labor) {
            return res.status(404).json({ code: 404, status: "Found", message: "Labor Sudah Terdaftar Pada Kegiatan Recruitment Tahun ini" })
        }
        const tanggalbuka = new Date(tanggal_buka);
        const tanggaltutup = new Date(tanggal_tutup);
        const tanggalSekarang = new Date();

        if (tanggaltutup <= tanggalbuka) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Tutup Invalid karena mendahului tanggal buka" });
        }
        if (tanggalbuka < tanggalSekarang) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Buka Invalid karena mendahului tanggal sekarang" });
        }
        const newProses = await Recruitment.create({
            idLabor,
            idKegiatan,
            limit_peserta,
            tanggal_buka,
            tanggal_tutup,
            nama_recruitment
        })
        return res.status(201).json({ code: 201, status: "success", message: "Recruitment Or berhasil didaftarkan.", data: newProses });
    } catch (error) {
        console.error("Error saat mendaftarkan Recruitment Or:", error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi kesalahan saat mendaftarkan Recruitment Or." });
    }
};

export const GetRecruitmentByLabor = async (req, res) => {
    const { idLabor } = req.params;
    try {
        const proses = await Recruitment.findAll({ where: { idLabor: idLabor } });
        const payload = await Promise.all(proses.map(async recruitment => {
            const kegiatan = await Kegiatan.findByPk(recruitment.idKegiatan);
            const jumlahPendaftar = await Pendaftar.count({ where: { idRecruitment: recruitment.id } }); // Count based on recruitment ID
            const labor = await Labor.findByPk(recruitment.idLabor);
            return {
                ...recruitment.toJSON(),
                nama_kegiatan: kegiatan ? kegiatan.nama_kegiatan : null,
                tahun: kegiatan ? kegiatan.tahun : null,
                nama_Labor: labor ? labor.nama_Labor : null,
                jumlahPendaftar,
            };
        }));
        console.log(payload)
        return res.status(200).json({ status: "success", code: 200, message: "Labor Recruitment Found", data: payload });
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Pada Mengambil Labor Recruitment", error });
    }
}

export const GetRecruitment = async (req, res) => {
    const { idKegiatan } = req.params;
    try {
        const proses = await Recruitment.findAll({ where: { idKegiatan: idKegiatan } });
        if (!proses) {
            return res.status(404).json({ status: "Not Found", code: 404, message: "Recruitment Labor Not Found" });
        }
        const payload = await Promise.all(proses.map(async recruitment => {
            const kegiatan = await Kegiatan.findByPk(recruitment.idKegiatan);
            const labor = await Labor.findByPk(recruitment.idLabor);

            return {
                ...recruitment.toJSON(),
                nama_kegiatan: kegiatan ? kegiatan.nama_kegiatan : null,
                nama_Labor: labor ? labor.nama_Labor : null,
            };
        }));

        return res.status(200).json({ status: "success", code: 200, message: "Labor Recruitment Or Found", data: payload });
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Pada Menggambil Labor Recruitment Or", error });
    }
};

export const DeleteRecruitment = async (req, res) => {
    const { id } = req.params;
    try {
        const recruitment = await Recruitment.findOne({ where: { id } });
        await recruitment.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Recruitment Berhasil Dihapus" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Menghapus Recruitment" })
    }
};

export const GetRecruitmentByID = async (req, res) => {
    const { id } = req.params;
    try {
        const recruitment = await Recruitment.findOne({ where: { id } });
        if (!recruitment) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Recruitment Tidak Ditemukan" });
        }
        const tanggalbuka = new Date(recruitment.tanggal_buka).toLocaleString();
        const tanggaltutup = new Date(recruitment.tanggal_tutup).toLocaleString();
        const payload = {
            nama_recruitment: recruitment.nama_recruitment,
            status: recruitment.status,
            limit_peserta: recruitment.limit_peserta,
            tanggal_buka: tanggalbuka,
            tanggal_tutup: tanggaltutup,
        }
        return res.status(200).json({ status: "success", code: 200, message: "Recruitment Ditemukan", data: payload });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Mengambil Recruitment" })
    }
};

export const EditRecruitment = async (req, res) => {
    const { id, status, limit_peserta, tanggal_buka, tanggal_tutup } = req.body;
    try {
        const recruitment = await Recruitment.findOne({ where: { id } });
        if (!recruitment) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Recruitment Tidak Ditemukan" });
        }
        const tanggalbuka = new Date(tanggal_buka);
        const tanggaltutup = new Date(tanggal_tutup);

        if (tanggaltutup <= tanggalbuka) {
            return res.status(400).json({ code: 400, status: "error", message: "Jadwal Tutup Invalid karena mendahului tanggal buka" });
        }
        recruitment.tanggal_buka = tanggal_buka
        recruitment.tanggal_tutup = tanggal_tutup
        recruitment.status = status;
        recruitment.limit_peserta = limit_peserta;
        await recruitment.save();
        return res.status(200).json({ status: "success", code: 200, message: "Berhasil Memperbarui Recruitment" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Recruitment" })
    }
};

export const UpdateStatusRecruitment = async (req, res) => {
    const { date } = req.body;
    try {
        const recruitmentList = await Recruitment.findAll();
        const updatedRecruitmentList = recruitmentList.map(async (recruitment) => {
            const jadwal_buka = new Date(recruitment.tanggal_buka);
            const jadwal_tutup = new Date(recruitment.tanggal_tutup);
            const jadwal = new Date(date);
            let status = recruitment.status
            if (jadwal_buka < jadwal && jadwal < jadwal_tutup) {
                status = "Open"
            }
            else if (jadwal > jadwal_tutup) {
                status = "Close"
            }
            // Memeriksa apakah status berubah
            if (status !== recruitment.status) {
                // Jika status berubah, lakukan update pada tabel Recruitment
                await Recruitment.update({ status }, { where: { id: recruitment.id } });
            }

            return {
                ...recruitment,
                jadwal_tutup,
                status
            };
        });
        return res.status(200).json({ code: 200, status: "success", message: "Recruitment telah diperbarui" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, status: "error", message: "Terjadi Kesalahan Dalam Memperbarui Recruitment" });
    }
}

