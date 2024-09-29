import { Op } from "sequelize";
import PesertaWawancara from "../models/Model_Recruitment/PesertaWawancara.js";
import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Wawancara from "../models/Model_Recruitment/Wawancara.js";
import User from "../models/Model_User/Users.js";
import Pendaftar from "../models/Model_Recruitment/Pendaftar.js";
import NilaiWawancara from "../models/Model_Recruitment/NilaiWawancara.js";
import Akun from "../models/Model_User/Akun.js";

export const GetWawancaraByIdLabor = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const recruitments = await Recruitment.findAll({ where: { idLabor } });
    const payload = await Promise.all(
      recruitments.map(async (recruitment) => {
        const tahapanList = await Tahapan.findAll({
          where: { idRecruitment: recruitment.id, jenis_tahapan: "Wawancara" },
        });
        const wawancaraDetails = await Promise.all(
          tahapanList.map(async (tahapan) => {
            const wawancaras = await Wawancara.findAll({
              where: { idTahapan: tahapan.id },
            });
            return wawancaras.map((wawancara) => ({
              ...wawancara.toJSON(),
            }));
          })
        );
        const wawancaraFlat = wawancaraDetails.flat();
        return {
          nama_recruitment: recruitment.nama_recruitment,
          wawancara: wawancaraFlat,
        };
      })
    );
    res.status(200).json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mengambil wawancara:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil wawancara.",
    });
  }
};

export const GetWawancaraById = async (req, res) => {
  const { id } = req.params;
  try {
    const wawancara = await Wawancara.findOne({ where: { id } });
    if (wawancara.tanggal_terakhir_pengajuan === null) {
      const payload = {
        nama_wawancara: wawancara.nama_wawancara,
        tanggal_terakhir_pengajuan: null,
      };
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Wawancara Ditemukan",
        data: payload,
      });
    } else {
      const payload = {
        nama_wawancara: wawancara.nama_wawancara,
        tanggal_terakhir_pengajuan: new Date(
          wawancara.tanggal_terakhir_pengajuan
        ).toLocaleString(),
      };
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Wawancara Ditemukan",
        data: payload,
      });
    }
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mengambil wawancara:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil wawancara.",
    });
  }
};

export const GetPesertaWawancara = async (req, res) => {
  const { idWawancara } = req.params;
  try {
    const peserta = await PesertaWawancara.findAll({
      where: { idWawancara: idWawancara },
    });
    if (peserta.length === 0) {
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Peserta wawancara kosong",
        data: [],
      });
    }
    const payload = await Promise.all(
      peserta.map(async (pesertas) => {
        const pendaftar = await Pendaftar.findOne({
          where: { id: pesertas.idPendaftar },
        });
        if (pendaftar) {
          const user = await User.findOne({ where: { id: pendaftar.idUsers } });
          if (user) {
            const userAkun = await Akun.findOne({ where: { id: user.idAkun } });
            return {
              ...pesertas.toJSON(),
              nama: userAkun.nama,
            };
          }
        }
        return null;
      })
    );
    const filteredPayload = payload.filter((item) => item !== null);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Peserta Wawancara Ditemukan",
      data: filteredPayload,
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mengambil peserta wawancara:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil peserta wawancara.",
    });
  }
};

export const CreatePesertaWawancara = async (req, res) => {
  const {
    idWawancara,
    idPendaftar,
    lokasi,
    jadwal_mulai,
    jadwal_selesai,
    metode_wawancara,
  } = req.body;
  try {
    const pendaftar = await PesertaWawancara.findOne({
      where: { idPendaftar },
    });
    const wawancaraid = await Wawancara.findOne({ where: { id: idWawancara } });
    const tahapanid = await Tahapan.findOne({
      where: { id: wawancaraid.idTahapan },
    });
    const getwaktuclose = await Recruitment.findOne({
      where: { id: tahapanid.idRecruitment },
    });
    if (pendaftar) {
      return res.status(404).json({
        code: 404,
        status: "Found",
        message: "Pendaftar Sudah Terdaftar pada Peserta Wawancara",
      });
    }
    const mulai = new Date(jadwal_mulai);
    const selesai = new Date(jadwal_selesai);
    const tanggalSekarang = new Date();
    const tutupRecruitment = new Date(getwaktuclose.tanggal_tutup);
    const tanggalPengajuanTerakhir = new Date(
      wawancaraid.tanggal_terakhir_pengajuan
    );
    const oneDayAfterPengajuan = new Date(tanggalPengajuanTerakhir);
    oneDayAfterPengajuan.setDate(oneDayAfterPengajuan.getDate() + 1);
    if (mulai >= oneDayAfterPengajuan) {
      console.log("Mulai is at least one day after the last submission date.");
    } else {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message:
          "Mulai harus minimal 1 hari setelah tanggal pengajuan terakhir.",
      });
    }
    if (tanggalSekarang > mulai) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Mulai Wawancara tidak boleh di masa lalu",
      });
    }
    if (selesai <= mulai) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message:
          "Jadwal Selesai Wawancara harus setelah Jadwal Mulai Wawancara",
      });
    }
    if (mulai < tutupRecruitment) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Mulai Wawancara Invalid",
      });
    }
    await PesertaWawancara.create({
      idWawancara,
      idPendaftar,
      lokasi,
      jadwal_mulai,
      jadwal_selesai,
      metode_wawancara,
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Peserta Wawancara Berhasil ditambahkan",
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mendaftarkan peserta wawancara:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mendaftarkan peserta wawancara.",
    });
  }
};

export const GetPendaftarByIDWawancara = async (req, res) => {
  const { idWawancara } = req.params;
  try {
    const wawancara = await Wawancara.findOne({ where: { id: idWawancara } });
    if (!wawancara) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Wawancara tidak ditemukan",
      });
    }
    const tahapan = await Tahapan.findOne({
      where: { id: wawancara.idTahapan },
    });
    if (!tahapan) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Tahapan tidak ditemukan",
      });
    }
    const pendaftarList = await Pendaftar.findAll({
      where: {
        idRecruitment: tahapan.idRecruitment,
        verifikasi_berkas: "Terverifikasi",
      },
    }); // tambahkan pengecekan status untuk mencari list pendaftar untuk wawancara
    if (pendaftarList.length === 0) {
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tidak ada pendaftar",
        data: [],
      });
    }
    const payload = await Promise.all(
      pendaftarList.map(async (pendaftar) => {
        const user = await User.findOne({
          where: {
            id: pendaftar.idUsers,
            // status: { // jika ini di hapus maka akan tampil semua data baiknya config lagi
            //     [Op.notIn]: ["Gagal", "Lulus", "Pendaftar"]
            // }
          },
        });
        const akunUser = await Akun.findOne({ where: { id: user.idAkun } });
        if (user) {
          return {
            id: pendaftar.id,
            nama: akunUser.nama,
          };
        }
        return null;
      })
    );
    const filteredPayload = payload.filter((item) => item !== null);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Pendaftar ditemukan",
      data: filteredPayload,
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mengambil pendaftar:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil pendaftar.",
    });
  }
};

export const GetJadwalWawancara = async (req, res) => {
  const { idWawancara, lokasi } = req.body;
  try {
    const jadwal = await PesertaWawancara.findAll({
      where: { idWawancara, lokasi },
      order: [["jadwal_mulai", "DESC"]],
      limit: 1,
    });
    const payloadJadwal = jadwal.map((jadwals) => ({
      jadwal_mulai: new Date(jadwals.jadwal_mulai).toLocaleString(),
      jadwal_selesai: new Date(jadwals.jadwal_selesai).toLocaleString(),
    }));
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Jadwal ditemukan",
      data: payloadJadwal,
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat saat proses mengambil jadwal:",
      error
    );
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil jadwal.",
    });
  }
};

export const GetPesertaByID = async (req, res) => {
  const { id } = req.params;
  try {
    const peserta = await PesertaWawancara.findOne({ where: { id } });
    const pendaftar = await Pendaftar.findOne({
      where: { id: peserta.idPendaftar },
    });
    const DetailUser = await User.findOne({ where: { id: pendaftar.idUsers } });
    const namaAkun = await Akun.findOne({ where: { id: DetailUser.idAkun } });
    const jadwalmulai = new Date(peserta.jadwal_mulai).toLocaleString();
    const jadwalselesai = new Date(peserta.jadwal_selesai).toLocaleString();
    const payload = {
      nama: namaAkun.nama,
      lokasi: peserta.lokasi,
      metode_wawancara: peserta.metode_wawancara,
      jadwal_mulai: jadwalmulai,
      jadwal_selesai: jadwalselesai,
      asalan_pengajuan: peserta.asalan_pengajuan,
      status_pengajuan: peserta.status_pengajuan,
    };
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Peserta Ditemukan",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Mengambil Peserta Wawancara",
    });
  }
};

export const EditPesertaWawancara = async (req, res) => {
  const {
    id,
    jadwal_mulai,
    jadwal_selesai,
    lokasi,
    jadwalPengajuanTerakhir,
    metode_wawancara,
    status_pengajuan,
  } = req.body;
  try {
    const pesertaWawancara = await PesertaWawancara.findOne({ where: { id } });
    const mulai = new Date(jadwal_mulai);
    const selesai = new Date(jadwal_selesai);
    const jadwalPengajuan = new Date(jadwalPengajuanTerakhir);
    const minimumMulai = new Date(
      jadwalPengajuan.getTime() + 24 * 60 * 60 * 1000
    );
    if (mulai < minimumMulai) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message:
          "Jadwal Mulai Wawancara harus setidaknya 24 jam setelah Jadwal Pengajuan",
      });
    }
    if (mulai < jadwalPengajuan) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Mulai Wawancara tidak boleh sebelum Jadwal Pengajuan",
      });
    }
    if (selesai <= mulai) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Jadwal Selesai Invalid",
      });
    }
    const existingJadwal = await PesertaWawancara.findAll({
      where: {
        idWawancara: pesertaWawancara.idWawancara,
        lokasi: pesertaWawancara.lokasi,
      },
      order: [["jadwal_mulai", "DESC"]],
    });
    const conflictingSlots = [];
    const existingStart = new Date(pesertaWawancara.jadwal_mulai);
    if (existingStart.getTime() !== mulai.getTime()) {
      existingJadwal.forEach((jadwal) => {
        const existingStart = new Date(jadwal.jadwal_mulai);
        const existingEnd = new Date(jadwal.jadwal_selesai);
        if (jadwal.lokasi === lokasi) {
          if (
            (mulai >= existingStart && mulai <= existingEnd) ||
            (selesai >= existingStart && selesai <= existingEnd)
          ) {
            conflictingSlots.push({
              start: existingStart.toLocaleString(),
              end: existingEnd.toLocaleString(),
            });
          }
        }
      });
    }
    if (conflictingSlots.length > 0) {
      const conflictingMessage = conflictingSlots
        .map((slot) => `${slot.start} - ${slot.end}`)
        .join(", ");
      return res.status(400).json({
        code: 400,
        status: "error",
        message: `Jadwal bentrok dengan jadwal yang sudah ada: ${conflictingMessage}`,
      });
    }
    if (lokasi === "") {
      return res
        .status(400)
        .json({ code: 400, status: "error", message: `lokasi anda kosong` });
    }
    pesertaWawancara.lokasi = lokasi;
    pesertaWawancara.jadwal_mulai = jadwal_mulai;
    pesertaWawancara.jadwal_selesai = jadwal_selesai;
    pesertaWawancara.metode_wawancara = metode_wawancara;
    pesertaWawancara.status_pengajuan = status_pengajuan;
    await pesertaWawancara.save();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Peserta Wawancara Berhasil Diperbarui",
    });
  } catch (error) {
    console.error("Terjadi Kesalahan Saat saat proses update tahapan:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses memperbarui Peserta Wawancara.",
    });
  }
};

export const DeletePesertaWawancara = async (req, res) => {
  const { id } = req.params;
  try {
    const peserta = await PesertaWawancara.findOne({ where: { id } });
    await peserta.destroy();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Peserta Wawancara Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Menghapus Peserta Wawancara",
    });
  }
};

export const DeletePewawancara = async (req, res) => {
  const { id } = req.params;
  try {
    const pewawancara = await NilaiWawancara.findOne({ where: { id } });
    await pewawancara.destroy();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pewawancara Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Menghapus Pewawancara",
    });
  }
};

export const GetNilaiPewawancara = async (req, res) => {
  const { id } = req.params;
  try {
    const nilai_wawancara = await NilaiWawancara.findAll({
      where: { idPesertaWawancara: id },
    });
    const payload = [];
    for (const nilai_wawancaras of nilai_wawancara) {
      const pewawancara = await User.findByPk(nilai_wawancaras.idUsers);
      const namaPewawancara = await Akun.findByPk(pewawancara.idAkun);
      const payloads = nilai_wawancaras.toJSON();
      payloads.nama = namaPewawancara ? namaPewawancara.nama : null;
      payload.push(payloads);
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Nilai Peserta Wawancara Ditemukan",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Mengambil Nilai Peserta Wawancara",
    });
  }
};

export const GetAsistePewawancara = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const PewawancaraAsisten = await User.findAll({
      where: { idLabor: idLabor, jenisPengguna: "Asisten" },
    });
    const payload = await Promise.all(
      PewawancaraAsisten.map(async (pewawancara) => {
        const akunPewawancara = await Akun.findByPk(pewawancara.idAkun);
        return {
          id: pewawancara.id,
          nama: akunPewawancara.nama,
        };
      })
    );
    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Dalam Mengambil Asisten Pewawancara",
    });
  }
};

export const CreateNilaiWawancara = async (req, res) => {
  const { idPesertaWawancara, idUsers, nilai, keterangan } = req.body;
  try {
    const currentPeserta = await PesertaWawancara.findOne({
      where: { id: idPesertaWawancara },
      attributes: ["jadwal_mulai", "jadwal_selesai", "lokasi"],
    });
    if (!currentPeserta) {
      return res
        .status(404)
        .json({ message: "Peserta Wawancara tidak ditemukan" });
    }
    const { jadwal_mulai, jadwal_selesai, lokasi } = currentPeserta;
    for (const pewawancaraId of idUsers) {
      const nilaiWawancaraList = await NilaiWawancara.findAll({
        where: { idUsers: pewawancaraId },
      });
      for (const nilaiWawancara of nilaiWawancaraList) {
        const peserta = await PesertaWawancara.findOne({
          where: { id: nilaiWawancara.idPesertaWawancara },
          attributes: ["jadwal_mulai", "jadwal_selesai", "lokasi"],
        });
        if (
          peserta.lokasi !== lokasi &&
          ((peserta.jadwal_mulai >= jadwal_mulai &&
            peserta.jadwal_mulai <= jadwal_selesai) ||
            (peserta.jadwal_selesai >= jadwal_mulai &&
              peserta.jadwal_selesai <= jadwal_selesai))
        ) {
          return res.status(400).json({
            message: `Pewawancara dengan ID ${pewawancaraId} sudah memiliki jadwal wawancara di lokasi lain pada waktu yang sama`,
          });
        }
      }
      const existingRecord = await NilaiWawancara.findOne({
        where: {
          idPesertaWawancara,
          idUsers: pewawancaraId,
        },
      });
      if (existingRecord) {
        return res.status(400).json({
          message: "Sudah Terdapat Pewawancara yang sama sudah anda inputkan",
        });
      }
    }
    for (const pewawancaraId of idUsers) {
      await NilaiWawancara.create({
        idPesertaWawancara,
        idUsers: pewawancaraId,
        nilai,
        keterangan,
      });
    }
    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Nilai wawancara berhasil dibuat",
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan Saat membuat nilai wawancara:",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const GetWawancaraByIDLaborMobile = async (req, res) => {
  const { idLabor } = req.params;
  try {
    const recruitmentLab = await Recruitment.findAll({
      where: { idLabor },
      attributes: ["id", "nama_recruitment"],
    });
    const result = [];
    for (const recruitment of recruitmentLab) {
      const tahapanId = await Tahapan.findAll({
        where: { idRecruitment: recruitment.id, jenis_tahapan: "Wawancara" },
        attributes: ["id"],
      });
      if (!tahapanId || tahapanId.length === 0) {
        continue;
      }
      const pendaftar = [];
      for (const tahapan of tahapanId) {
        const wawancaraList = await Wawancara.findOne({
          where: { idTahapan: tahapan.id },
        });
        console.log(wawancaraList);
        if (!wawancaraList) {
          continue;
        }
        pendaftar.push({
          id: wawancaraList.id,
          nama_wawancara: wawancaraList.nama_wawancara,
        });
      }
      result.push({
        idRecruitment: recruitment.id,
        nama_recruitment: recruitment.nama_recruitment,
        wawancara: pendaftar,
      });
    }
    console.log(JSON.stringify(result));
    return res.status(200).json({ code: 200, status: "success", data: result });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat mengambil list wawancara:",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const GetListPesertaWawancaraByIDMobile = async (req, res) => {
  const { id } = req.params;
  try {
    const pesertaWawancara = await PesertaWawancara.findAll({
      where: { idWawancara: id },
    });
    const payload = [];
    for (const peserta of pesertaWawancara) {
      const pendaftar = await Pendaftar.findByPk(peserta.idPendaftar);
      if (pendaftar) {
        const user = await User.findOne({ where: { id: pendaftar.idUsers } });
        const akunUser = await Akun.findOne({ where: { id: user.idAkun } });
        const pewawancaraData = await NilaiWawancara.findAll({
          where: { idPesertaWawancara: peserta.id },
        });
        const pewawancara = await Promise.all(
          pewawancaraData.map(async (nilai) => {
            const pewawancaraUser = await User.findOne({
              where: { id: nilai.idUsers },
            });
            const akunPewawancara = await Akun.findOne({
              where: { id: pewawancaraUser.idAkun },
            });
            return {
              id: nilai.id,
              idUsers: nilai.idUsers,
              nama_pewawancara: akunPewawancara.nama,
              nilai: nilai.nilai,
              keterangan: nilai.keterangan,
            };
          })
        );
        const { createdAt, updatedAt, ...pesertaData } = peserta.toJSON();
        pesertaData.nama = akunUser ? akunUser.nama : null;
        pesertaData.pewawancara = pewawancara;
        payload.push(pesertaData);
      }
    }
    console.log(JSON.stringify(payload));

    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat mengambil list wawancara:",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const GetNilaiWawancaraByID = async (req, res) => {
  const { id } = req.params;
  try {
    const NilaiWawancaraPeserta = await NilaiWawancara.findOne({
      where: { id },
    });
    return res.status(200).json({ code: 200, data: NilaiWawancaraPeserta });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat mengambil Nilai Wawancara",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const UpdateNilaiWawancaraPeserta = async (req, res) => {
  const {
    id,
    nilai_komitmen,
    nilai_sikap,
    nilai_percaya_diri,
    nilai_motivasi,
    nilai_problem_solving,
    nilai_kemampuan_berbicara,
    keterangan,
  } = req.body;
  try {
    const CariNilaiWawancara = await NilaiWawancara.findOne({ where: { id } });
    const change = Number(nilai_komitmen);
    if (change > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    const change1 = Number(nilai_sikap);
    if (change1 > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change1 < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    const change2 = Number(nilai_percaya_diri);
    if (change2 > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change2 < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    const change3 = Number(nilai_motivasi);
    if (change3 > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change3 < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    const change4 = Number(nilai_problem_solving);
    if (change4 > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change4 < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    const change5 = Number(nilai_kemampuan_berbicara);
    if (change5 > 100) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Lebih Dari 100" });
    }
    if (change5 < 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Nilai Tidak Boleh Kurang Dari 0" });
    }
    CariNilaiWawancara.nilai_komitmen = change;
    CariNilaiWawancara.nilai_sikap = change1;
    CariNilaiWawancara.nilai_percaya_diri = change2;
    CariNilaiWawancara.nilai_motivasi = change3;
    CariNilaiWawancara.nilai_problem_solving = change4;
    CariNilaiWawancara.nilai_kemampuan_berbicara = change5;
    CariNilaiWawancara.keterangan = keterangan;
    await CariNilaiWawancara.save();

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Memperbarui Nilai Peserta Wawancara",
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat Mengupdate Nilai Wawancara",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const GetWawancaraTimeByNIM = async (req, res) => {
  const { nim } = req.params;
  try {
    const userbynim = await Akun.findOne({ where: { nim } });
    if (!userbynim) {
      return res
        .status(404)
        .json({ code: 404, status: "error", message: "User tidak ditemukan" });
    }
    const akunUser = await User.findOne({ where: { idAkun: userbynim.id } });
    const pendaftarList = await Pendaftar.findAll({
      where: { idUsers: akunUser.id },
    });
    const wawancaraPromises = pendaftarList.map(async (pendaftar) => {
      const pesertaWawancaraList = await PesertaWawancara.findAll({
        where: { idPendaftar: pendaftar.id },
      });
      const tahapanPromises = pesertaWawancaraList.map(
        async (pesertaWawancara) => {
          const wawancara = await Wawancara.findOne({
            where: { id: pesertaWawancara.idWawancara },
          });
          if (wawancara) {
            const tahapan = await Tahapan.findOne({
              where: { id: wawancara.idTahapan },
            });
            if (tahapan) {
              const recruitment = await Recruitment.findOne({
                where: { id: tahapan.idRecruitment },
              });
              return {
                id: pesertaWawancara.id,
                lokasi: pesertaWawancara.lokasi,
                jadwal_mulai: pesertaWawancara.jadwal_mulai,
                jadwal_selesai: pesertaWawancara.jadwal_selesai,
                status_pengajuan: pesertaWawancara.status_pengajuan,
                asalan_pengajuan: pesertaWawancara.asalan_pengajuan,
                metode_wawancara: pesertaWawancara.metode_wawancara,
                jamPengajuan: wawancara.tanggal_terakhir_pengajuan,
                idTahapan: tahapan.id,
                idRecruitment: tahapan.idRecruitment,
                nama_recruitment: recruitment
                  ? recruitment.nama_recruitment
                  : null,
              };
            }
          }
        }
      );
      return Promise.all(tahapanPromises);
    });
    const wawancaraData = await Promise.all(wawancaraPromises);
    return res.status(200).json({
      code: 200,
      status: "success",
      data: wawancaraData.flat().filter((item) => item !== undefined),
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat Mengambil Jadwal Wawancara",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const KirimPengajuanWawancara = async (req, res) => {
  const { id, alasan, status } = req.body;
  try {
    const pesertawawancara = await PesertaWawancara.findOne({ where: { id } });
    pesertawawancara.status_pengajuan = status;
    pesertawawancara.asalan_pengajuan = alasan;
    await pesertawawancara.save();
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Konfirmasi Jadwal Wawancara Dikirim",
    });
  } catch (error) {
    console.error(
      "Terjadi Kesalahan saat Memperbarui Jadwal Wawancara",
      error.message
    );
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};
