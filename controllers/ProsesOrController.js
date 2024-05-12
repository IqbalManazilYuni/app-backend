import Recruitment from "../models/Model_Recruitment/Recruitment.js";

export const CreateProsesOr = async(req,res)=>{
    const { idLabor, limitPeserta, tahun, status, nama_proses } = req.body;
    try {
        const newProses = await Recruitment.create({
            idLabor: idLabor,
            limitPeserta:limitPeserta,
            tahun:tahun,
            status:status,
            nama_proses:nama_proses
        })
        return res.status(201).json({ message: "Proses Or berhasil didaftarkan.", data: newProses });
    } catch (error) {
        console.error("Error saat mendaftarkan Proses Or:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan Proses Or." });
    }
};

export const GetProsesOrByLabor = async(req, res)=>{
    const { idLabor } = req.body;
    try {
        const proses = await Recruitment.findOne({ where: { idLabor: idLabor} });
        if(!proses){
            return res.status(404).json({ status:"Not Found", code: 404, message:"Proses Labor Not Found"});
        }
        return res.status(200).json({ status:"OK", code:200, message:"Labor Proses Or Found", data:{proses}});
    } catch (error) {
        return res.status(500).json({ status:"Error", code:500, message:"Error Pada Menggambil Labor Proses Or", error});
    }
}