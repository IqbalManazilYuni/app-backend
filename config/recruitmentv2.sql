-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 20, 2024 at 05:19 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitmentv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nim` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `AksesRole` enum('User','Admin','Super Admin') NOT NULL DEFAULT 'User',
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `kode_verifikasi` varchar(255) DEFAULT NULL,
  `status_akun` enum('Terverifikasi','Tidak Terverifikasi') DEFAULT NULL,
  `verifikasiToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id`, `nim`, `email`, `AksesRole`, `nama`, `password`, `kode_verifikasi`, `status_akun`, `verifikasiToken`, `createdAt`, `updatedAt`) VALUES
('0e51beed-7580-497a-98bf-4b94ea1f39f6', '123456789', 'icyscrub53@gmail.com', 'Super Admin', 'SuperAdmin', '$argon2id$v=19$m=65536,t=3,p=4$iolFApXFLngWBAkf3WAVJA$4mN+H1nQ/6j8LQziw7e1U8szwV2p5DpNRKXcVPd461Y', NULL, 'Terverifikasi', NULL, '2024-07-18 08:26:32', '2024-07-18 08:26:32'),
('206ff5c1-eb35-44a9-9ef3-2c70789f6bef', '33', 'Nsusjsjw@gmail.com', 'User', 'Hsywhahs', '$argon2id$v=19$m=65536,t=3,p=4$vxNy8ODZbbgOUR0PB1ya3g$pwYlcZjns9S7sRKkrTcmGTS8YQOx14el462Il+EfPnc', NULL, 'Terverifikasi', NULL, '2024-07-18 12:48:22', '2024-07-18 16:24:58'),
('20fc6c9d-136f-4917-8e88-aafcacb07610', '44', 'manazilyuniiqbal@gmail.com', 'User', 'Kemal Muhammad hiero ', '$argon2id$v=19$m=65536,t=3,p=4$heK9WhfM3JHj8xzO0Q8IFg$/5oCTZtSZqI8tW0mXWXk1bHyG0fiu7lzkV1ci5H7EGQ', NULL, 'Terverifikasi', NULL, '2024-07-19 04:57:16', '2024-07-19 04:57:37'),
('7148b61e-9e72-4050-a964-ee8b9b5a152d', '2011522007', 'manazilyuni@gmail.com', 'Admin', 'Iqbal Manazil Yuni ', '$argon2id$v=19$m=65536,t=3,p=4$VaA8vGNQBhtciiFg9uFRXw$bXTwwh24S8pPDj6oWkO6J4A/Vdqo2was8nhiRnwbfRw', NULL, 'Terverifikasi', NULL, '2024-07-18 07:39:03', '2024-07-18 12:20:58'),
('91fe4522-b9d1-4a25-9515-2aeeac52e4bd', '2211522009', 'manazilyuniiqbal2@gmail.com', 'Admin', 'Budi Dermawan ', '$argon2id$v=19$m=65536,t=3,p=4$1hzW56hrePfAXGUR0PMF2Q$hKUTpGD0hIAB0JhxuP16euKYXg2KLQicij96VQg/jzg', NULL, 'Terverifikasi', NULL, '2024-07-18 07:13:14', '2024-07-18 12:22:58');

-- --------------------------------------------------------

--
-- Table structure for table `banksoal`
--

CREATE TABLE `banksoal` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tipe_soal` enum('Essay','Multiple') NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banksoal`
--

INSERT INTO `banksoal` (`id`, `idLabor`, `tipe_soal`, `tahun`, `createdAt`, `updatedAt`) VALUES
('7ede00c6-f685-40c6-bb13-b98851957885', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', 'Essay', '2021', '2024-07-18 17:02:25', '2024-07-18 17:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `detailkepengurusan`
--

CREATE TABLE `detailkepengurusan` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idKepengurusan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idDivisi` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `jabatan` enum('Kepala Divisi','Anggota','Sekretaris','Bendahara','Koordinator Asisten') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detailkepengurusan`
--

INSERT INTO `detailkepengurusan` (`id`, `idKepengurusan`, `idUsers`, `idDivisi`, `jabatan`, `createdAt`, `updatedAt`) VALUES
('343e55fc-6aac-441f-a080-a92a42c70b0d', '46aa96fd-9a0b-4119-9cb0-5a66cf8b6c04', '98fb08ea-c3dd-4165-9dae-c0312a6d496c', NULL, 'Koordinator Asisten', '2024-07-19 12:32:36', '2024-07-19 12:46:20'),
('affbd6fe-14e8-458e-9276-bbb8e4ef0418', '22025433-9f77-4fe9-bc56-dc3b86d5b872', '99712b0d-32ce-47af-b48a-56cb7109ffaf', NULL, 'Koordinator Asisten', '2024-07-19 08:44:52', '2024-07-19 08:44:52');

-- --------------------------------------------------------

--
-- Table structure for table `divisi`
--

CREATE TABLE `divisi` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_divisi` longtext,
  `deskripsi` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `divisi`
--

INSERT INTO `divisi` (`id`, `idLabor`, `nama_divisi`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
('358e9fe3-23b9-4f41-8eef-bb71019920fe', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', 'LITBANG', 'Litbang adalah', '2024-07-19 12:44:38', '2024-07-19 12:44:38'),
('3bd364c7-ade0-42e6-894b-470d0085bc8b', '29dfedde-5889-44e1-9cbc-55fb9f4b84f8', 'HUMAS', 'Humas Adalah', '2024-07-19 08:31:56', '2024-07-19 08:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `jawabanujian`
--

CREATE TABLE `jawabanujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPesertaUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idSoalUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Jawaban` varchar(255) NOT NULL,
  `tipe_soal` varchar(255) NOT NULL,
  `nilai` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_kegiatan` varchar(255) NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `tahun`, `createdAt`, `updatedAt`) VALUES
('c14d0cd7-bcd1-4d48-a3ac-ebf11b750621', 'Open Recruitment DSI ', '2022', '2024-07-18 12:35:09', '2024-07-18 12:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `kepengurusan`
--

CREATE TABLE `kepengurusan` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_kepengurusan` varchar(255) NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `status` enum('aktif','non-aktif') DEFAULT 'non-aktif',
  `generasi_kepengurusan` varchar(255) NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kepengurusan`
--

INSERT INTO `kepengurusan` (`id`, `nama_kepengurusan`, `tahun`, `status`, `generasi_kepengurusan`, `idLabor`, `createdAt`, `updatedAt`) VALUES
('22025433-9f77-4fe9-bc56-dc3b86d5b872', 'Laboratorium Business Intelligence Generasi Kepengurusan Ke 2 Tahun 2021', '2021', 'aktif', '2', '29dfedde-5889-44e1-9cbc-55fb9f4b84f8', '2024-07-19 08:23:38', '2024-07-19 08:23:38'),
('46aa96fd-9a0b-4119-9cb0-5a66cf8b6c04', 'Laboratorium of Enterprise Application Generasi Kepengurusan Ke 3 Tahun 2024', '2024', 'non-aktif', '3', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', '2024-07-19 12:31:17', '2024-07-19 12:31:17');

-- --------------------------------------------------------

--
-- Table structure for table `labor`
--

CREATE TABLE `labor` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_Labor` varchar(255) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `logo` longtext,
  `nama_pembina` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `labor`
--

INSERT INTO `labor` (`id`, `nama_Labor`, `deskripsi`, `logo`, `nama_pembina`, `createdAt`, `updatedAt`) VALUES
('29dfedde-5889-44e1-9cbc-55fb9f4b84f8', 'Laboratorium Business Intelligence', 'Laboratorium Business Intelligence merupakan salah satu laboratorium riset yang ada di Departemen Sistem Informasi Fakultas Teknologi Informasi Universitas Andalas. Laboratorium ini memiliki fokus bidang penelitian di bidang Bussiness Intelligence, Data Mining, dan Machine Learning', NULL, 'Dwi Welly Sukma Nirad, S.Kom., M.T.', '2024-07-18 12:22:17', '2024-07-18 12:22:17'),
('ff5d2c22-44d2-11ef-9689-5405db08f5fa', 'Laboratorium of Enterprise Application', 'Laboratorium of Enterprise Application (LEA) adalah salah satu labor yang ada pada jurusan Sistem Informasi Universtas Andalas (Unand) yang bergerak dalam bidang penelitian dan penggunaan teknologi dan layanan sistem informasi pada organisasi atau perusahaan.', 'logolea.png', 'Adi Arga Arifnur, S.Kom., M.Kom', '2024-07-18 06:56:51', '2024-07-20 04:51:27');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idAkun` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nomor_asisten` varchar(255) DEFAULT NULL,
  `angkatan` varchar(255) DEFAULT NULL,
  `jenisPengguna` enum('Asisten','Calon Asisten','Ex-Asisten') DEFAULT NULL,
  `status` enum('Pendaftar','Tahapan1','Tahapan2','Gagal','Lulus') DEFAULT 'Pendaftar',
  `nama_file` text,
  `nomor_hp` varchar(255) DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tanggal_lahir` varchar(255) DEFAULT NULL,
  `JenisKelamin` enum('Pria','Wanita') DEFAULT NULL,
  `alamat` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `idAkun`, `idLabor`, `nomor_asisten`, `angkatan`, `jenisPengguna`, `status`, `nama_file`, `nomor_hp`, `tempat_lahir`, `tanggal_lahir`, `JenisKelamin`, `alamat`, `createdAt`, `updatedAt`) VALUES
('32575ca5-61f0-4604-95a1-a803d4f7821b', '20fc6c9d-136f-4917-8e88-aafcacb07610', '29dfedde-5889-44e1-9cbc-55fb9f4b84f8', '', '2022', 'Calon Asisten', 'Tahapan1', 'Buku_DIBI_2022.pdf', '05454649', 'Bauausus', '2024-07-19 00:00:00', 'Pria', 'Jauejdjd', '2024-07-19 04:57:16', '2024-07-19 06:33:55'),
('98fb08ea-c3dd-4165-9dae-c0312a6d496c', '7148b61e-9e72-4050-a964-ee8b9b5a152d', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', 'LEA.SI.05', '2020', 'Asisten', 'Lulus', '12. BAB I.pdf', '081270403357', 'Jsisjsns', '2024-07-18 00:00:00', 'Pria', 'Jsiaiaja', '2024-07-18 07:39:03', '2024-07-19 12:48:04'),
('99712b0d-32ce-47af-b48a-56cb7109ffaf', '91fe4522-b9d1-4a25-9515-2aeeac52e4bd', '29dfedde-5889-44e1-9cbc-55fb9f4b84f8', 'LBI_V_03_SI', '2022', 'Asisten', 'Lulus', NULL, '045246194', 'Vsuauajja', '2024-07-18 00:00:00', 'Pria', 'Jsisnsnia', '2024-07-18 07:13:14', '2024-07-19 08:45:25'),
('e44ee323-8adf-4a54-a231-956590d4daa3', '206ff5c1-eb35-44a9-9ef3-2c70789f6bef', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', '', '2022', 'Calon Asisten', 'Tahapan1', NULL, '04546497', 'Bauaudjdb', '2024-07-18 00:00:00', 'Pria', 'Hahahshsh', '2024-07-18 12:48:22', '2024-07-19 10:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `modul`
--

CREATE TABLE `modul` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_modul` varchar(255) NOT NULL,
  `nama_file` text NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `modul`
--

INSERT INTO `modul` (`id`, `nama_modul`, `nama_file`, `idLabor`, `tahun`, `createdAt`, `updatedAt`) VALUES
('a0c9e0d2-3d49-4f9c-af0f-bc10ee5beb16', 'Modul Pengelanan Bahasa Pemrogramman Pyhton', 'Modul Pertemuan 5.pdf', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', '2024', '2024-07-19 12:47:34', '2024-07-19 12:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `nilaiwawancara`
--

CREATE TABLE `nilaiwawancara` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPesertaWawancara` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nilai` int NOT NULL DEFAULT '0',
  `keterangan` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nilaiwawancara`
--

INSERT INTO `nilaiwawancara` (`id`, `idPesertaWawancara`, `idUsers`, `nilai`, `keterangan`, `createdAt`, `updatedAt`) VALUES
('71ee58df-17f5-45f6-8472-d80a3ff4ab90', 'ac36eb11-2279-43dd-8b65-cd47ff89586c', '98fb08ea-c3dd-4165-9dae-c0312a6d496c', 0, '', '2024-07-19 12:30:43', '2024-07-19 12:30:43'),
('eb31a467-043f-4596-959a-94e9f7d7492a', 'c6e8bba0-2d42-4339-adac-62f07a8198b1', '99712b0d-32ce-47af-b48a-56cb7109ffaf', 0, '', '2024-07-19 08:17:08', '2024-07-19 08:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftar`
--

CREATE TABLE `pendaftar` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tanggal_daftar` datetime NOT NULL,
  `idKegiatan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Status_Pendaftar` enum('OnProgress','Lulus','Gagal') NOT NULL DEFAULT 'OnProgress',
  `verifikasi_berkas` enum('OnSubmit','Terverifikasi','Tidak Terverifikasi') NOT NULL DEFAULT 'OnSubmit',
  `note` text,
  `file_krs` text,
  `file_permohonan` text,
  `alasan` text,
  `idRecruitment` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pendaftar`
--

INSERT INTO `pendaftar` (`id`, `tanggal_daftar`, `idKegiatan`, `idUsers`, `Status_Pendaftar`, `verifikasi_berkas`, `note`, `file_krs`, `file_permohonan`, `alasan`, `idRecruitment`, `createdAt`, `updatedAt`) VALUES
('21bf2758-69f6-4178-a8de-2faf001fb486', '2024-07-19 06:33:10', 'c14d0cd7-bcd1-4d48-a3ac-ebf11b750621', '32575ca5-61f0-4604-95a1-a803d4f7821b', 'OnProgress', 'Terverifikasi', '', 'Zharkyn Dannar.pdf', 'Yergesh Manas.pdf', 'Hdydfuf', 'db4de86b-7847-4be7-a656-1029e36af8c4', '2024-07-19 06:33:10', '2024-07-19 08:08:48'),
('f4a49b9d-df82-4327-a46d-cfd3e5c676eb', '2024-07-19 10:06:52', 'c14d0cd7-bcd1-4d48-a3ac-ebf11b750621', 'e44ee323-8adf-4a54-a231-956590d4daa3', 'OnProgress', 'Terverifikasi', '', 'Zharkyn Dannar.pdf', 'SVANOV ASSYLZHAN.pdf', 'Lea adalah lab yang saya inginkan ', 'a57bd604-e938-4b65-a8b4-2a59d6565037', '2024-07-19 10:06:53', '2024-07-19 10:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `pesertaujian`
--

CREATE TABLE `pesertaujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPendaftar` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status_pengajuan` enum('Cek','Pengajuan Tidak Diterima','Pengajuan Diterima','Pengajuan','Jadwal Diterima') DEFAULT 'Cek',
  `asalan_pengajuan` text,
  `nilaiUjian` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pesertaujian`
--

INSERT INTO `pesertaujian` (`id`, `idPendaftar`, `idUsers`, `idUjian`, `status_pengajuan`, `asalan_pengajuan`, `nilaiUjian`, `createdAt`, `updatedAt`) VALUES
('53c3cf64-250f-413e-b8de-da25b88a1bcc', '21bf2758-69f6-4178-a8de-2faf001fb486', '99712b0d-32ce-47af-b48a-56cb7109ffaf', 'c210d720-060e-4819-a4f8-117c0363af22', 'Cek', '', 0, '2024-07-19 08:11:07', '2024-07-20 04:52:08'),
('c7077c69-600e-459d-9238-4348d81ce61a', 'f4a49b9d-df82-4327-a46d-cfd3e5c676eb', '98fb08ea-c3dd-4165-9dae-c0312a6d496c', '35d58726-44d0-40ec-9c9b-2a1514710836', 'Jadwal Diterima', '', 0, '2024-07-19 10:18:11', '2024-07-19 10:22:58');

-- --------------------------------------------------------

--
-- Table structure for table `pesertawawancara`
--

CREATE TABLE `pesertawawancara` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idWawancara` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPendaftar` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `lokasi` text NOT NULL,
  `metode_wawancara` enum('Online','Offline') NOT NULL,
  `status_pengajuan` enum('Cek','Pengajuan Tidak Diterima','Pengajuan Diterima','Pengajuan','Jadwal Diterima') DEFAULT 'Cek',
  `asalan_pengajuan` text,
  `jadwal_mulai` datetime NOT NULL,
  `jadwal_selesai` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pesertawawancara`
--

INSERT INTO `pesertawawancara` (`id`, `idWawancara`, `idPendaftar`, `lokasi`, `metode_wawancara`, `status_pengajuan`, `asalan_pengajuan`, `jadwal_mulai`, `jadwal_selesai`, `createdAt`, `updatedAt`) VALUES
('ac36eb11-2279-43dd-8b65-cd47ff89586c', '95e343d7-f397-428b-9158-b67a84bd2cea', 'f4a49b9d-df82-4327-a46d-cfd3e5c676eb', 'Laboratorium LEA', 'Offline', 'Cek', '', '2024-08-03 01:00:00', '2024-08-03 01:15:00', '2024-07-19 12:27:15', '2024-07-19 12:27:15'),
('c6e8bba0-2d42-4339-adac-62f07a8198b1', 'c368a9c0-1db9-4b12-a451-2b1279ab7e27', '21bf2758-69f6-4178-a8de-2faf001fb486', 'Laboratorium LEA', 'Offline', 'Cek', '', '2024-07-26 08:13:00', '2024-07-26 08:28:00', '2024-07-19 08:13:55', '2024-07-19 08:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `recruitment`
--

CREATE TABLE `recruitment` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idKegiatan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_recruitment` varchar(255) NOT NULL,
  `limit_peserta` int NOT NULL,
  `tanggal_buka` datetime NOT NULL,
  `tanggal_tutup` datetime NOT NULL,
  `status` enum('Open','Close') NOT NULL DEFAULT 'Close',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recruitment`
--

INSERT INTO `recruitment` (`id`, `idLabor`, `idKegiatan`, `nama_recruitment`, `limit_peserta`, `tanggal_buka`, `tanggal_tutup`, `status`, `createdAt`, `updatedAt`) VALUES
('a57bd604-e938-4b65-a8b4-2a59d6565037', 'ff5d2c22-44d2-11ef-9689-5405db08f5fa', 'c14d0cd7-bcd1-4d48-a3ac-ebf11b750621', 'Open Recruitment DSI  Laboratorium of Enterprise Application 2022', 18, '2024-07-18 12:59:00', '2024-07-19 17:00:00', 'Open', '2024-07-18 12:57:26', '2024-07-18 13:02:37'),
('db4de86b-7847-4be7-a656-1029e36af8c4', '29dfedde-5889-44e1-9cbc-55fb9f4b84f8', 'c14d0cd7-bcd1-4d48-a3ac-ebf11b750621', 'Open Recruitment DSI  Laboratorium Business Intelligence 2022', 10, '2024-07-19 05:01:00', '2024-07-20 04:59:00', 'Open', '2024-07-19 05:00:16', '2024-07-19 05:01:09');

-- --------------------------------------------------------

--
-- Table structure for table `riwayatpembaca`
--

CREATE TABLE `riwayatpembaca` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idModul` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tanggal_baca` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riwayatpembaca`
--

INSERT INTO `riwayatpembaca` (`id`, `idUsers`, `idModul`, `tanggal_baca`, `createdAt`, `updatedAt`) VALUES
('7ab4b7b8-d2b8-48e0-afca-5aa315ab235b', '98fb08ea-c3dd-4165-9dae-c0312a6d496c', 'a0c9e0d2-3d49-4f9c-af0f-bc10ee5beb16', '2024-07-19T12:47:44.930Z', '2024-07-19 12:47:44', '2024-07-19 12:47:44');

-- --------------------------------------------------------

--
-- Table structure for table `soalessay`
--

CREATE TABLE `soalessay` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idBankSoal` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `soal` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `soalessay`
--

INSERT INTO `soalessay` (`id`, `idBankSoal`, `soal`, `createdAt`, `updatedAt`) VALUES
('f7f5506e-93c1-45dc-999f-7596980b0e47', '7ede00c6-f685-40c6-bb13-b98851957885', '<p>gvugvugvu</p>', '2024-07-18 17:02:25', '2024-07-18 17:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `soalmultiple`
--

CREATE TABLE `soalmultiple` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idBankSoal` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `soal` longtext NOT NULL,
  `pilihan1` text NOT NULL,
  `pilihan2` text NOT NULL,
  `pilihan3` text NOT NULL,
  `pilihan4` text NOT NULL,
  `kunci` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `soalujian`
--

CREATE TABLE `soalujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idSoal` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `soalujian`
--

INSERT INTO `soalujian` (`id`, `idUjian`, `idSoal`, `createdAt`, `updatedAt`) VALUES
('e9b199b3-816e-4df2-93f1-ac8bb46e36f9', '35d58726-44d0-40ec-9c9b-2a1514710836', '7ede00c6-f685-40c6-bb13-b98851957885', '2024-07-18 17:02:45', '2024-07-18 17:02:45');

-- --------------------------------------------------------

--
-- Table structure for table `tahapan`
--

CREATE TABLE `tahapan` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idRecruitment` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_tahapan` varchar(255) NOT NULL,
  `jenis_tahapan` enum('Ujian','Wawancara') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tahapan`
--

INSERT INTO `tahapan` (`id`, `idRecruitment`, `nama_tahapan`, `jenis_tahapan`, `createdAt`, `updatedAt`) VALUES
('00b8fba3-1ce2-4aa3-9ff5-d7eb958ab22b', 'db4de86b-7847-4be7-a656-1029e36af8c4', 'Wawancara', 'Wawancara', '2024-07-19 08:10:22', '2024-07-19 08:10:22'),
('1f2a595e-ff82-49d1-84fb-616f3e686fb7', 'a57bd604-e938-4b65-a8b4-2a59d6565037', 'Ujian Tulis ', 'Ujian', '2024-07-18 12:58:15', '2024-07-18 12:58:15'),
('74f41399-2c38-4a58-88f2-d6594b61b0bc', 'a57bd604-e938-4b65-a8b4-2a59d6565037', 'Wawancara', 'Wawancara', '2024-07-18 17:03:44', '2024-07-18 17:03:44'),
('83f15a07-234a-4038-ac4c-54a23887a3fd', 'db4de86b-7847-4be7-a656-1029e36af8c4', 'Ujian Tulis ', 'Ujian', '2024-07-19 08:10:55', '2024-07-19 08:10:55'),
('fff78be0-0786-47b2-bd1a-cb49904909ce', 'a57bd604-e938-4b65-a8b4-2a59d6565037', 'Ujian Tulis Susulan', 'Ujian', '2024-07-18 17:01:25', '2024-07-18 17:01:25');

-- --------------------------------------------------------

--
-- Table structure for table `ujian`
--

CREATE TABLE `ujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('Open','Close') NOT NULL DEFAULT 'Open',
  `jadwal_mulai` datetime NOT NULL,
  `jadwal_selesai` datetime NOT NULL,
  `nama_ujian` varchar(255) NOT NULL,
  `kode_ujian` varchar(255) NOT NULL,
  `tanggal_terakhir_pengajuan` datetime DEFAULT NULL,
  `idTahapan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ujian`
--

INSERT INTO `ujian` (`id`, `status`, `jadwal_mulai`, `jadwal_selesai`, `nama_ujian`, `kode_ujian`, `tanggal_terakhir_pengajuan`, `idTahapan`, `createdAt`, `updatedAt`) VALUES
('35d58726-44d0-40ec-9c9b-2a1514710836', 'Close', '2024-07-24 00:00:00', '2024-07-24 02:00:00', 'Ujian Tulis ', 'HjiaQSFsyl', '2024-07-22 17:00:00', '1f2a595e-ff82-49d1-84fb-616f3e686fb7', '2024-07-18 12:58:15', '2024-07-18 13:00:33'),
('56800f37-9869-49a0-8bad-b3bdc29e9190', 'Close', '2024-07-29 00:00:00', '2024-07-29 02:00:00', 'Ujian Tulis Susulan', 'vwtIb0bj1b', '2024-07-27 17:00:00', 'fff78be0-0786-47b2-bd1a-cb49904909ce', '2024-07-18 17:01:25', '2024-07-18 17:01:25'),
('c210d720-060e-4819-a4f8-117c0363af22', 'Close', '2024-07-31 00:00:00', '2024-07-31 02:00:00', 'Ujian Tulis ', '7xPdwbngdH', '2024-07-29 17:00:00', '83f15a07-234a-4038-ac4c-54a23887a3fd', '2024-07-19 08:10:55', '2024-07-19 08:10:55');

-- --------------------------------------------------------

--
-- Table structure for table `wawancara`
--

CREATE TABLE `wawancara` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idTahapan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_wawancara` varchar(255) NOT NULL,
  `tanggal_terakhir_pengajuan` datetime NOT NULL,
  `durasi_persesi` int DEFAULT '15',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `wawancara`
--

INSERT INTO `wawancara` (`id`, `idTahapan`, `nama_wawancara`, `tanggal_terakhir_pengajuan`, `durasi_persesi`, `createdAt`, `updatedAt`) VALUES
('95e343d7-f397-428b-9158-b67a84bd2cea', '74f41399-2c38-4a58-88f2-d6594b61b0bc', 'Wawancara', '2024-07-31 17:00:00', 20, '2024-07-18 17:03:44', '2024-07-18 17:03:44'),
('c368a9c0-1db9-4b12-a451-2b1279ab7e27', '00b8fba3-1ce2-4aa3-9ff5-d7eb958ab22b', 'Wawancara', '2024-07-25 08:10:00', 20, '2024-07-19 08:10:22', '2024-07-19 08:10:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `banksoal`
--
ALTER TABLE `banksoal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLabor` (`idLabor`);

--
-- Indexes for table `detailkepengurusan`
--
ALTER TABLE `detailkepengurusan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUsers` (`idUsers`,`idKepengurusan`) USING BTREE,
  ADD KEY `idKepengurusan` (`idKepengurusan`),
  ADD KEY `idDivisi` (`idDivisi`);

--
-- Indexes for table `divisi`
--
ALTER TABLE `divisi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLabor` (`idLabor`);

--
-- Indexes for table `jawabanujian`
--
ALTER TABLE `jawabanujian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPesertaUjian` (`idPesertaUjian`),
  ADD KEY `idSoalUjian` (`idSoalUjian`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kepengurusan`
--
ALTER TABLE `kepengurusan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idLabor` (`idLabor`,`generasi_kepengurusan`) USING BTREE;

--
-- Indexes for table `labor`
--
ALTER TABLE `labor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idAkun` (`idAkun`) USING BTREE,
  ADD UNIQUE KEY `idLabor` (`idLabor`,`id`) USING BTREE;

--
-- Indexes for table `modul`
--
ALTER TABLE `modul`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLabor` (`idLabor`);

--
-- Indexes for table `nilaiwawancara`
--
ALTER TABLE `nilaiwawancara`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPesertaWawancara` (`idPesertaWawancara`),
  ADD KEY `idUsers` (`idUsers`);

--
-- Indexes for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUsers` (`idUsers`,`idKegiatan`) USING BTREE,
  ADD KEY `idRecruitment` (`idRecruitment`);

--
-- Indexes for table `pesertaujian`
--
ALTER TABLE `pesertaujian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idPendaftar` (`idPendaftar`),
  ADD KEY `idUsers` (`idUsers`),
  ADD KEY `idUjian` (`idUjian`);

--
-- Indexes for table `pesertawawancara`
--
ALTER TABLE `pesertawawancara`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idPendaftar` (`idPendaftar`),
  ADD KEY `idWawancara` (`idWawancara`);

--
-- Indexes for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idLabor` (`idLabor`,`idKegiatan`) USING BTREE,
  ADD KEY `idKegiatan` (`idKegiatan`);

--
-- Indexes for table `riwayatpembaca`
--
ALTER TABLE `riwayatpembaca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsers` (`idUsers`),
  ADD KEY `idModul` (`idModul`);

--
-- Indexes for table `soalessay`
--
ALTER TABLE `soalessay`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idBankSoal` (`idBankSoal`) USING BTREE;

--
-- Indexes for table `soalmultiple`
--
ALTER TABLE `soalmultiple`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idBankSoal` (`idBankSoal`) USING BTREE;

--
-- Indexes for table `soalujian`
--
ALTER TABLE `soalujian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUjian` (`idUjian`,`idSoal`) USING BTREE,
  ADD KEY `idSoal` (`idSoal`);

--
-- Indexes for table `tahapan`
--
ALTER TABLE `tahapan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRecruitment` (`idRecruitment`);

--
-- Indexes for table `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idTahapan` (`idTahapan`);

--
-- Indexes for table `wawancara`
--
ALTER TABLE `wawancara`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idTahapan` (`idTahapan`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banksoal`
--
ALTER TABLE `banksoal`
  ADD CONSTRAINT `banksoal_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailkepengurusan`
--
ALTER TABLE `detailkepengurusan`
  ADD CONSTRAINT `detailkepengurusan_ibfk_1` FOREIGN KEY (`idKepengurusan`) REFERENCES `kepengurusan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkepengurusan_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `mahasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkepengurusan_ibfk_3` FOREIGN KEY (`idDivisi`) REFERENCES `divisi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `divisi`
--
ALTER TABLE `divisi`
  ADD CONSTRAINT `divisi_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jawabanujian`
--
ALTER TABLE `jawabanujian`
  ADD CONSTRAINT `jawabanujian_ibfk_1` FOREIGN KEY (`idPesertaUjian`) REFERENCES `pesertaujian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jawabanujian_ibfk_2` FOREIGN KEY (`idSoalUjian`) REFERENCES `soalujian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kepengurusan`
--
ALTER TABLE `kepengurusan`
  ADD CONSTRAINT `kepengurusan_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_ibfk_1` FOREIGN KEY (`idAkun`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mahasiswa_ibfk_2` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `modul`
--
ALTER TABLE `modul`
  ADD CONSTRAINT `modul_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nilaiwawancara`
--
ALTER TABLE `nilaiwawancara`
  ADD CONSTRAINT `nilaiwawancara_ibfk_1` FOREIGN KEY (`idPesertaWawancara`) REFERENCES `pesertawawancara` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiwawancara_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `mahasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD CONSTRAINT `pendaftar_ibfk_1` FOREIGN KEY (`idUsers`) REFERENCES `mahasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftar_ibfk_2` FOREIGN KEY (`idRecruitment`) REFERENCES `recruitment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesertaujian`
--
ALTER TABLE `pesertaujian`
  ADD CONSTRAINT `pesertaujian_ibfk_1` FOREIGN KEY (`idPendaftar`) REFERENCES `pendaftar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesertaujian_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `mahasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesertaujian_ibfk_3` FOREIGN KEY (`idUjian`) REFERENCES `ujian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesertawawancara`
--
ALTER TABLE `pesertawawancara`
  ADD CONSTRAINT `pesertawawancara_ibfk_1` FOREIGN KEY (`idWawancara`) REFERENCES `wawancara` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesertawawancara_ibfk_2` FOREIGN KEY (`idPendaftar`) REFERENCES `pendaftar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD CONSTRAINT `recruitment_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recruitment_ibfk_2` FOREIGN KEY (`idKegiatan`) REFERENCES `kegiatan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `riwayatpembaca`
--
ALTER TABLE `riwayatpembaca`
  ADD CONSTRAINT `riwayatpembaca_ibfk_1` FOREIGN KEY (`idUsers`) REFERENCES `mahasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `riwayatpembaca_ibfk_2` FOREIGN KEY (`idModul`) REFERENCES `modul` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soalessay`
--
ALTER TABLE `soalessay`
  ADD CONSTRAINT `soalessay_ibfk_1` FOREIGN KEY (`idBankSoal`) REFERENCES `banksoal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soalmultiple`
--
ALTER TABLE `soalmultiple`
  ADD CONSTRAINT `soalmultiple_ibfk_1` FOREIGN KEY (`idBankSoal`) REFERENCES `banksoal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soalujian`
--
ALTER TABLE `soalujian`
  ADD CONSTRAINT `soalujian_ibfk_1` FOREIGN KEY (`idUjian`) REFERENCES `ujian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `soalujian_ibfk_2` FOREIGN KEY (`idSoal`) REFERENCES `banksoal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tahapan`
--
ALTER TABLE `tahapan`
  ADD CONSTRAINT `tahapan_ibfk_1` FOREIGN KEY (`idRecruitment`) REFERENCES `recruitment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ujian`
--
ALTER TABLE `ujian`
  ADD CONSTRAINT `ujian_ibfk_1` FOREIGN KEY (`idTahapan`) REFERENCES `tahapan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wawancara`
--
ALTER TABLE `wawancara`
  ADD CONSTRAINT `wawancara_ibfk_1` FOREIGN KEY (`idTahapan`) REFERENCES `tahapan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
