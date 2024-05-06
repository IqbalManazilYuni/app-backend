import BankSoalEssay from "./BankSoalEssayModels.js";
import BankSoal from "./BankSoalModels.js";
import BankSoalMultiple from "./BankSoalMultiple.js";
import DetailPeriode from "./DetailPeriodeModels.js";
import DetailPesertaOr from "./DetailPesertaOrModels.js";
import Jabatan from "./JabatanModels.js";
import Jawaban from "./JawabanModels.js";
import Labor from "./LaborModels.js";
import Module from "./ModuleModels.js";
import NilaiPesertaWawancara from "./NilaiPesertaWawancaraModels.js";
import Pengguna from "./PenggunaModels.js";
import Periode from "./PeriodeModels.js";
import PesertaUjian from "./PesertaUjianModels.js";
import Pewawancara from "./PewawancaraModels.js";
import ProsesOr from "./ProsesOrModule.js";
import SoalUjian from "./SoalUjianModels.js";
import Tahapan from "./TahapanModels.js";
import Ujian from "./Ujian.js";
import Wawancara from "./WawancaraModels.js";
import PesertaWawancara from "./pesertaWawancaraModels.js";

export const setupRelations = () => {
    //relasi pengguna ke labor
    Pengguna.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(Pengguna, { foreignKey: 'idLabor' });

    //relasi jabatan ke labor
    Jabatan.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(Jabatan, { foreignKey: 'idLabor' });

    //relasi periode ke labor
    Periode.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(Periode, { foreignKey: 'idLabor' });

    //relasi module ke labor
    Module.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(Module, { foreignKey: 'idLabor' });

    //relasi proses_or ke labor
    ProsesOr.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(ProsesOr, { foreignKey: 'idLabor' });

    //relasi bank-soal ke labor
    BankSoal.belongsTo(Labor, { foreignKey: 'idLabor' });
    Labor.hasMany(BankSoal, { foreignKey: 'idLabor' });

    // setup relasi Detail Periode
    setupRelationsDetailPeriode();
};

export const setupRelationsDetailPeriode = () => {
    //relasi Detail Periode ke periode, jabatan, pengguna
    DetailPeriode.belongsTo(Periode, { foreignKey: 'idPeriode' });
    DetailPeriode.belongsTo(Pengguna, { foreignKey: 'idPengguna' });
    DetailPeriode.belongsTo(Jabatan, { foreignKey: 'idJabatan' });

    Periode.hasMany(DetailPeriode, { foreignKey: 'idPeriode' });
    Pengguna.hasMany(DetailPeriode, { foreignKey: 'idPengguna' });
    Jabatan.hasMany(DetailPeriode, { foreignKey: 'idJabatan' });
};

export const setupRelationshipsTahapan = () => {

    ProsesOr.hasMany(Tahapan, { foreignKey: 'idProsesOr' });
    Tahapan.belongsTo(ProsesOr, { foreignKey: 'idProsesOr' });

    ProsesOr.hasMany(DetailPesertaOr, { foreignKey: 'idProsesOr' });
    DetailPesertaOr.belongsTo(ProsesOr, { foreignKey: 'idProsesOr' });
}

export const setupRelationshipsTahapanDetail = () => {

    Tahapan.hasMany(Wawancara, { foreignKey: 'idTahapan' });
    Wawancara.belongsTo(Tahapan, { foreignKey: 'idTahapan' });

    Tahapan.hasMany(Ujian, { foreignKey: 'idTahapan' });
    Ujian.belongsTo(Tahapan, { foreignKey: 'idTahapan' });
}

export const setupRelationshipsPengguna = () => {

    Pengguna.hasMany(DetailPesertaOr, { foreignKey: 'idPengguna' });
    DetailPesertaOr.belongsTo(Pengguna, { foreignKey: 'idPengguna' });

    Pengguna.hasMany(PesertaUjian, { foreignKey: 'idPengguna' });
    PesertaUjian.belongsTo(Pengguna, { foreignKey: 'idPengguna' });

    Pengguna.hasMany(PesertaWawancara, { foreignKey: 'idPengguna' });
    PesertaWawancara.belongsTo(Pengguna, { foreignKey: 'idPengguna' });
}

export const setupRelasiWawancara = ()=>{

    Wawancara.hasMany(PesertaWawancara,{foreignKey:'idWawancara'})
    PesertaWawancara.belongsTo(Wawancara, { foreignKey:'idWawancara'});

    Wawancara.hasMany(Pewawancara,{foreignKey:'idWawancara'});
    Pewawancara.belongsTo(Wawancara, { foreignKey: 'idWawancara'});
}

export const setupDetailNilaiWawancara = () =>{
    Pewawancara.hasMany(NilaiPesertaWawancara, {foreignKey: 'idPewawancara'});
    NilaiPesertaWawancara.belongsTo(Pewawancara, {foreignKey: 'idPewawancara'});

    PesertaWawancara.hasMany(NilaiPesertaWawancara, {foreignKey:'idPesertaWawancara'});
    NilaiPesertaWawancara.belongsTo(PesertaWawancara,{ foreignKey:'idPesertaWawancara'});

}

export const setupUjianRelasi = () =>{
    Ujian.hasMany(PesertaUjian, {foreignKey:'idUjian'});
    PesertaUjian.belongsTo(Ujian, {foreignKey:'idUjian'});

    Ujian.hasMany(SoalUjian, {foreignKey:'idUjian'});
    SoalUjian.belongsTo(Ujian, {foreignKey:'idUjian'});

}

export const setupRelasibankSoal = () =>{
    BankSoal.hasOne(BankSoalEssay, {foreignKey:'id'});
    BankSoalEssay.belongsTo(BankSoal, {foreignKey:'id'});

    BankSoal.hasOne(BankSoalMultiple, {foreignKey:'id'});
    BankSoalMultiple.belongsTo(BankSoal, {foreignKey:'id'});

    BankSoal.hasMany(SoalUjian, {foreignKey:'idSoal'});
    SoalUjian.belongsTo(BankSoal, {foreignKey:'idSoal'});

}

export const relasiJawaban = () =>{
    PesertaUjian.hasMany(Jawaban,{foreignKey:'idPesertaUjian'});
    Jawaban.belongsTo(PesertaUjian, { foreignKey: 'idPesertaUjian'});

    SoalUjian.hasMany(Jawaban, {foreignKey:'idSoalUjian'});
    Jawaban.belongsTo(SoalUjian, {foreignKey:'idSoalUjian'})
}