import storage from "../config/firebase.config.js";
import DetailKepengurusan from "../models/Model_Kepengurusan/DetailKepengurusan.js";
import Divisi from "../models/Model_Kepengurusan/Divisi.js";
import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import User from "../models/Model_User/Users.js";
import Modul from "../models/Model_Modul/Modul.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import BankSoal from "../models/Model_Soal/BankSoal.js";
import Akun from "../models/Model_User/Akun.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const AddLab = async (req, res) => {
  const { nama_Labor, deskripsi, nama_pembina } = req.body;
  const file = req.file;

  try {
    let logoFileName = null;
    if (file) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const uploadFolderPath = path.join(__dirname, "../public/logos");
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
      }

      const timestamp = Date.now();
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${path.basename(
        file.originalname,
        fileExtension
      )}_${timestamp}${fileExtension}`;

      const localFilePath = path.join(uploadFolderPath, newFileName);
      fs.writeFileSync(localFilePath, file.buffer);

      const storageRef = ref(storage, `logo/${newFileName}`);
      const snapshot = await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);

      logoFileName = newFileName;
    }
    const newLab = await Labor.create({
      logo: logoFileName,
      nama_Labor,
      deskripsi,
      nama_pembina,
    });
    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Laboratorium berhasil didaftarkan.",
    });
  } catch (error) {
    console.error("Error saat mendaftarkan Laboratorium:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi kesalahan saat mendaftarkan Laboratorium.",
    });
  }
};

export const GetLab = async (req, res) => {
  try {
    const allLab = await Labor.findAll();
    if (!allLab || allLab.length === 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Tidak ada Laboratorium yang ditemukan.",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Laboratorium ditemukan",
      data: allLab,
    });
  } catch (error) {
    console.error("Error saat mendapatkan semua Laboratorium:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi kesalahan saat mendapatkan semua Laboratorium.",
    });
  }
};

export const GetLabByIdLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const Lab = await Labor.findAll({ where: { id: idLabor } });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Laboratorium ditemukan",
      data: Lab,
    });
  } catch (error) {
    console.error("Error saat mendapatkan semua Laboratorium:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi kesalahan saat mendapatkan semua Laboratorium.",
    });
  }
};

export const GetLabByID = async (req, res) => {
  const { id } = req.body;
  try {
    const lab = await Labor.findOne({ where: { id } });
    if (!lab) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Laboratorium Not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: "status",
      message: "Laboratorium Ditemukan",
      data: lab,
    });
  } catch (error) {
    console.error("Error saat mengambil Laboratorium berdasarkan id", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi Kesalahan saat memproses permintaan pengambilan id.",
    });
  }
};

export const GetInfoLab = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const [userAs, userEx, userCalon, kepengurusanCount] = await Promise.all([
      User.findAll({ where: { idLabor: idLabor, jenisPengguna: "Asisten" } }),
      User.findAll({
        where: { idLabor: idLabor, jenisPengguna: "Ex-Asisten" },
      }),
      User.findAll({
        where: { idLabor: idLabor, jenisPengguna: "Calon Asisten" },
      }),
      Kepengurusan.findAll({ where: { idLabor: idLabor } }),
    ]);
    const pesertaPromises = userCalon.map((usercalon) =>
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
        kepengurusanCount: kepengurusanCount.length,
      },
    });
  } catch (error) {
    console.error(
      "Error saat mengambil Informasi Laboratorium berdasarkan id",
      error
    );
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi Kesalahan saat memproses permintaan pengambilan id.",
    });
  }
};

export const GetInfoLabWithoutIdlabor = async (req, res) => {
  try {
    const [userAs, userEx, userCalon, kepengurusanCount] = await Promise.all([
      User.findAll({ where: { jenisPengguna: "Asisten" } }),
      User.findAll({ where: { jenisPengguna: "Ex-Asisten" } }),
      User.findAll({ where: { jenisPengguna: "Calon Asisten" } }),
      Kepengurusan.findAll(),
    ]);
    const pesertaPromises = userCalon.map((usercalon) =>
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
        kepengurusanCount: kepengurusanCount.length,
      },
    });
  } catch (error) {
    console.error(
      "Error saat mengambil Informasi Laboratorium berdasarkan id",
      error
    );
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Terjadi Kesalahan saat memproses permintaan pengambilan id.",
    });
  }
};
export const EditLab = async (req, res) => {
  const { id, nama_Labor, deskripsi, nama_pembina } = req.body;
  const file = req.file;
  try {
    const lab = await Labor.findOne({ where: { id } });
    if (!lab) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Laboratorium not found",
      });
    }

    let logoFileName = lab.logo;
    if (file) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const uploadFolderPath = path.join(__dirname, "../public/logos");
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
      }

      const timestamp = Date.now();
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${path.basename(
        file.originalname,
        fileExtension
      )}_${timestamp}${fileExtension}`;

      const localFilePath = path.join(uploadFolderPath, newFileName);
      fs.writeFileSync(localFilePath, file.buffer);

      const storageRef = ref(storage, `logo/${newFileName}`);
      const snapshot = await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);

      logoFileName = newFileName;
    }

    lab.nama_Labor = nama_Labor;
    lab.deskripsi = deskripsi;
    lab.logo = logoFileName;
    lab.nama_pembina = nama_pembina;

    await lab.save();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Laboratorium updated successfully",
    });
  } catch (error) {
    console.error("Error updating Laboratorium:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to update Laboratorium",
    });
  }
};

export const DeleteLab = async (req, res) => {
  const { id } = req.params;
  try {
    const lab = await Labor.findOne({ where: { id } });
    if (!lab) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Laboratorium not found",
      });
    }
    await lab.destroy();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Laboratorium deleted successfully",
    });
  } catch (error) {
    console.error("Error Delete Laboratorium:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to delete Laboratorium",
    });
  }
};

export const GetKepengurusanByIDLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const kepengurusanLabor = await Kepengurusan.findAll({
      where: { idLabor },
    });
    const detailKepengurusanPromises = kepengurusanLabor.map(
      async (kepengurusan) => {
        const detailKepengurusanList = await DetailKepengurusan.findAll({
          where: { idKepengurusan: kepengurusan.id },
        });
        const payloads = kepengurusan.toJSON();
        payloads.details = [];
        if (detailKepengurusanList.length > 0) {
          for (const detailKepengurusan of detailKepengurusanList) {
            const divisi = await Divisi.findOne({
              where: { id: detailKepengurusan.idDivisi },
            });
            const user = await User.findOne({
              where: { id: detailKepengurusan.idUsers },
            });
            const akunUser = await Akun.findOne({ where: { id: user.idAkun } });
            const detailPayload = {
              idUsers: detailKepengurusan.idUsers,
              idDivisi: detailKepengurusan.idDivisi,
              jabatan: detailKepengurusan.jabatan,
              idDetail: detailKepengurusan.id,
              nama_divisi: divisi ? divisi.nama_divisi : null,
              deskripsi: divisi ? divisi.deskripsi : null,
              nama: akunUser ? akunUser.nama : null,
              nomor_asisten: user ? user.nomor_asisten : null,
              JenisKelamin: user ? user.JenisKelamin : null,
            };
            payloads.details.push(detailPayload);
          }
        }
        return payloads;
      }
    );
    const detailKepengurusanLabor = await Promise.all(
      detailKepengurusanPromises
    );
    return res
      .status(200)
      .json({ code: 200, status: "success", data: detailKepengurusanLabor });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const GetAdminLabor = async (req, res) => {
  try {
    const users = await Akun.findAll({
      where: { AksesRole: "Admin" },
      attributes: ["id", "nama", "nim"],
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ code: 404, message: "User Admin Belum Ada" });
    }
    const mahasiswaList = [];
    for (const user of users) {
      const mahasiswa = await User.findOne({
        where: { idAkun: user.id },
        attributes: ["idLabor", "nomor_asisten"],
      });
      if (mahasiswa) {
        mahasiswaList.push({
          ...mahasiswa.dataValues,
          nama: user.nama,
          nim: user.nim,
          id: user.id,
        });
      }
    }
    console.log(mahasiswaList);
    if (mahasiswaList.length === 0) {
      return res
        .status(404)
        .json({ code: 404, message: "Mahasiswa Tidak Ditemukan" });
    }

    const payload = await Promise.all(
      mahasiswaList.map(async (user) => {
        const labor = await Labor.findOne({
          where: { id: user.idLabor },
          attributes: ["id", "nama_Labor"],
        });
        return {
          id: labor ? labor.id : null,
          idUser: user.id,
          nama: user.nama,
          nim: user.nim,
          nomorAsisten: user.nomor_asisten,
          namaLabor: labor ? labor.nama_Labor : null,
        };
      })
    );
    console.log(payload);
    return res.json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const GetAdminByIdLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const getAllUser = await User.findAll({
      where: { idLabor: idLabor, jenisPengguna: "Asisten" },
      attributes: ["idAkun"],
    });
    const datauser = [];
    for (const user of getAllUser) {
      const mahasiswa = await Akun.findOne({
        where: { id: user.idAkun },
      });
      if (mahasiswa) {
        datauser.push({
          ...mahasiswa.dataValues,
          // nama: user.nama,
          // nim: user.nim
        });
      }
    }
    return res.json({ code: 200, status: "success", payload: datauser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const EditAdminLabor = async (req, res) => {
  const { idUser, idLabor } = req.body;
  try {
    const UserMahasiswa = await User.findAll({
      where: { idLabor: idLabor, jenisPengguna: "Asisten" },
    });
    let akunadminbyid = null;
    for (const akunUser of UserMahasiswa) {
      const akun = await Akun.findOne({ where: { id: akunUser.idAkun } });
      if (akun.AksesRole === "Admin") {
        akunadminbyid = akun;
        break;
      }
    }
    console.log(akunadminbyid);
    akunadminbyid.AksesRole = "User";
    await akunadminbyid.save();

    const akunadminbaru = await Akun.findOne({ where: { id: idUser } });
    akunadminbaru.AksesRole = "Admin";
    await akunadminbaru.save();

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Admin Berhasi Di Perbarui",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const AddAdminLabor = async (req, res, next) => {
  const { idUser, idLabor } = req.body;
  try {
    const UserAdmin = await Akun.findOne({ where: { id: idUser } });
    if (!UserAdmin) {
      return res
        .status(400)
        .json({ code: 400, status: "Error", message: "User Tidak ditemukan" });
    }
    if (idUser === "") {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message: "data admin tidak boleh kosong",
      });
    }
    const userCekAdmin = await Akun.findAll({ where: { AksesRole: "Admin" } });
    for (const mahasiswa of userCekAdmin) {
      const mahasiswaAdminLabor = await User.findOne({
        where: { idAkun: mahasiswa.id },
      });
      if (mahasiswaAdminLabor.idLabor === idLabor) {
        return res.status(400).json({
          code: 400,
          status: "Error",
          message: "Admin Laboratorium Sudah Ada",
        });
      }
    }
    UserAdmin.AksesRole = "Admin";
    await UserAdmin.save();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Menambahkan Admin",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};
