import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js"
import User from "../models/Model_User/Users.js";
import Labor from "../models/Model_Kepengurusan/Labor.js"

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
};

export const GetListPendaftarByIdLabor = async (req, res) => {
    const { idLabor } = req.params
    try {
        const recruitment = await Recruitment.findAll({ where: { idLabor } });
        const idRecruitments = recruitment.map(rec => rec.id);

        const pendaftar = await Pendaftar.findAll({
            where: { idRecruitment: idRecruitments },
            attributes: ['idUsers', 'idRecruitment']
        });
        const idUsers = pendaftar.map(pend => pend.idUsers);

        const users = await User.findAll({
            where: { id: idUsers }
        });

        const idLabors = users.map(user => user.idLabor);

        const labors = await Labor.findAll({
            where: { id: idLabors }
        });

        const recruitmentMap = recruitment.reduce((map, rec) => {
            map[rec.id] = rec.nama_recruitment;
            return map;
        }, {});

        const laborMap = labors.reduce((map, lab) => {
            map[lab.id] = lab.nama_Labor;
            return map;
        }, {});
        
        const payload = pendaftar.map(pend => {
            const user = users.find(usr => usr.id === pend.idUsers);
            const userWithoutPassword = user.toJSON();
            delete userWithoutPassword.password;
            return {
                ...userWithoutPassword,
                nama_recruitment: recruitmentMap[pend.idRecruitment],
                nama_Labor: laborMap[userWithoutPassword.idLabor]
            };
        });
        return res.status(200).json({ status: "success", code: 200, message: "Pendaftar Ditemukan", data: payload })
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Pada Menggambil Pendaftar", error });
    }
}