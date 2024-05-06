import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Pengguna from '../models/PenggunaModels.js';
import Labor from '../models/LaborModels.js';

export const RegisterUser = async (req, res) => {
    const {
        nama,
        nim,
        nomor_asisten,
        password,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        AksesRole,
        status,
        file_path,
        nama_file,
    } = req.body;
    try {
        const existingUser = await Pengguna.findOne({ where: { nim } });
        if (existingUser) {
            return res.status(400).json({ message: "Pengguna dengan NIM tersebut sudah terdaftar." });
        }
        const hashedPassword = await argon2.hash(password);
        await Pengguna.create({
            nama,
            nim,
            nomor_asisten,
            password: hashedPassword,
            status,
            idLabor,
            jenisPengguna,
            nomor_hp,
            tempat_lahir,
            tanggal_lahir,
            JenisKelamin,
            alamat,
            AksesRole,
            file_path,
            nama_file,
        });

        return res.status(201).json({ message: "Pengguna berhasil didaftarkan." });
    } catch (error) {
        console.error("Error saat mendaftarkan pengguna:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pengguna." });
    }
};

// export const GetAllUsers = async (req, res) => {
//     try {
//         const allUsers = await Pengguna.findAll();
//         if (!allUsers || allUsers.length === 0) {
//             return res.status(404).json({ status: "error", code: 404, message: "Tidak ada pengguna yang ditemukan." });
//         }
//         return res.status(200).json(allUsers);
//     } catch (error) {
//         console.error("Error saat mendapatkan semua pengguna:", error);
//         return res.status(500).json({ status: "error", code: 500, message: "Terjadi kesalahan saat mendapatkan semua pengguna." });
//     }
// };

// const decryptToken = (encryptedToken, secretKey) => {
//     try {
//         const key = Buffer.alloc(32);
//         const providedKeyBuffer = Buffer.from(secretKey, 'utf8');
//         providedKeyBuffer.copy(key, 0, 0, Math.min(providedKeyBuffer.length, key.length));
//         const iv = Buffer.from(encryptedToken.slice(0, 32), 'hex');
//         const encryptedText = encryptedToken.slice(32);
//         const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//         let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//         decrypted += decipher.final('utf8');
//         return decrypted;
//     } catch (error) {
//         console.error("Error saat mendekripsi token:", error);
//         throw new Error("Gagal mendekripsi token");
//     }
// };

// export const GetUserByToken = async (req, res) => {
//     const { token } = req.body;
//     try {
//         const decryptedToken = decryptToken(token, 'encryption_secret_key');
//         const decoded = jwt.verify(decryptedToken, 'secret_key');
//         const user = await Pengguna.findOne({ where: { nim: decoded.nim } });
//         if (!user) {
//             return res.status(404).json({ message: "Pengguna tidak ditemukan." });
//         }
//         return res.status(200).json({ user });
//     } catch (error) {
//         console.error("Error saat mengambil pengguna berdasarkan token:", error);
//         return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
//     }
// };
const encryptToken = (token, secretKey) => {
    const key = Buffer.alloc(32);
    const providedKeyBuffer = Buffer.from(secretKey, 'utf8');
    providedKeyBuffer.copy(key, 0, 0, Math.min(providedKeyBuffer.length, key.length));
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
};

export const LoginUser = async (req, res) => {
    const { nim, password } = req.body;

    try {
        const user = await Pengguna.findOne({ where: { nim } });

        if (!user) {
            return res.status(404).json({ message: "Pengguna dengan NIM tersebut tidak terdaftar." });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login gagal. Cek kembali NIM dan password Anda." });
        }
        const jwtoken = jwt.sign({ nim: user.nim }, 'secret_key', { expiresIn: '1h' });
        const encryptedToken = encryptToken(jwtoken, 'encryption_secret_key');

        return res.status(200).json({ message: "Login berhasil.", token: encryptedToken });
    } catch (error) {
        console.error("Error saat proses login:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat proses login." });
    }
};



// export const GetUsersByPengguna = async (req, res) => {
//   const { jenis_pengguna } = req.body;

//   if (!jenis_pengguna) {
//     return res.status(400).json({ message: "Role parameter is required." });
//   }

//   try {
//     const pengguna = await Pengguna.findOne({ where: { jenis_pengguna } });

//     if (!pengguna) {
//       return res.status(404).json({ message: "Pengguna not found." });
//     }

//     const users = await Pengguna.findAll({
//       where: { jenisPengguna: pengguna.id },
//       attributes: ['id', 'nim', 'nama', 'nim', 'nomor_asisten', 'nomor_hp', 'jenisPengguna','idLabor', 'roleId','tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'createdAt', 'updatedAt'],
//       include: [{ model: Lab, attributes: ['nama_lab'] }, {  model: Pengguna, attributes:['jenis_pengguna']}, {  model: Role, attributes:['jenis_role']}],
//     });

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "Pengguna with this pengguna not found." });
//     }

//     const formattedUsers = users.map(user => ({
//       ...user.toJSON(),
//       nama_lab: user.Lab ? user.Lab.nama_lab : null,
//       jenis_pengguna: user.Pengguna ? user.Pengguna.jenis_pengguna : null,
//       jenis_role: user.Role ? user.Role.jenis_role : null
//     }));

//     return res.status(200).json(formattedUsers);
//   } catch (error) {
//     console.error("Error fetching users by role", error);
//     return res.status(500).json({ message: "An error occurred while processing the request." });
//   }
// };

// export const GetUserByUUID = async (req, res) => {
//     const { nim } = req.body;
//     if (!nim) {
//         return res.status(400).json({ message: "UUID parameter is required." });
//     }
//     try {
//         const user = await Pengguna.findOne({ 
//             where: { nim },
//             attributes: ['id', 'nim', 'nama', 'nim', 'nomor_asisten', 'jenisPengguna', 'roleId', 'nomor_hp', 'idLabor', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'createdAt', 'updatedAt'],
//             include: [{ model: Lab, attributes: ['nama_lab'] }, {  model: Pengguna, attributes:['jenis_pengguna']}, {  model: Role, attributes:['jenis_role']}],
//         });
//         if (!user) {
//             return res.status(404).json({ message: "Pengguna tidak ditemukan." });
//         }

//         // Format the user object with nama_lab from associated Lab
//         const formattedUser = {
//             id: user.id,
//             nim: user.nim,
//             nama: user.nama,
//             nim: user.nim,
//             nomor_asisten: user.nomor_asisten,
//             jenisPengguna: user.jenisPengguna,
//             nomor_hp: user.nomor_hp,
//             idLabor: user.idLabor,
//             roleId: user.roleId,
//             tempat_lahir: user.tempat_lahir,
//             tanggal_lahir: user.tanggal_lahir,
//             JenisKelamin: user.JenisKelamin,
//             alamat: user.alamat,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt,
//             nama_lab: user.Lab ? user.Lab.nama_lab : null,
//             jenis_pengguna: user.Pengguna ? user.Pengguna.jenis_pengguna : null,
//             jenis_role: user.Role ? user.Role.jenis_role : null,
//         };
//         console.log("Get User By UUID",formattedUser);
//         return res.status(200).json(formattedUser);
//     } catch (error) {
//         console.error("Error saat mengambil pengguna berdasarkan nim:", error);
//         return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
//     }
// };

export const GetUserByNim = async (req, res) => {
    const { nim } = req.body;
    try {
        const user = await Pengguna.findOne({
            where: { nim },
            attributes: ['nama', 'nim', 'status', 'file_path', 'nomor_asisten', 'jenisPengguna', 'nomor_hp', 'idLabor', 'tempat_lahir', 'tanggal_lahir', 'JenisKelamin', 'alamat', 'nama_file'],
        });
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan." });
        }
        const labor = await Labor.findByPk(user.idLabor);
        user.setDataValue('labor', labor);
        const formattedUser = {
            nama: user.nama,
            nim: user.nim,
            nomor_asisten: user.nomor_asisten,
            jenisPengguna: user.jenisPengguna,
            nomor_hp: user.nomor_hp,
            idLabor: user.idLabor,
            status: user.status,
            tempat_lahir: user.tempat_lahir,
            tanggal_lahir: user.tanggal_lahir,
            JenisKelamin: user.JenisKelamin,
            alamat: user.alamat,
            nama_file: user.nama_file,
            file_path: user.file_path,
            nama_Labor: labor ? labor.nama_Labor : null,
        };
        console.log("Hallo", formattedUser)
        return res.status(200).json({ code: 200, status: "success", message: "Data Ditemukan", formattedUser });
    } catch (error) {
        console.error("Error saat mengambil pengguna berdasarkan token:", error);
        return res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
    }
}
export const EditUser = async (req, res) => {
    const {
        nama,
        nim,
        nomor_asisten,
        idLabor,
        jenisPengguna,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        JenisKelamin,
        alamat,
        status,
        file_path,
        nama_file,
    } = req.body;
    try {
        const user = await Pengguna.findOne({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cek apakah nim yang baru ingin diubah sudah ada di tabel Pengguna
        const existingUserWithNim = await Pengguna.findOne({ where: { nim } });
        if (existingUserWithNim && existingUserWithNim.nim !== nim) {
            return res.status(400).json({ message: 'NIM is already in use by another user' });
        }

        user.nama = nama,
            user.nim = nim,
            user.nomor_asisten = nomor_asisten,
            user.password = password ? await argon2.hash(password) : existingUser.password, // hanya hash password baru jika diberikan,
            user.status = status,
            user.idLabor = idLabor,
            user.jenisPengguna = jenisPengguna,
            user.nomor_hp = nomor_hp,
            user.tempat_lahir = tempat_lahir,
            user.tanggal_lahir = tanggal_lahir,
            user.JenisKelamin = JenisKelamin,
            user.alamat = alamat,
            user.file_path = file_path,
            user.nama_file = nama_file,
            await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
}
// export const DeletUser = async (req, res) => {
//     const { nim } = req.body;
//     try {
//         const user = await Pengguna.findOne({ where: { nim: nim } });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.destroy();
//         res.status(200).json({message:"User deleted successfully"});
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// }