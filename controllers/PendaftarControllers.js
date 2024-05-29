import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js"
import User from "../models/Model_User/Users.js";

export const CreatePendaftar = async (req, res) => {
    const { idUsers, tanggal_daftar, idKegiatan, idRecruitment } = req.body;
    try {
        const recruitment = await Recruitment.findOne({ where: { id: idRecruitment } });
        if (recruitment.status === "Close") {
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Tutup" });
        };
        const tanggalBuka = new Date(recruitment.tanggal_buka);
        const tanggalTutup = new Date(recruitment.tanggal_tutup);
        const tanggalDaftar = new Date(tanggal_daftar);

        if (tanggalDaftar < tanggalBuka) {
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Belum Buka" });
        }
        if (tanggalDaftar > tanggalTutup) {
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Tutup" });
        }
        const jumlah_pendaftar = await Pendaftar.findAndCountAll({ where: { idRecruitment } });
        if (jumlah_pendaftar > recruitment.limit_peserta) {
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Full" });
        }
        const pendaftar = await Pendaftar.findOne({ where: { idUsers: idUsers, idKegiatan: idKegiatan } });
        if (pendaftar) {
            return res.status(202).json({ status: "accept", code: 202, message: "Anda Tidak Bisa Mendaftar Lebih dari satu kali di kegiatan yang sama" });
        }
        const user = await User.findOne({ where: { id: idUsers } });
        if (user.jenisPengguna !== "Calon Asisten") {
            return res.status(202).json({ status: "accept", code: 202, message: "Jenis Pengguna Selain Calon Asisten Tidak diperbolehkan" });
        }
        await Pendaftar.create({
            idUsers,
            tanggal_daftar,
            idKegiatan,
            idRecruitment
        });

        await User.update({ status: 'Tahapan1' }, { where: { id: idUsers } });

        return res.status(201).json({ status: "success", code: 201, message: "Pendaftaraan Berhasil" });

    } catch (error) {
        console.error("Error saat mendaftarkan pendaftar:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pendaftar." });
    }
};

export const GetPendaftarByIdRecruitment = async (req, res) => {
    const { idRecruitment } = req.body;
    try {
        const recruitment = await Pendaftar.findAll({ where: { idRecruitment: idRecruitment } });
        if (!recruitment.length > 0) {
            return res.status(200).json({ status: "success", code: 200, message: "Tidak Terdapat Pendaftar" });
        }
        const payload = await Promise.all(recruitment.map(async peserta => {
            const pendaftar = await User.findByPk(peserta.idUsers);
            return {
                nama: pendaftar ? pendaftar.nama : null,
                nim: pendaftar ? pendaftar.nim : null
            }
        }));

        return res.status(200).json({ status: "success", code: 200, message: "Pendaftar Ditemukan", data: payload })
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Pada Menggambil Pendaftar", error });
    }
}