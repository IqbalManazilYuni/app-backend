
import storage from "../config/firebase.config.js";
import DetailKepengurusan from "../models/Model_Kepengurusan/DetailKepengurusan.js";
import Divisi from "../models/Model_Kepengurusan/Divisi.js";
import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import User from "../models/Model_User/Users.js";
import Modul from "../models/Model_Modul/Modul.js"
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";

export const AddLab = async (req, res) => {
    const { nama_Labor, deskripsi, nama_pembina } = req.body;
    const file = req.file;

    try {
        let logoFileName = null;
        if (file) {
            const storageRef = ref(storage, `logo/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            logoFileName = file.originalname;
        }

        const newLab = await Labor.create({
            logo: logoFileName,
            nama_Labor,
            deskripsi,
            nama_pembina
        });
        return res.status(201).json({ code: 201, status: "success", message: "Laboratorium berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan Laboratorium:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendaftarkan Laboratorium." });
    }
};

export const GetLab = async (req, res) => {
    try {
        const allLab = await Labor.findAll();
        if (!allLab || allLab.length === 0) {
            return res.status(404).json({ status: "error", code: 404, message: "Tidak ada Laboratorium yang ditemukan." });
        }
        return res.status(200).json({ code: 200, status: "success", message: "Data Laboratorium ditemukan", data: allLab });
    } catch (error) {
        console.error("Error saat mendapatkan semua Laboratorium:", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendapatkan semua Laboratorium." });
    }
};

export const GetLabByID = async (req, res) => {
    const { id } = req.body;
    try {
        const lab = await Labor.findOne({ where: { id } })
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: "Laboratorium Not Found" });
        }
        return res.status(200).json({ code: 200, status: "status", message: "Laboratorium Ditemukan", data: lab })
    } catch (error) {
        console.error("Error saat mengambil Laboratorium berdasarkan id", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi Kesalahan saat memproses permintaan pengambilan id." });
    }
};

export const GetInfoLab = async (req, res) => {
    const { idLabor } = req.params
    try {
        const [userAs, userEx, userCalon, kepengurusanCount] = await Promise.all([
            User.findAll({ where: { idLabor: idLabor, jenisPengguna: "Asisten" } }),
            User.findAll({ where: { idLabor: idLabor, jenisPengguna: "Ex-Asisten" } }),
            User.findAll({ where: { idLabor: idLabor, jenisPengguna: "Calon Asisten" } }),
            Kepengurusan.findAll({ where: { idLabor: idLabor } }),
        ]);
        const pesertaPromises = userCalon.map(usercalon =>
            Pendaftar.findAll({ where: { idUsers: usercalon.id } })
        );
        const pesertaResults = await Promise.all(pesertaPromises);
        const peserta = pesertaResults.flat();
        const pesertaCount = peserta.length;

        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                userAsCount: userAs.length,
                userExCount: userEx.length,
                pesertaCount: pesertaCount,
                kepengurusanCount: kepengurusanCount.length
            },
        });
    } catch (error) {
        console.error("Error saat mengambil Informasi Laboratorium berdasarkan id", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi Kesalahan saat memproses permintaan pengambilan id." });
    }
}

export const GetInfoLabWithoutIdlabor = async (req, res) => {
    try {
        const [userAs, userEx, userCalon, kepengurusanCount] = await Promise.all([
            User.findAll({ where: { jenisPengguna: "Asisten" } }),
            User.findAll({ where: { jenisPengguna: "Ex-Asisten" } }),
            User.findAll({ where: { jenisPengguna: "Calon Asisten" } }),
            Kepengurusan.findAll(),
        ]);
        const pesertaPromises = userCalon.map(usercalon =>
            Pendaftar.findAll({ where: { idUsers: usercalon.id } })
        );
        const pesertaResults = await Promise.all(pesertaPromises);
        const peserta = pesertaResults.flat();
        const pesertaCount = peserta.length;

        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                userAsCount: userAs.length,
                userExCount: userEx.length,
                pesertaCount: pesertaCount,
                kepengurusanCount: kepengurusanCount.length
            },
        });
    } catch (error) {
        console.error("Error saat mengambil Informasi Laboratorium berdasarkan id", error);
        return res.status(500).json({ status: "error", code: 500, message: "Terjadi Kesalahan saat memproses permintaan pengambilan id." });
    }
}
export const EditLab = async (req, res) => {
    const { id, nama_Labor, deskripsi, nama_pembina } = req.body;
    const file = req.file;

    try {
        const lab = await Labor.findOne({ where: { id } });
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: 'Laboratorium not found' });
        }

        let logoFileName = lab.logo;
        if (file) {
            const storageRef = ref(storage, `logo/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            logoFileName = file.originalname;
        }

        lab.nama_Labor = nama_Labor;
        lab.deskripsi = deskripsi;
        lab.logo = logoFileName;
        lab.nama_pembina = nama_pembina

        await lab.save();
        res.status(200).json({ code: 200, status: "success", message: 'Laboratorium updated successfully' });
    } catch (error) {
        console.error('Error updating Laboratorium:', error);
        res.status(500).json({ code: 500, status: "error", message: 'Failed to update Laboratorium' });
    }
};

export const DeleteLab = async (req, res) => {
    const { id } = req.params;
    try {
        const lab = await Labor.findOne({ where: { id } });
        if (!lab) {
            return res.status(404).json({ code: 404, status: "Not Found", message: 'Laboratorium not found' });
        }
        await lab.destroy();
        return res.status(200).json({ code: 200, status: "success", message: "Laboratorium deleted successfully" });
    } catch (error) {
        console.error('Error Delete Laboratorium:', error);
        res.status(500).json({ code: 500, status: "error", message: 'Failed to delete Laboratorium' });
    }
};
export const GetKepengurusanByIDLabor = async (req, res) => {
    const { idLabor } = req.params;
    try {
        // Ambil data semua kepengurusan berdasarkan idLabor
        const kepengurusanLabor = await Kepengurusan.findAll({ where: { idLabor } });

        // Siapkan array untuk menyimpan semua promises
        const detailKepengurusanPromises = kepengurusanLabor.map(async (kepengurusan) => {
            const detailKepengurusanList = await DetailKepengurusan.findAll({ where: { idKepengurusan: kepengurusan.id } });
            const payloads = kepengurusan.toJSON();
            payloads.details = [];

            if (detailKepengurusanList.length > 0) {
                // Ambil detail divisi dan user untuk setiap detail kepengurusan
                for (const detailKepengurusan of detailKepengurusanList) {
                    const divisi = await Divisi.findOne({ where: { id: detailKepengurusan.idDivisi } });
                    const user = await User.findOne({ where: { id: detailKepengurusan.idUsers } });

                    const detailPayload = {
                        idUsers: detailKepengurusan.idUsers,
                        idDivisi: detailKepengurusan.idDivisi,
                        jabatan: detailKepengurusan.jabatan,
                        idDetail: detailKepengurusan.id,
                        nama_divisi: divisi ? divisi.nama_divisi : null,
                        deskripsi: divisi ? divisi.deskripsi : null,
                        nama: user ? user.nama : null,
                        nomor_asisten: user ? user.nomor_asisten : null,
                        JenisKelamin: user ? user.JenisKelamin : null
                    };

                    payloads.details.push(detailPayload);
                }
            }
            return payloads;
        });
        const detailKepengurusanLabor = await Promise.all(detailKepengurusanPromises);
        return res.status(200).json({ code: 200, status: "success", data: detailKepengurusanLabor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
};

export const GetAdminLabor = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { AksesRole: "Admin" },
            attributes: ['id', 'nama', 'nim', 'nomor_asisten', 'idLabor']
        });

        if (users.length === 0) {
            return res.status(404).json({ code: 404, message: "User Admin Belum Ada" });
        }

        const payload = await Promise.all(users.map(async (user) => {
            const labor = await Labor.findOne({
                where: { id: user.idLabor },
                attributes: ['id', 'nama_Labor']
            });
            return {
                id: labor ? labor.id : null,
                idUser: user.id,
                nama: user.nama,
                nim: user.nim,
                nomorAsisten: user.nomor_asisten,
                namaLabor: labor ? labor.nama_Labor : null,
            };
        }));

        return res.json({ code: 200, status: "success", data: payload });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
};

export const GetAdminByIdLabor = async (req, res) => {
    const { idLabor } = req.params
    try {
        const getAllUser = await User.findAll({ where: { idLabor: idLabor, jenisPengguna: "Asisten", AksesRole: ["Admin", "User"] }, attributes: ['id', 'nama', 'AksesRole'] })
        const datauser = []
        for (const user of getAllUser) {
            const payloads = user.toJSON()
            datauser.push(payloads)
        }
        return res.json({ code: 200, status: "success", payload: datauser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
}

export const EditAdminLabor = async (req, res) => {
    const { idUser, idLabor } = req.body;
    let transaction;
    try {
        // Memulai transaksi
        transaction = await User.sequelize.transaction();

        // Temukan dan perbarui UserAdmin
        const UserAdmin = await User.findOne({ where: { AksesRole: "Admin", idLabor: idLabor }, transaction });
        if (!UserAdmin) {
            throw new Error("User Admin tidak ditemukan");
        }
        UserAdmin.AksesRole = "User";
        await UserAdmin.save({ transaction });

        // Temukan dan perbarui UserBeAdmin setelah UserAdmin berhasil diperbarui
        const UserBeAdmin = await User.findOne({ where: { id: idUser }, transaction });
        if (!UserBeAdmin) {
            throw new Error("User dengan ID tersebut tidak ditemukan");
        }
        UserBeAdmin.AksesRole = "Admin";
        await UserBeAdmin.save({ transaction });

        // Commit transaksi jika semuanya berhasil
        await transaction.commit();

        return res.json({ code: 200, status: "success", message: "Admin Berhasil Diperbarui" });
    } catch (error) {
        console.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
};

export const AddAdminLabor = async (req, res, next) => {
    const { idUser, idLabor } = req.body;
    try {
        const UserAdmin = await User.findOne({ where: { id: idUser } });
        if (!UserAdmin) {
            throw new Error("User tidak ditemukan");
        }
        const userCekAdmin = await User.findOne({ where: { idLabor: idLabor, AksesRole: "Admin" } });
        if (userCekAdmin) {
            return res.status(400).json({ code: 400, status: "Error", message: "Admin Laboratorium Sudah Ada" })
        }
        UserAdmin.AksesRole = "Admin";
        await UserAdmin.save();
        return res.status(200).json({ code: 200, status: "success", message: "Berhasil Menambahkan Admin" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, status: "error", message: "Internal Server Error" });
    }
}







