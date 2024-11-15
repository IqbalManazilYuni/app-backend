import { where } from "sequelize";
import Recruitment from "../models/Model_Recruitment/Recruitment.js";
import Tahapan from "../models/Model_Recruitment/Tahapan.js";
import Ujian from "../models/Model_Recruitment/Ujian.js";
import Wawancara from "../models/Model_Recruitment/Wawancara.js";

export const CreateTahapan = async (req, res) => {
  const { idRecruitment, nama_tahapan, jenis_tahapan } = req.body;
  if (jenis_tahapan === "Wawancara") {
    const { nama_wawancara, tanggal_terakhir_pengajuan, durasi_persesi } =
      req.body;
    try {
      const tahapan = await Tahapan.create({
        idRecruitment,
        nama_tahapan,
        jenis_tahapan,
      });
      await Wawancara.create({
        idTahapan: tahapan.id,
        nama_wawancara: nama_wawancara,
        tanggal_terakhir_pengajuan: tanggal_terakhir_pengajuan,
        durasi_persesi: durasi_persesi,
      });
      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Berhasil Menambahkan Tahapan",
      });
    } catch (error) {
      console.error("Error saat proses login:", error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Terjadi kesalahan saat proses menambah tahapan.",
      });
    }
  } else if (jenis_tahapan === "Ujian") {
    const {
      nama_ujian,
      kode_ujian,
      jadwal_mulai,
      jadwal_selesai,
    } = req.body;
    try {
      const getWaktuRecruitment = await Recruitment.findOne({
        where: {
          id: idRecruitment,
        },
      });
      const tanggalTutup = new Date(getWaktuRecruitment.tanggal_tutup);
      const mulai = new Date(jadwal_mulai);
      const selesai = new Date(jadwal_selesai);
      const tanggal = new Date(mulai);
      tanggal.setDate(mulai.getDate() - 1);
      if (mulai < tanggalTutup) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Jadwal Mulai Invalid",
        });
      }
      if (selesai <= mulai) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Jadwal Selesai Invalid",
        });
      }
      const tahapan = await Tahapan.create({
        idRecruitment,
        nama_tahapan,
        jenis_tahapan,
      });
      await Ujian.create({
        idTahapan: tahapan.id,
        tanggal_terakhir_pengajuan: tanggal,
        nama_ujian,
        kode_ujian,
        jadwal_mulai,
        jadwal_selesai,
      });
      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Berhasil Menambahkan Tahapan",
      });
    } catch (error) {
      console.error("Error saat proses login:", error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Terjadi kesalahan saat proses menambah tahapan.",
      });
    }
  }
};

export const GetTahapanByID = async (req, res) => {
  const { id } = req.params;
  try {
    const tahapan = await Tahapan.findOne({ where: { id } });
    if (tahapan.jenis_tahapan === "Wawancara") {
      const wawancara = await Wawancara.findOne({ where: { idTahapan: id } });
      const payload = {
        idRecruitment: tahapan.idRecruitment,
        nama_tahapan: tahapan.nama_tahapan,
        jenis_tahapan: tahapan.jenis_tahapan,
        nama_wawancara: wawancara.nama_wawancara,
        durasi_persesi: wawancara.durasi_persesi,
        tanggal_terakhir_pengajuan: new Date(
          wawancara.tanggal_terakhir_pengajuan
        ).toLocaleString(),
      };
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tahapan Ditemukan",
        data: payload,
      });
    } else if (tahapan.jenis_tahapan === "Ujian") {
      const ujian = await Ujian.findOne({ where: { idTahapan: id } });

      const jadwalmulai = new Date(ujian.jadwal_mulai).toLocaleString();
      const jadwalselesai = new Date(ujian.jadwal_selesai).toLocaleString();

      const payload = {
        idRecruitment: tahapan.idRecruitment,
        nama_tahapan: tahapan.nama_tahapan,
        jenis_tahapan: tahapan.jenis_tahapan,
        nama_ujian: ujian.nama_ujian,
        jadwal_mulai: jadwalmulai,
        jadwal_selesai: jadwalselesai,
        kode_ujian: ujian.kode_ujian,
        status: ujian.status,
        tanggal_terakhir_pengajuan: new Date(
          ujian.tanggal_terakhir_pengajuan
        ).toLocaleString(),
      };
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tahapan Ditemukan",
        data: payload,
      });
    }
  } catch (error) {
    console.error("Error saat proses login:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil tahapan.",
    });
  }
};

export const EditTahapan = async (req, res) => {
  const { id, nama_tahapan, jenis_tahapan } = req.body;
  if (jenis_tahapan === "Wawancara") {
    const { nama_wawancara, tanggal_terakhir_pengajuan, durasi_persesi } =
      req.body;
    try {
      const tahapan = await Tahapan.findOne({ where: { id } });
      const wawancara = await Wawancara.findOne({ where: { idTahapan: id } });
      wawancara.nama_wawancara = nama_wawancara;
      wawancara.tanggal_terakhir_pengajuan = tanggal_terakhir_pengajuan;
      tahapan.nama_tahapan = nama_tahapan;
      tahapan.jenis_tahapan = jenis_tahapan;
      wawancara.durasi_persesi = durasi_persesi;
      await wawancara.save();
      await tahapan.save();
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tahapan Berhasil Diperbarui",
      });
    } catch (error) {
      console.error("Error saat proses update tahapan:", error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Terjadi kesalahan saat proses memperabui tahapan.",
      });
    }
  } else if (jenis_tahapan === "Ujian") {
    const {
      nama_ujian,
      kode_ujian,
      jadwal_mulai,
      jadwal_selesai,
      status,
      idRecruitment,
      // tanggal_terakhir_pengajuan,
    } = req.body;
    try {
      const tahapan = await Tahapan.findOne({ where: { id } });
      const ujian = await Ujian.findOne({ where: { idTahapan: id } });
      const mulai = new Date(jadwal_mulai);
      const tanggal = new Date(mulai);
      tanggal.setDate(mulai.getDate() - 1);
      const selesai = new Date(jadwal_selesai);
      const getWaktuRecruitment = await Recruitment.findOne({
        where: {
          id: idRecruitment,
        },
      });
      const tanggalTutup = new Date(getWaktuRecruitment.tanggal_tutup);
      if (mulai < tanggalTutup) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Jadwal Mulai Invalid",
        });
      }
      if (selesai <= mulai) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Jadwal Selesai Invalid",
        });
      }

      ujian.nama_ujian = nama_ujian;
      ujian.kode_ujian = kode_ujian;
      ujian.jadwal_mulai = jadwal_mulai;
      ujian.jadwal_selesai = jadwal_selesai;
      ujian.status = status;
      tahapan.nama_tahapan = nama_tahapan;
      tahapan.jenis_tahapan = jenis_tahapan;
      ujian.tanggal_terakhir_pengajuan = tanggal;
      await ujian.save();
      await tahapan.save();
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tahapan Berhasil Diperbarui",
      });
    } catch (error) {
      console.error("Error saat proses update tahapan:", error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Terjadi kesalahan saat proses memperabui tahapan.",
      });
    }
  }
};

export const GetTahapanByIDRecruitment = async (req, res) => {
  const { idRecruitment } = req.params;
  try {
    const tahapan = await Tahapan.findAll({ where: { idRecruitment } });
    if (!tahapan) {
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Tidak Terdapat Tahapan",
      });
    }
    const payload = [];
    for (const tahapans of tahapan) {
      const payloads = tahapans.toJSON();
      payload.push(payloads);
    }
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Tahapan Ditemukan",
      data: payload,
    });
  } catch (error) {
    console.error("Error saat proses login:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat proses mengambil tahapan.",
    });
  }
};

export const DeleteTahapan = async (req, res) => {
  const { id } = req.params;
  try {
    const tahapan = await Tahapan.findOne({ where: { id } });
    await tahapan.destroy();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Tahapan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error saat menghapus tahapan berdasarkan id:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat memproses permintaan.",
    });
  }
};
