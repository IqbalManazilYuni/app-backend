import Labor from "../models/Model_Kepengurusan/Labor.js";
import Kegiatan from "../models/Model_Recruitment/Kegiatan.js";
import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Ujian from "../models/Model_Recruitment/Ujian.js";
import Wawancara from "../models/Model_Recruitment/Wawancara.js";
import PesertaWawancara from "../models/Model_Recruitment/PesertaWawancara.js";
import NilaiWawancara from "../models/Model_Recruitment/NilaiWawancara.js";
import PesertaUjian from "../models/Model_Recruitment/PesertaUjian.js";
import User from "../models/Model_User/Users.js";
import Akun from "../models/Model_User/Akun.js";

export const CreateRecruitment = async (req, res) => {
  const {
    idLabor,
    limit_peserta,
    idKegiatan,
    nama_recruitment,
    tanggal_buka,
    tanggal_tutup,
  } = req.body;
  try {
    const labor = await Recruitment.findOne({ where: { idLabor, idKegiatan } });
    if (labor) {
      return res.status(404).json({
        code: 404,
        status: "Found",
        message: "Labor Sudah Terdaftar Pada Kegiatan Recruitment Tahun ini",
      });
    }
    const tanggalbuka = new Date(tanggal_buka);
    const tanggaltutup = new Date(tanggal_tutup);
    const tanggalSekarang = new Date();
    if (tanggaltutup <= tanggalbuka) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Tutup Invalid karena mendahului tanggal buka",
      });
    }
    if (tanggalbuka < tanggalSekarang) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Buka Invalid karena mendahului tanggal sekarang",
      });
    }
    const existingRecruitments = await Recruitment.findAll({
      where: { idLabor },
    });
    for (let recruitment of existingRecruitments) {
      const existingTanggalBuka = new Date(recruitment.tanggal_buka);
      const existingTanggalTutup = new Date(recruitment.tanggal_tutup);

      if (
        (tanggalbuka >= existingTanggalBuka &&
          tanggalbuka <= existingTanggalTutup) ||
        tanggalbuka < existingTanggalBuka
      ) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message:
            "Jadwal Buka Invalid karena bentrok dengan jadwal recruitment yang sudah ada.",
        });
      }
    }
    const newProses = await Recruitment.create({
      idLabor,
      idKegiatan,
      limit_peserta,
      tanggal_buka,
      tanggal_tutup,
      nama_recruitment,
    });
    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Recruitment berhasil didaftarkan.",
      data: newProses,
    });
  } catch (error) {
    console.error("Error saat mendaftarkan Recruitment:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat mendaftarkan Recruitment.",
    });
  }
};

export const GetRecruitmentByLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const proses = await Recruitment.findAll({ where: { idLabor: idLabor } });
    const payload = await Promise.all(
      proses.map(async (recruitment) => {
        const kegiatan = await Kegiatan.findByPk(recruitment.idKegiatan);
        const jumlahPendaftar = await Pendaftar.count({
          where: { idRecruitment: recruitment.id },
        });
        const labor = await Labor.findByPk(recruitment.idLabor);
        return {
          ...recruitment.toJSON(),
          nama_kegiatan: kegiatan ? kegiatan.nama_kegiatan : null,
          tahun: kegiatan ? kegiatan.tahun : null,
          nama_Labor: labor ? labor.nama_Labor : null,
          jumlahPendaftar,
        };
      })
    );
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Labor Recruitment Found",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Pada Mengambil Labor Recruitment",
      error,
    });
  }
};

export const GetRecruitmentByidLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const proses = await Recruitment.findAll({
      where: { idLabor: idLabor },
      attributes: ["id", "nama_recruitment"],
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Recruitment Ditemukan",
      data: proses,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Pada Mengambil Labor Recruitment",
      error,
    });
  }
};

export const GetRecruitment = async (req, res) => {
  const { idKegiatan } = req.params;
  try {
    const proses = await Recruitment.findAll({
      where: { idKegiatan: idKegiatan },
    });
    if (!proses) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "Recruitment Labor Not Found",
      });
    }
    const payload = await Promise.all(
      proses.map(async (recruitment) => {
        const kegiatan = await Kegiatan.findByPk(recruitment.idKegiatan);
        const labor = await Labor.findByPk(recruitment.idLabor);

        return {
          ...recruitment.toJSON(),
          nama_kegiatan: kegiatan ? kegiatan.nama_kegiatan : null,
          nama_Labor: labor ? labor.nama_Labor : null,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Labor Recruitment Or Found",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error Pada Menggambil Labor Recruitment Or",
      error,
    });
  }
};

export const DeleteRecruitment = async (req, res) => {
  const { id } = req.params;
  try {
    const recruitment = await Recruitment.findOne({ where: { id } });
    await recruitment.destroy();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Recruitment Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Menghapus Recruitment",
    });
  }
};

export const GetRecruitmentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const recruitment = await Recruitment.findOne({ where: { id } });
    if (!recruitment) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Recruitment Tidak Ditemukan",
      });
    }
    const tanggalbuka = new Date(recruitment.tanggal_buka).toLocaleString();
    const tanggaltutup = new Date(recruitment.tanggal_tutup).toLocaleString();
    const payload = {
      nama_recruitment: recruitment.nama_recruitment,
      status: recruitment.status,
      limit_peserta: recruitment.limit_peserta,
      tanggal_buka: tanggalbuka,
      tanggal_tutup: tanggaltutup,
    };
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Recruitment Ditemukan",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Mengambil Recruitment",
    });
  }
};

export const EditRecruitment = async (req, res) => {
  const { id, status, idLabor, limit_peserta, tanggal_buka, tanggal_tutup } =
    req.body;
  try {
    const recruitment = await Recruitment.findOne({ where: { id } });
    if (!recruitment) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Recruitment Tidak Ditemukan",
      });
    }
    const tanggalbuka = new Date(tanggal_buka);
    const tanggaltutup = new Date(tanggal_tutup);

    if (tanggaltutup <= tanggalbuka) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Tutup Invalid karena mendahului tanggal buka",
      });
    }
    const existingRecruitments = await Recruitment.findAll({
      where: { idLabor },
    });
    const filterexistingRecruitments = existingRecruitments.filter(
      (recruitment) => recruitment.id !== id
    );
    for (let recruitment of filterexistingRecruitments) {
      const existingTanggalBuka = new Date(recruitment.tanggal_buka);
      const existingTanggalTutup = new Date(recruitment.tanggal_tutup);

      if (
        (tanggalbuka >= existingTanggalBuka &&
          tanggalbuka <= existingTanggalTutup) ||
        tanggalbuka < existingTanggalBuka
      ) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message:
            "Jadwal Buka Invalid karena bentrok dengan jadwal recruitment yang sudah ada.",
        });
      }
    }
    recruitment.tanggal_buka = tanggal_buka;
    recruitment.tanggal_tutup = tanggal_tutup;
    recruitment.status = status;
    recruitment.limit_peserta = limit_peserta;
    await recruitment.save();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Berhasil Memperbarui Recruitment",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Memperbarui Recruitment",
    });
  }
};

export const UpdateStatusRecruitment = async (req, res) => {
  const { date } = req.body;
  try {
    const recruitmentList = await Recruitment.findAll();
    const updatedRecruitmentList = await Promise.all(
      recruitmentList.map(async (recruitment) => {
        const jadwal_buka = new Date(recruitment.tanggal_buka);
        const jadwal_tutup = new Date(recruitment.tanggal_tutup);
        const jadwal = new Date(date);
        let status = recruitment.status;
        if (jadwal_buka <= jadwal && jadwal <= jadwal_tutup) {
          status = "Open";
        } else if (jadwal > jadwal_tutup) {
          status = "Close";
        }
        if (status !== recruitment.status) {
          await Recruitment.update(
            { status },
            { where: { id: recruitment.id } }
          );
        }
        return {
          ...recruitment,
          jadwal_tutup,
          status,
        };
      })
    );
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Recruitment telah diperbarui",
      data: updatedRecruitmentList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Memperbarui Recruitment",
    });
  }
};

export const GetAllDataRecruitment = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const getAllRecruitment = await Recruitment.findAll({
      where: {
        idLabor: idLabor,
      },
      attributes: [
        "id",
        "nama_recruitment",
        "limit_peserta",
        "tanggal_buka",
        "tanggal_tutup",
      ],
    });
    const recruitmentIds = getAllRecruitment.map(
      (recruitment) => recruitment.id
    );
    const dataTahapan = await Promise.all(
      recruitmentIds.map(async (idRecruitment) => {
        // Mengambil semua data tahapan berdasarkan idRecruitment
        const tahapan = await Tahapan.findAll({
          where: {
            idRecruitment: idRecruitment,
          },
          attributes: ["id", "nama_tahapan", "jenis_tahapan"],
        });
        const detailTahapan = await Promise.all(
          tahapan.map(async (item) => {
            let detail = null;
            if (item.jenis_tahapan === "Ujian") {
              const ujianDetail = await Ujian.findOne({
                where: {
                  idTahapan: item.id,
                },
                attributes: [
                  "id",
                  "nama_ujian",
                  "jadwal_mulai",
                  "jadwal_selesai",
                ],
              });
              if (ujianDetail) {
                const pesertaUjian = await PesertaUjian.findAll({
                  where: {
                    idUjian: ujianDetail.id,
                  },
                  attributes: ["id", "idPendaftar", "nilaiUjian", "idUsers"],
                });
                const pesertaWithDetails = await Promise.all(
                  pesertaUjian.map(async (peserta) => {
                    const pendaftarDetail = await Pendaftar.findOne({
                      where: {
                        id: peserta.idPendaftar,
                      },
                      attributes: ["idUsers"],
                    });
                    const userDetailForEssay = await User.findOne({
                      where: {
                        id: peserta.idUsers, 
                      },
                      attributes: ["idAkun"],
                    });
                    const akunDetailForEssay = await Akun.findOne({
                      where: {
                        id: userDetailForEssay.idAkun,
                      },
                      attributes: ["nama"],
                    });
                    const userDetail = await User.findOne({
                      where: {
                        id: pendaftarDetail.idUsers,
                      },
                      attributes: ["idAkun"],
                    });
                    const akunDetail = await Akun.findOne({
                      where: {
                        id: userDetail.idAkun,
                      },
                      attributes: ["nama"],
                    });
                    return {
                      ...peserta.dataValues,
                      namaAkun: akunDetail.nama, 
                      penanggungJawabEssay: akunDetailForEssay.nama, 
                    };
                  })
                );
                detail = {
                  ...ujianDetail.dataValues,
                  pesertaUjian: pesertaWithDetails,
                };
              }
            } else if (item.jenis_tahapan === "Wawancara") {
              const wawancaraDetail = await Wawancara.findOne({
                where: {
                  idTahapan: item.id,
                },
                attributes: ["id"],
              });

              if (wawancaraDetail) {
                const pesertaWawancara = await PesertaWawancara.findAll({
                  where: {
                    idWawancara: wawancaraDetail.id,
                  },
                  attributes: [
                    "id",
                    "idPendaftar",
                    "metode_wawancara",
                    "lokasi",
                    "jadwal_mulai",
                    "jadwal_selesai",
                  ],
                });

                const pesertaWithDetails = await Promise.all(
                  pesertaWawancara.map(async (peserta) => {
                    // Ambil detail pendaftar
                    const pendaftarDetail = await Pendaftar.findOne({
                      where: {
                        id: peserta.idPendaftar,
                      },
                      attributes: ["idUsers"],
                    });
                    const userDetail = await User.findOne({
                      where: {
                        id: pendaftarDetail.idUsers,
                      },
                      attributes: ["idAkun"],
                    });
                    const akunDetail = await Akun.findOne({
                      where: {
                        id: userDetail.idAkun,
                      },
                      attributes: ["nama"],
                    });
                    const nilaiWawancara = await Promise.all(
                      (
                        await NilaiWawancara.findAll({
                          where: {
                            idPesertaWawancara: peserta.id,
                          },
                          attributes: ["idUsers", "nilai", "keterangan"],
                        })
                      ).map(async (nilai) => {
                        const pewawancaraUserDetail = await User.findOne({
                          where: {
                            id: nilai.idUsers,
                          },
                          attributes: ["idAkun"],
                        });
                        const pewawancaraAkunDetail = await Akun.findOne({
                          where: {
                            id: pewawancaraUserDetail.idAkun,
                          },
                          attributes: ["nama"],
                        });
                        return {
                          ...nilai.dataValues,
                          namaPewawancara: pewawancaraAkunDetail.nama,
                        };
                      })
                    );
                    return {
                      ...peserta.dataValues,
                      namaAkun: akunDetail.nama,
                      nilaiWawancara,
                    };
                  })
                );
                detail = {
                  ...wawancaraDetail.dataValues,
                  pesertaWawancara: pesertaWithDetails,
                };
              }
            }
            return {
              ...item.dataValues,
              detail,
            };
          })
        );
        return {
          idRecruitment,
          tahapan: detailTahapan,
        };
      })
    );
    console.log("ayam");
    const recruitmentWithDetailedTahapan = getAllRecruitment.map(
      (recruitment) => {
        const tahapanData = dataTahapan.find(
          (data) => data.idRecruitment === recruitment.id
        );
        return {
          ...recruitment.dataValues,
          tahapan: tahapanData ? tahapanData.tahapan : [],
        };
      }
    );
    console.log(JSON.stringify(recruitmentWithDetailedTahapan));
  } catch (error) {}
};
