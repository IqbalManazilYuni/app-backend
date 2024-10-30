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
import JawabanUjian from "../models/Model_Recruitment/JawabanUjian.js";

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
    if (
      recruitment.tanggal_buka.getTime() !== tanggalbuka.getTime() ||
      recruitment.tanggal_tutup.getTime() !== tanggaltutup.getTime()
    ) {
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
                const formattedJadwalMulai = new Date(
                  ujianDetail.jadwal_mulai
                ).toLocaleString();
                const formattedJadwalSelesai = new Date(
                  ujianDetail.jadwal_selesai
                ).toLocaleString();

                const pesertaUjian = await PesertaUjian.findAll({
                  where: { idUjian: ujianDetail.id },
                  attributes: ["id", "idPendaftar", "idUsers"],
                });

                const pesertaWithJawaban = await Promise.all(
                  pesertaUjian.map(async (peserta) => {
                    const jawabanPeserta = await JawabanUjian.findAll({
                      where: { idPesertaUjian: peserta.id },
                      attributes: ["id", "tipe_soal", "nilai"],
                    });

                    // Inisialisasi variabel untuk perhitungan
                    let nilai_multiple = 0,
                      jumlah_multiple = 0;
                    let nilai_essay = 0,
                      jumlah_essay = 0;

                    // Menghitung nilai dan jumlah tiap tipe soal
                    jawabanPeserta.forEach((jawaban) => {
                      if (jawaban.tipe_soal === "Multiple") {
                        nilai_multiple += jawaban.nilai;
                        jumlah_multiple++;
                      } else if (jawaban.tipe_soal === "Essay") {
                        nilai_essay += jawaban.nilai;
                        jumlah_essay++;
                      }
                    });

                    // Menghitung rata-rata nilai untuk setiap tipe soal
                    let rata_rata_essay =
                      jumlah_essay > 0
                        ? (nilai_essay / jumlah_essay).toFixed(2)
                        : 0;
                    let rata_rata_multiple =
                      jumlah_multiple > 0
                        ? ((nilai_multiple / jumlah_multiple) * 10).toFixed(2)
                        : 0;

                    // Menghitung total dan rata-rata gabungan
                    let total =
                      parseFloat(rata_rata_essay) +
                      parseFloat(rata_rata_multiple);

                    let rata = total !== 0 ? (total / 2).toFixed(2) : total;

                    return {
                      ...peserta.dataValues,
                      nilaiUjian: rata, // Menyimpan nilai ujian
                      jawaban: jawabanPeserta,
                    };
                  })
                );

                const pesertaWithDetails = await Promise.all(
                  pesertaWithJawaban.map(async (peserta) => {
                    const pendaftarDetail = await Pendaftar.findOne({
                      where: { id: peserta.idPendaftar },
                      attributes: ["idUsers", "Status_Pendaftar"],
                    });

                    const userDetailForEssay = await User.findOne({
                      where: { id: peserta.idUsers },
                      attributes: ["idAkun"],
                    });

                    const akunDetailForEssay = await Akun.findOne({
                      where: { id: userDetailForEssay.idAkun },
                      attributes: ["nama"],
                    });

                    const userDetail = await User.findOne({
                      where: { id: pendaftarDetail.idUsers },
                      attributes: ["idAkun"],
                    });

                    const akunDetail = await Akun.findOne({
                      where: { id: userDetail.idAkun },
                      attributes: ["nama"],
                    });

                    return {
                      ...peserta,
                      namaAkun: akunDetail.nama,
                      penanggungJawabEssay: akunDetailForEssay.nama,
                      statusPendaftar: pendaftarDetail.Status_Pendaftar,
                    };
                  })
                );

                detail = {
                  ...ujianDetail.dataValues,
                  jadwal_mulai: formattedJadwalMulai,
                  jadwal_selesai: formattedJadwalSelesai,
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
                          attributes: [
                            "idUsers",
                            "nilai_komitmen",
                            "nilai_sikap",
                            "nilai_percaya_diri",
                            "nilai_motivasi",
                            "nilai_problem_solving",
                            "nilai_kemampuan_berbicara",
                            "keterangan",
                          ],
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
    return res.status(200).json({
      code: 200,
      status: "success",
      payload: recruitmentWithDetailedTahapan,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "error", message: error });
  }
};
