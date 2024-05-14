import DetailKepengurusan from "./Model_Kepengurusan/DetailKepengurusan.js";
import Divisi from "./Model_Kepengurusan/Divisi.js";
import Kepengurusan from "./Model_Kepengurusan/Kepengurusan.js";
import Labor from "./Model_Kepengurusan/Labor.js"
import Modul from "./Model_Modul/Modul.js";
import RiwayatPembaca from "./Model_Modul/RiwayatPembaca.js";
import JawabanUjian from "./Model_Recruitment/JawabanUjian.js";
import Kegiatan from "./Model_Recruitment/Kegiatan.js";
import NilaiWawancara from "./Model_Recruitment/NilaiWawancara.js";
import Pendaftar from "./Model_Recruitment/Pendaftar.js";
import PesertaUjian from "./Model_Recruitment/PesertaUjian.js";
import PesertaWawancara from "./Model_Recruitment/PesertaWawancara.js";
import Pewawancara from "./Model_Recruitment/Pewawancara.js";
import Recruitment from "./Model_Recruitment/Recruitment.js";
import SoalUjian from "./Model_Recruitment/SoalUjian.js";
import Tahapan from "./Model_Recruitment/Tahapan.js";
import Ujian from "./Model_Recruitment/Ujian.js";
import Wawancara from "./Model_Recruitment/Wawancara.js";
import BankSoal from "./Model_Soal/BankSoal.js";
import SoalEssay from "./Model_Soal/SoalEssay.js";
import SoalMultiple from "./Model_Soal/SoalMultple.js";
import User from "./Model_User/Users.js"

export const RelasiLabor = async () =>{

    Labor.hasMany(User,{foreignKey:"idLabor"});
    User.belongsTo(Labor, {foreignKey:"idLabor"});

    Labor.hasMany(Kepengurusan, { foreignKey:"idLabor"});
    Kepengurusan.belongsTo(Labor, { foreignKey:"idLabor"});

    Labor.hasMany(Divisi, { foreignKey:"idLabor"});
    Divisi.belongsTo(Labor, { foreignKey:"idLabor"});

    Labor.hasMany(BankSoal, { foreignKey:"idLabor"});
    BankSoal.belongsTo(Labor, {foreignKey:"idLabor"});

    Labor.hasMany(Modul, {foreignKey:"idLabor"});
    Modul.belongsTo(Labor, {foreignKey:"idLabor"});

}

export const RelasiUser = async ()=>{
    User.hasMany(RiwayatPembaca, {foreignKey:"idUsers"});
    RiwayatPembaca.belongsTo(User, { foreignKey:"idUsers"});

    User.hasMany(DetailKepengurusan, {foreignKey:"idUsers"});
    DetailKepengurusan.belongsTo(User, { foreignKey:"idUsers"});

    User.hasMany(Pendaftar, {foreignKey:"idUsers"});
    Pendaftar.belongsTo(User, { foreignKey:"idUsers"});

}

export const RelasiModul = async ()=>{
    Modul.hasMany(RiwayatPembaca, {foreignKey:"idModul"});
    RiwayatPembaca.belongsTo(Modul, { foreignKey: "idModul"});
}

export const RelasiKepengurusan = async ()=>{
    Kepengurusan.hasMany(DetailKepengurusan, {foreignKey:"idKepengurusan"});
    DetailKepengurusan.belongsTo(Kepengurusan, { foreignKey:"idKepengurusan"});
    
    Kepengurusan.hasOne(Recruitment, { foreignKey:"idKepengurusan"});
    Recruitment.belongsTo(Kepengurusan, { foreignKey:"idKepengurusan"});


}

export const RelasiDivisi = async ()=>{
    Divisi.hasMany(DetailKepengurusan, { foreignKey : "idDivisi"});
    DetailKepengurusan.belongsTo(Divisi, { foreignKey : "idDivisi"});
}
export const RelasiKegiatan = async ()=>{
    Kegiatan.hasMany(Recruitment, { foreignKey : "idKegiatan"});
    Recruitment.belongsTo(Kegiatan, { foreignKey: "idKegiatan"});

    Kegiatan.hasMany(Pendaftar, { foreignKey: "idKegiatan"});
    Pendaftar.belongsTo(Kegiatan, { foreignKey: "idKegiatan"});
}
export const RelasiRecruitment = async ()=>{
    Recruitment.hasMany(Pendaftar, { foreignKey : "idRecruitment"});
    Pendaftar.belongsTo(Recruitment, { foreignKey : "idRecruitment"});

    Recruitment.hasMany(Tahapan, { foreignKey:"idRecruitment"});
    Tahapan.belongsTo(Recruitment, {foreignKey:"idRecruitment"});
}

export const RelasiPendaftar = async ()=>{
    Pendaftar.hasMany(PesertaUjian, {foreignKey:"idPendaftar"});
    PesertaUjian.belongsTo(Pendaftar, {foreignKey:"idPendaftar"});

    Pendaftar.hasMany(PesertaWawancara, { foreignKey : "idPendaftar"});
    PesertaWawancara.belongsTo(Pendaftar, {foreignKey :"idPendaftar"});

}

export const RelasiTahapan = async ()=>{
    Tahapan.hasOne(Wawancara, {foreignKey:"idTahapan"});
    Wawancara.belongsTo(Tahapan, { foreignKey:"idTahapan"});

    Tahapan.hasOne(Ujian, { foreignKey:"idTahapan"});
    Ujian.belongsTo(Tahapan,{ foreignKey : "idTahapan"});
}

export const RelasiWawancara = async ()=>{
    Wawancara.hasMany(PesertaWawancara, { foreignKey:"idWawancara"})
    PesertaWawancara.belongsTo(Wawancara, {foreignKey:"idWawancara"});
}

export const RelasiBankSoal = async ()=>{
    BankSoal.hasOne(SoalEssay, { foreignKey:"idBankSoal"});
    SoalEssay.belongsTo(BankSoal,{ foreignKey: "idBankSoal"});

    BankSoal.hasOne(SoalMultiple, { foreignKey: "idBankSoal"});
    SoalMultiple.belongsTo(BankSoal,{ foreignKey: "idBankSoal"});

    BankSoal.hasMany(SoalUjian, { foreignKey:"idSoal"});
    SoalUjian.belongsTo(BankSoal,{ foreignKey: "idSoal"});
}

export const RelasiUjian = async ()=>{
    Ujian.hasMany(SoalUjian, { foreignKey:"idUjian"});
    SoalUjian.belongsTo(Ujian,{ foreignKey:"idUjian"});

    Ujian.hasMany(PesertaUjian, { foreignKey:"idUjian"});
    PesertaUjian.belongsTo(Ujian,{ foreignKey:"idUjian"});
}

export const RelasiPesertaWawancara = async ()=>{
    PesertaWawancara.hasMany(NilaiWawancara, { foreignKey:"idPesertaWawancara"});
    NilaiWawancara.belongsTo(PesertaWawancara,{ foreignKey:"idPesertaWawancara"});
}

export const RelasiPewawancara = async()=>{
    Pewawancara.hasMany(NilaiWawancara, { foreignKey:"idPewawancara"});
    NilaiWawancara.belongsTo(Pewawancara,{ foreignKey:"idPewawancara"});
}

export const RelasiPesertaUjian = async ()=>{
    PesertaUjian.hasMany(JawabanUjian, {foreignKey:"idPesertaUjian"});
    JawabanUjian.belongsTo(PesertaUjian, { foreignKey:"idPesertaUjian"});

    SoalUjian.hasMany(JawabanUjian, { foreignKey: "idSoalUjian"});
    JawabanUjian.belongsTo(SoalUjian,  { foreignKey : "idSoalUjian"});
}
