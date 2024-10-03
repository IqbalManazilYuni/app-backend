import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import User from "../models/Model_User/Users.js";
import Labor from "../models/Model_Kepengurusan/Labor.js";
import Kegiatan from "../models/Model_Recruitment/Kegiatan.js";
import { Op, where } from "sequelize";
import Akun from "../models/Model_User/Akun.js";
import DetailKepengurusan from "../models/Model_Kepengurusan/DetailKepengurusan.js";
import Kepengurusan from "../models/Model_Kepengurusan/Kepengurusan.js";

export const CreatePendaftar = async (req, res) => {
  const {
    idUsers,
    tanggal_daftar,
    idKegiatan,
    idRecruitment,
    alasan,
    file_permohonan,
    file_krs,
  } = req.body;
  const transaction = await Pendaftar.sequelize.transaction();
  try {
    const recruitment = await Recruitment.findOne({
      where: { id: idRecruitment },
      transaction,
    });
    if (recruitment.status === "Close") {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message: "Pendaftaraan Sudah Tutup",
      });
    }
    const tanggalBuka = new Date(recruitment.tanggal_buka);
    const tanggalTutup = new Date(recruitment.tanggal_tutup);
    const tanggalDaftar = new Date(tanggal_daftar);
    if (tanggalDaftar < tanggalBuka) {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message: "Pendaftaraan Belum Buka",
      });
    }
    if (tanggalDaftar > tanggalTutup) {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message: "Pendaftaraan Sudah Tutup",
      });
    }
    const jumlah_pendaftar = await Pendaftar.count({
      where: { idRecruitment },
      transaction,
    });
    if (jumlah_pendaftar >= recruitment.limit_peserta) {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message: "Pendaftaraan Sudah Full",
      });
    }
    const pendaftar = await Pendaftar.findOne({
      where: { idUsers, idKegiatan },
      transaction,
    });
    if (pendaftar) {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message:
          "Anda Tidak Bisa Mendaftar Lebih dari satu kali di kegiatan yang sama",
      });
    }
    const user = await User.findOne({ where: { id: idUsers }, transaction });
    if (user.jenisPengguna !== "Calon Asisten") {
      await transaction.rollback();
      return res.status(400).json({
        status: "accept",
        code: 400,
        message: "Jenis Pengguna Selain Calon Asisten Tidak diperbolehkan",
      });
    }
    const kegiatanOr = await Kegiatan.findOne({
      where: { id: idKegiatan },
      transaction,
    });
    const tahunkegiatan = Number(kegiatanOr.tahun);
    const angkatanUser = Number(user.angkatan);
    const limitDaftar = tahunkegiatan - angkatanUser;
    if (limitDaftar > 1) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Angkatan Anda Tidak Bisa Mendaftar Pada Tahun ini",
        code: 400,
        status: "error",
      });
    } else if (limitDaftar < 0) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Angkatan Anda Tidak Bisa Mendaftar Pada Tahun ini",
        code: 400,
        status: "error",
      });
    }
    await Pendaftar.create(
      {
        idUsers,
        tanggal_daftar,
        idKegiatan,
        idRecruitment,
        alasan,
        file_permohonan,
        file_krs,
      },
      { transaction }
    );
    await User.update(
      { status: "Tahapan1" },
      { where: { id: idUsers }, transaction }
    );
    await transaction.commit();
    return res
      .status(201)
      .json({ status: "success", code: 201, message: "Pendaftaraan Berhasil" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error saat mendaftarkan pendaftar:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mendaftarkan pendaftar." });
  }
};

export const GetPendaftarByIdRecruitment = async (req, res) => {
  const { idRecruitment } = req.body;
  try {
    const recruitment = await Pendaftar.findAll({
      where: { idRecruitment: idRecruitment },
    });
    if (!recruitment.length > 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Tidak Terdapat Pendaftar",
      });
    }
    const payload = await Promise.all(
      recruitment.map(async (peserta) => {
        const pendaftar = await User.findByPk(peserta.idUsers);
        return {
          nama: pendaftar ? pendaftar.nama : null,
          nim: pendaftar ? pendaftar.nim : null,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pendaftar Ditemukan",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Pada Menggambil Pendaftar",
      error,
    });
  }
};

export const GetListPendaftarByIdLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const mahasiswaList = await User.findAll({
      where: {
        idLabor: idLabor,
      },
      attributes: [
        "id",
        "alamat",
        "nomor_hp",
        "JenisKelamin",
        "idAkun",
        "nama_file",
        "angkatan",
      ],
    });

    const payload = await Promise.all(
      mahasiswaList.map(async (peserta) => {
        const pendaftarList = await Pendaftar.findAll({
          where: { idUsers: peserta.id },
        });

        if (pendaftarList.length === 0) {
          return null;
        }

        const akunMahasiswa = await Akun.findByPk(peserta.idAkun);

        return await Promise.all(
          pendaftarList.map(async (pendaftar) => {
            const recruitment = await Recruitment.findByPk(
              pendaftar.idRecruitment,
              {
                attributes: ["nama_recruitment"],
              }
            );
            return {
              id: pendaftar.id,
              alamat: peserta.alamat,
              nama_file: peserta.nama_file,
              nomor_hp: peserta.nomor_hp,
              angkatan: peserta.angkatan,
              JenisKelamin: peserta.JenisKelamin,
              nama: akunMahasiswa.nama,
              nim: akunMahasiswa.nim,
              tanggal_daftar: pendaftar.tanggal_daftar,
              idKegiatan: pendaftar.idKegiatan,
              idUsers: pendaftar.idUsers,
              Status_Pendaftar: pendaftar.Status_Pendaftar,
              verifikasi_berkas: pendaftar.verifikasi_berkas,
              note: pendaftar.note,
              file_krs: pendaftar.file_krs,
              file_permohonan: pendaftar.file_permohonan,
              idRecruitment: pendaftar.idRecruitment,
              nama_recruitment: recruitment.nama_recruitment,
            };
          })
        );
      })
    );
    const filteredPayload = payload.flat().filter((p) => p !== null);
    const response = {
      status: "success",
      code: 200,
      message: "Pendaftar Ditemukan",
      data: filteredPayload,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Pada Menggambil Pendaftar",
      error,
    });
  }
};

export const DeletePendaftar = async (req, res) => {
  const { id } = req.params;
  try {
    const pendaftar = await Pendaftar.findOne({ where: { id } });
    if (pendaftar.Status_Pendaftar === "Lulus") {
      return res.status(400).json({
        message: "Tidak Bisa Menghapus Asisten yang Sudah Lulus",
        code: 400,
      });
    }
    await pendaftar.destroy();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pendaftar Berhasi Dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Saat Menghapus Pendaftar",
      error,
    });
  }
};

export const GetPendaftarLabByID = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const recruitmentLab = await Recruitment.findAll({
      where: { idLabor },
      attributes: ["id", "nama_recruitment"],
    });
    const result = [];
    for (const recruitment of recruitmentLab) {
      const pendaftarList = await Pendaftar.findAll({
        where: { idRecruitment: recruitment.id },
        attributes: [
          "idRecruitment",
          "idUsers",
          "tanggal_daftar",
          "Status_Pendaftar",
          "alasan",
        ],
      });
      const pendaftar = [];
      for (const pend of pendaftarList) {
        const user = await User.findOne({
          where: { id: pend.idUsers },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        const akunUser = await Akun.findByPk(user.idAkun);
        pendaftar.push({
          idUsers: pend.idUsers,
          ...user.toJSON(),
          nama: akunUser.nama,
          nim: akunUser.nim,
          email: akunUser.email,
          tanggal_daftar: pend.tanggal_daftar,
          Status_Pendaftar: pend.Status_Pendaftar,
          alasan: pend.alasan,
        });
      }
      result.push({
        idRecruitment: recruitment.id,
        nama_recruitment: recruitment.nama_recruitment,
        pendaftar: pendaftar,
      });
    }
    console.log(JSON.stringify(result));

    return res.status(200).json({ code: 200, status: "success", data: result });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Saat Mengambil Pendaftar",
      error,
    });
  }
};

export const GetPendaftarByNIM = async (req, res) => {
  const { nim, idRecruitment } = req.body;
  console.log(nim);

  try {
    const idUser = await Akun.findOne({ where: { nim } });
    const mahasiswaId = await User.findOne({ where: { idAkun: idUser.id } });
    const pendaftar = await Pendaftar.findOne({
      where: { idUsers: mahasiswaId.id, idRecruitment: idRecruitment },
    });
    if (pendaftar === null) {
      return res.status(404).json({ code: 404, status: "Not Found" });
    }
    const payload = {
      id: pendaftar.id,
      file_krs: pendaftar.file_krs,
      file_permohonan: pendaftar.file_permohonan,
      alasan: pendaftar.alasan,
      verifikasi_berkas: pendaftar.verifikasi_berkas,
      note: pendaftar.note,
      Status_Pendaftar: pendaftar.Status_Pendaftar,
    };
    console.log("ayam");
    console.log(payload);
    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Saat Mengambil Pendaftar",
      error,
    });
  }
};

export const EditPendaftarDokumen = async (req, res) => {
  const { id, file_krs, file_permohonan, alasan } = req.body;
  try {
    const pendaftar = await Pendaftar.findOne({ where: { id } });
    if (!pendaftar) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Data Pendaftar Tidak Ditemukan",
      });
    }
    pendaftar.file_krs = file_krs;
    pendaftar.file_permohonan = file_permohonan;
    pendaftar.alasan = alasan;
    await pendaftar.save();
    return res.status(200).json({
      code: 200,
      message: "Berhasil Memperbarui File Dokumen dan Asalan Mendaftar",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Saat Memperbarui Pendaftar",
      error,
    });
  }
};

export const CetakLaporan = async (req, res) => {
  const { idLabor, idRecruitment, status } = req.body;
  try {
    const getKepengurusan = await Kepengurusan.findOne({
      where: { idLabor: idLabor, status: "aktif" },
    });
    const detailKepengurusan = await DetailKepengurusan.findOne({
      where: {
        idKepengurusan: getKepengurusan?.id,
        jabatan: "Koordinator Asisten",
      },
    });
    const detailKepengurusanIdAsisten = await User.findOne({
      where: { id: detailKepengurusan?.idUsers },
    });
    const akunAsisten = await Akun.findOne({
      where: { id: detailKepengurusanIdAsisten?.idAkun },
      attributes: ["nama", "nim"],
    });
    const getLabor = await Labor.findOne({
      where: { id: idLabor },
      attributes: ["id", "nama_Labor", "nama_pembina", "logo"],
    });
    const getPendaftar = await Pendaftar.findAll({
      where: {
        idRecruitment: idRecruitment,
        Status_Pendaftar: status,
      },
      attributes: ["idUsers"],
    });
    const pendaftarWithAkun = await Promise.all(
      getPendaftar.map(async (pendaftar) => {
        const user = await User.findOne({
          where: { id: pendaftar.idUsers },
          attributes: ["idAkun"],
        });
        const akun = await Akun.findOne({
          where: { id: user.idAkun },
          attributes: ["nama", "nim"],
        });
        return {
          nama: akun?.nama || null,
          nim: akun?.nim || null,
        };
      })
    );
    const payload = {
      akunAsisten,
      getLabor,
      pendaftarWithAkun,
      status,
    };
    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Saat Mengambil Data Laporan",
      error,
    });
  }
};

export const UbahStatusPendaftar = async (req, res) => {
  const { idPendaftar, Status_Pendaftar } = req.body;
  try {
    const dataPendaftar = await Pendaftar.findOne({
      where: {
        id: idPendaftar,
      },
    });
    dataPendaftar.Status_Pendaftar = Status_Pendaftar;
    await dataPendaftar.save();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Status Pendaftar Berhasil Diperbarui",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "error", message: error });
  }
};
