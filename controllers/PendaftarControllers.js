import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js"
import User from "../models/Model_User/Users.js";
import Labor from "../models/Model_Kepengurusan/Labor.js"
import Kegiatan from "../models/Model_Recruitment/Kegiatan.js"

export const CreatePendaftar = async (req, res) => {
    const { idUsers, tanggal_daftar, idKegiatan, idRecruitment, alasan, Status_Pendaftar, file_permohonan, file_krs } = req.body;
    const transaction = await Pendaftar.sequelize.transaction();

    try {
        const recruitment = await Recruitment.findOne({ where: { id: idRecruitment }, transaction });
        if (recruitment.status === "Close") {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Tutup" });
        }

        const tanggalBuka = new Date(recruitment.tanggal_buka);
        const tanggalTutup = new Date(recruitment.tanggal_tutup);
        const tanggalDaftar = new Date(tanggal_daftar);

        if (tanggalDaftar < tanggalBuka) {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Belum Buka" });
        }
        if (tanggalDaftar > tanggalTutup) {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Tutup" });
        }

        const jumlah_pendaftar = await Pendaftar.count({ where: { idRecruitment }, transaction });
        if (jumlah_pendaftar >= recruitment.limit_peserta) {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Pendaftaraan Sudah Full" });
        }

        const pendaftar = await Pendaftar.findOne({ where: { idUsers, idKegiatan }, transaction });
        if (pendaftar) {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Anda Tidak Bisa Mendaftar Lebih dari satu kali di kegiatan yang sama" });
        }

        const user = await User.findOne({ where: { id: idUsers }, transaction });
        if (user.jenisPengguna !== "Calon Asisten") {
            await transaction.rollback();
            return res.status(202).json({ status: "accept", code: 202, message: "Jenis Pengguna Selain Calon Asisten Tidak diperbolehkan" });
        }
        const kegiatanOr = await Kegiatan.findOne({ id: { idKegiatan }, transaction });
        const tahunkegiatan = Number(kegiatanOr.tahun);
        const angkatanUser = Number(user.angkatan);
        const limitDaftar = tahunkegiatan - angkatanUser
        if (limitDaftar > 1) {
            await transaction.rollback();
            return res.status(400).json({ message: "Angkatan Anda Tidak Bisa Mendaftar Pada Tahun ini", code: 400, status: "error" });
        }
        else if (limitDaftar < 0) {
            await transaction.rollback();
            return res.status(400).json({ message: "Angkatan Anda Tidak Bisa Mendaftar Pada Tahun ini", code: 400, status: "error" });
        }

        await Pendaftar.create({
            idUsers,
            tanggal_daftar,
            idKegiatan,
            idRecruitment,
            alasan,
            file_permohonan,
            file_krs,
            Status_Pendaftar,
        }, { transaction });

        await User.update({ status: 'Tahapan1' }, { where: { id: idUsers }, transaction });

        await transaction.commit();

        return res.status(201).json({ status: "success", code: 201, message: "Pendaftaraan Berhasil" });

    } catch (error) {
        await transaction.rollback();
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
            attributes: ['id', 'idUsers', 'idRecruitment', 'file_krs', 'file_permohonan', 'Status_Pendaftar','verifikasi_berkas']
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
            delete userWithoutPassword.id;
            delete userWithoutPassword.nomor_asisten;
            return {
                ...userWithoutPassword,
                nama_recruitment: recruitmentMap[pend.idRecruitment],
                nama_Labor: laborMap[userWithoutPassword.idLabor],
                id: pend.id,
                verifikasi:pend.verifikasi_berkas,
                idUsers: pend.idUsers,
                file_krs: pend.file_krs,
                file_permohonan: pend.file_permohonan,
                Status_Pendaftar: pend.Status_Pendaftar,
            };
        });
        return res.status(200).json({ status: "success", code: 200, message: "Pendaftar Ditemukan", data: payload })
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Pada Menggambil Pendaftar", error });
    }
};

export const DeletePendaftar = async (req, res) => {
    const { id } = req.params
    try {
        const pendaftar = await Pendaftar.findOne({ where: { id } });
        const user = await User.findOne({ where: { id: pendaftar.idUsers } });
        if (user.status === "Tahapan1") {
            user.status = 'Pendaftar';
            await user.save();
        }
        if (user.status === "Tahapan2" || user.status === "Lulus") {
            return res.status(400).json({ message: "Tidak Bisa Menghapus Asisten yang Sedang OR atau Sudah Lulus", code: 400 })
        }
        await pendaftar.destroy();
        return res.status(200).json({ status: "success", code: 200, message: "Pendaftar Berhasi Dihapus" });
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Saat Menghapus Pendaftar", error });
    }
};

export const GetPendaftarLabByID = async (req, res) => {
    const { idLabor } = req.params;
    try {
        const recruitmentLab = await Recruitment.findAll({
            where: { idLabor },
            attributes: ['id', 'nama_recruitment']
        });
        const result = [];
        for (const recruitment of recruitmentLab) {
            const pendaftarList = await Pendaftar.findAll({
                where: { idRecruitment: recruitment.id },
                attributes: ['idRecruitment', 'idUsers', 'tanggal_daftar']
            });
            const pendaftar = [];
            for (const pend of pendaftarList) {
                const user = await User.findOne({
                    where: { id: pend.idUsers },
                    attributes: ['nama', 'nim', 'email', 'angkatan', 'status', 'nomor_asisten', 'jenisPengguna', 'nomor_hp', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat'],
                });

                pendaftar.push({
                    idUsers: pend.idUsers,
                    ...user.toJSON(),
                    tanggal_daftar: pend.tanggal_daftar
                });
            }
            result.push({
                idRecruitment: recruitment.id,
                nama_recruitment: recruitment.nama_recruitment,
                pendaftar: pendaftar
            });
        }
        return res.status(200).json({ code: 200, status: "success", data: result });
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Saat Mengambil Pendaftar", error });
    }
};

export const GetPendaftarByNIM = async (req, res) => {
    const { nim, idRecruitment } = req.body;
    try {
        const idUser = await User.findOne({ where: { nim } });

        if (!idUser) {
            return res.status(404).json({ code: 404, status: "failure", message: "User not found" });
        }

        const pendaftar = await Pendaftar.findOne({ where: { idUsers: idUser.id, idRecruitment: idRecruitment } });

        if (!pendaftar) {
            console.log("ayam");
            return res.status(404).json({ code: 404, status: "failure", message: "Pendaftar not found" });
        }

        const payload = {
            id: pendaftar.id,
            file_krs: pendaftar.file_krs,
            file_permohonan: pendaftar.file_permohonan,
            alasan: pendaftar.alasan,
            verifikasi_berkas: pendaftar.verifikasi_berkas,
            note: pendaftar.note
        };

        return res.status(200).json({ code: 200, status: "success", data: payload });
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Saat Mengambil Pendaftar", error });
    }
};

export const EditPendaftarDokumen = async (req, res) => {
    const { id, file_krs, file_permohonan, alasan } = req.body;
    try {
        const pendaftar = await Pendaftar.findOne({ where: { id } });
        pendaftar.file_krs = file_krs,
            pendaftar.file_permohonan = file_permohonan,
            pendaftar.alasan = alasan,
            await pendaftar.save();
        return res.status(200).json({ code: 200, message: "Berhasil Memperbarui File Dokumen dan Asalan Mendaftar" })
    } catch (error) {
        return res.status(500).json({ status: "Error", code: 500, message: "Error Saat Memperbarui Pendaftar", error });

    }
}


