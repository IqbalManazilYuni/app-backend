-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 17, 2024 at 04:16 PM
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
-- Database: `recruitment`
--

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
('191363a0-ca3e-47f8-a783-fce55f7ce336', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Multiple', '2024', '2024-07-07 10:17:33', '2024-07-07 10:17:33'),
('23d6ea38-86b9-48af-a4a4-92b003b6b680', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 10:20:21', '2024-07-07 10:20:21'),
('275ef8d1-3997-4870-a73a-7328eae331ed', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Multiple', '2024', '2024-07-07 10:18:25', '2024-07-07 10:18:25'),
('45fe7bce-0cda-4d27-b605-1b7ee2748cbc', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 10:21:00', '2024-07-07 10:21:00'),
('6a035e1d-50b0-4504-b656-94ccdd16f72c', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 10:21:58', '2024-07-07 10:22:07'),
('6aadfb64-531a-45dc-b02e-4619fb25cd41', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Multiple', '2024', '2024-07-07 10:16:12', '2024-07-07 10:16:12'),
('8822766f-6718-43d9-be36-655e3e5a87e9', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 10:20:01', '2024-07-07 10:20:01'),
('d0f8e027-8f35-4d92-935e-19615997ca29', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 17:18:13', '2024-07-07 17:18:13'),
('d1258fa9-ebd8-4d95-b835-3a7d2788f962', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Multiple', '2024', '2024-07-07 10:19:38', '2024-07-07 10:19:38'),
('d921f841-02ae-4edc-99d3-830cd7d3e90a', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Essay', '2024', '2024-07-07 10:22:47', '2024-07-07 10:22:47');

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
('548d0193-ecd5-46ef-83c7-b63998227380', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', '98ae7238-c7c7-4f01-a53a-43768549a90f', '2e2d1bf3-f7ce-47ff-9044-00efb96fa14d', 'Kepala Divisi', '2024-06-17 13:03:17', '2024-06-17 13:03:17'),
('55736f14-f26e-42be-819b-d94fd5474f87', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', '8b715f27-3d25-470a-87e1-acba1cc04254', 'da4d087a-f5a4-42ca-8a0f-f95894aa6f21', 'Sekretaris', '2024-06-17 13:04:26', '2024-06-17 13:04:26'),
('7d8997ac-650e-408d-b9a4-845d3525e328', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', '9e9182b7-56f4-49f4-ae6f-73a16cea93b0', 'da4d087a-f5a4-42ca-8a0f-f95894aa6f21', 'Koordinator Asisten', '2024-06-17 13:03:55', '2024-06-17 13:03:55'),
('7ecf5ffd-91e7-459d-b721-d4d0e5499891', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', 'ac28103a-a455-404f-b25d-76954166a23f', '2e2d1bf3-f7ce-47ff-9044-00efb96fa14d', 'Anggota', '2024-06-17 13:04:40', '2024-06-17 13:04:40'),
('a8b3c9fc-cd42-4553-9516-d351e87997a2', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', '551e5976-0ba1-4ea3-a171-a0d636c55fed', '2e2d1bf3-f7ce-47ff-9044-00efb96fa14d', 'Anggota', '2024-06-17 13:04:02', '2024-06-17 13:04:02'),
('c1b5dd58-7824-4a91-b0c1-687409ad47eb', '9ea0c401-77fe-4a04-a0b8-9b779a3c451a', '41b3a8e4-79c6-4f34-a76f-c36da9a13d56', 'da4d087a-f5a4-42ca-8a0f-f95894aa6f21', 'Bendahara', '2024-06-18 03:41:36', '2024-06-18 03:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `divisi`
--

CREATE TABLE `divisi` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_divisi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `divisi`
--

INSERT INTO `divisi` (`id`, `idLabor`, `nama_divisi`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
('2e2d1bf3-f7ce-47ff-9044-00efb96fa14d', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Penelitian & Pengembangan', 'Divisi Penelitian dan Pengembangan (Litbang) adalah divisi yang diarahkan untuk mewadahi dan memfasilitasi kegiatan penalaran, penelitian, pengembangan, dan bertanggung jawab atas kegiatan keilmiahan di LEA. Divisi ini bertugas menginisialisasi kegiatan pembelajaran dan memberikan edukasi kepada anggota mengenai riset, penalaran, dan karya ilmiah. Litbang berperan dalam penyaluran minat riset anggota sesuai keminatannya.', '2024-06-17 13:02:27', '2024-06-17 13:02:27'),
('2f4201f3-70d0-4a63-a21b-215547a3b594', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'HUMAS', 'aasdasd', '2024-07-07 17:17:50', '2024-07-07 17:17:50'),
('da4d087a-f5a4-42ca-8a0f-f95894aa6f21', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Inti', 'Inti', '2024-06-17 13:03:40', '2024-06-17 13:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `jawabanujian`
--

CREATE TABLE `jawabanujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPesertaUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idSoalUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Jawaban` varchar(255) NOT NULL,
  `tipe_soal` varchar(225) NOT NULL,
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
  `tahun` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `tahun`, `createdAt`, `updatedAt`) VALUES
('582c764a-07d8-4182-9624-39eeffa8f7fc', 'Open Recruitment DSI ', '2025', '2024-07-07 11:40:47', '2024-07-07 11:40:47'),
('a2ef5fed-5c8d-4865-b888-5030e1607f2b', 'Open Recruitment DSI ', '2024', '2024-06-20 09:03:19', '2024-06-20 09:03:19');

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
('9ea0c401-77fe-4a04-a0b8-9b779a3c451a', 'Laboratorium of Enterprise Application Generasi Kepengurusan Ke 5 Tahun 2024', '2024', 'aktif', '5', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2024-06-17 13:02:49', '2024-06-17 13:02:49');

-- --------------------------------------------------------

--
-- Table structure for table `labor`
--

CREATE TABLE `labor` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama_Labor` varchar(255) NOT NULL,
  `nama_pembina` varchar(225) DEFAULT NULL,
  `deskripsi` text NOT NULL,
  `logo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `labor`
--

INSERT INTO `labor` (`id`, `nama_Labor`, `nama_pembina`, `deskripsi`, `logo`, `createdAt`, `updatedAt`) VALUES
('4a777fd0-bef0-41c6-85be-1ba9d9d23c12', 'LDKOM', 'Pak Jef', 'asdasdasd', 'ldkomd.png', '2024-07-07 17:13:41', '2024-07-07 17:13:41'),
('7f2da845-7224-4025-a07c-354554faa808', 'Laboratorium Business Intelligence', NULL, 'Laboratorium Business Intelligence merupakan salah satu laboratorium riset yang ada di Departemen Sistem Informasi Fakultas Teknologi Informasi Universitas Andalas. Laboratorium ini memiliki fokus bidang penelitian di bidang Bussiness Intelligence, Data Mining, dan Machine Learning', 'Frame 162703.svg', '2024-06-18 09:20:26', '2024-06-18 09:20:26'),
('a8f3b29d-ee61-436d-a267-6acfd22f1740', 'Laboratorium of Enterprise Application', 'Pak Adi', 'Laboratorium of Enterprise Application (LEA) adalah salah satu labor yang ada pada jurusan Sistem Informasi Universtas Andalas (Unand) yang bergerak dalam bidang penelitian dan penggunaan teknologi dan layanan sistem informasi pada organisasi atau perusahaan.', 'Frame 162704.svg', '2024-06-17 12:14:54', '2024-07-07 17:17:02');

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
('d896a842-c1bd-479c-b25f-77324ad657af', 'Modul Pratikum Busineess Intelligence', 'Buku_DIBI_2022.pdf', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2024', '2024-07-07 17:17:36', '2024-07-07 17:17:36'),
('f793cb28-3ead-45f8-b840-15742e5f9bf0', 'Modul Pengelanan Bahasa Pemrogramman Pyhton', 'Modul-Pertemuan-6.pdf', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2022', '2024-06-17 12:22:00', '2024-06-17 12:22:00');

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

-- --------------------------------------------------------

--
-- Table structure for table `pendaftar`
--

CREATE TABLE `pendaftar` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tanggal_daftar` datetime NOT NULL,
  `Status_Pendaftar` enum('OnProgress','Lulus','Gagal') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idKegiatan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idRecruitment` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file_krs` text NOT NULL,
  `verifikasi_berkas` enum('OnSubmit','Terverifikasi','Tidak Terverifikasi') NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `file_permohonan` text NOT NULL,
  `alasan` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pendaftar`
--

INSERT INTO `pendaftar` (`id`, `tanggal_daftar`, `Status_Pendaftar`, `idKegiatan`, `idUsers`, `idRecruitment`, `file_krs`, `verifikasi_berkas`, `note`, `file_permohonan`, `alasan`, `createdAt`, `updatedAt`) VALUES
('208353af-11be-42d4-8f79-d4c4d3d1bdde', '2024-07-07 12:39:58', 'OnProgress', '582c764a-07d8-4182-9624-39eeffa8f7fc', '621d6915-26c9-4944-a5cc-544291352ab4', '380617ea-6423-492e-b1d7-b899955bc508', 'TEKNIS WAWANCARA.pdf', 'Terverifikasi', '', 'TEKNIS DAN JADWAL WAWANCARA AKHIR OR VII LBI.pdf', 'Vahahshs', '2024-07-07 12:39:58', '2024-07-07 12:40:15'),
('42419383-9e00-4d9e-8336-fc7e1b45c71c', '2024-07-02 02:49:13', 'Gagal', 'a2ef5fed-5c8d-4865-b888-5030e1607f2b', '621d6915-26c9-4944-a5cc-544291352ab4', '41bc850c-897d-4d9b-99f6-94669c18ef3d', 'SEC_Orisinalitas_(SD2024020000370).pdf', 'Terverifikasi', '', '2024-VI-02328-2.pdf', 'Hsushsjajsu', '2024-07-02 02:49:12', '2024-07-07 11:56:32'),
('87354acc-33e1-456c-b780-d42179eb0d3a', '2024-07-14 23:02:21', 'OnProgress', '582c764a-07d8-4182-9624-39eeffa8f7fc', 'bc4f6f92-bc15-4fa9-92af-487d4fb7746d', '380617ea-6423-492e-b1d7-b899955bc508', 'Zharkyn Dannar.pdf', 'Terverifikasi', '', 'Deskripsi Aplikasi.pdf', 'Gayauahshiaja', '2024-07-14 23:02:21', '2024-07-14 23:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `pesertaujian`
--

CREATE TABLE `pesertaujian` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPendaftar` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUsers` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idUjian` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nilaiUjian` float NOT NULL DEFAULT '0',
  `status_pengajuan` enum('Cek','Pengajuan Tidak Diterima','Pengajuan Diterima','Pengajuan','Jadwal Diterima') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Cek',
  `asalan_pengajuan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pesertaujian`
--

INSERT INTO `pesertaujian` (`id`, `idPendaftar`, `idUsers`, `idUjian`, `nilaiUjian`, `status_pengajuan`, `asalan_pengajuan`, `createdAt`, `updatedAt`) VALUES
('64663334-eea2-43db-b1c0-2238379fd29f', '87354acc-33e1-456c-b780-d42179eb0d3a', '9e9182b7-56f4-49f4-ae6f-73a16cea93b0', '6b3a47e5-e78d-4c57-a90f-81e68f0f0489', 0, 'Pengajuan Diterima', '', '2024-07-16 13:09:00', '2024-07-16 13:09:06');

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
  `jadwal_mulai` datetime NOT NULL,
  `jadwal_selesai` datetime NOT NULL,
  `status_pengajuan` enum('Cek','Pengajuan Tidak Diterima','Pengajuan Diterima','Pengajuan','Jadwal Diterima') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Cek',
  `asalan_pengajuan` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pesertawawancara`
--

INSERT INTO `pesertawawancara` (`id`, `idWawancara`, `idPendaftar`, `lokasi`, `metode_wawancara`, `jadwal_mulai`, `jadwal_selesai`, `status_pengajuan`, `asalan_pengajuan`, `createdAt`, `updatedAt`) VALUES
('0548684b-b794-4ac8-b509-763cdf3b3dc6', '97e69037-1a32-4095-8e16-3a0abda574f9', '42419383-9e00-4d9e-8336-fc7e1b45c71c', 'Laboratorium LDKOM', 'Offline', '2024-07-28 05:17:00', '2024-07-28 05:32:00', 'Cek', '', '2024-07-16 05:17:37', '2024-07-16 05:17:37');

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
('380617ea-6423-492e-b1d7-b899955bc508', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '582c764a-07d8-4182-9624-39eeffa8f7fc', 'Open Recruitment DSI  Laboratorium of Enterprise Application 2025', 10, '2024-07-07 11:45:00', '2024-07-15 11:43:00', 'Open', '2024-07-07 11:44:00', '2024-07-07 11:45:56'),
('41bc850c-897d-4d9b-99f6-94669c18ef3d', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', 'a2ef5fed-5c8d-4865-b888-5030e1607f2b', 'Open Recruitment DSI  Laboratorium of Enterprise Application 2024', 10, '2024-06-20 09:05:00', '2024-07-07 11:14:00', 'Close', '2024-06-20 09:03:34', '2024-07-07 11:13:59');

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
('299d1ea3-93d0-4313-9adf-cb7e13802b80', '621d6915-26c9-4944-a5cc-544291352ab4', 'd896a842-c1bd-479c-b25f-77324ad657af', '2024-07-09T08:40:07.904Z', '2024-07-09 08:40:08', '2024-07-09 08:40:08'),
('b4e16cdd-6af0-4368-8a8f-12653e7b7714', 'bc4f6f92-bc15-4fa9-92af-487d4fb7746d', 'f793cb28-3ead-45f8-b840-15742e5f9bf0', '2024-07-15T07:37:47.856Z', '2024-07-15 07:37:47', '2024-07-15 07:37:47'),
('e1101e92-f2cc-4cd4-8510-fcbe77b18d24', '621d6915-26c9-4944-a5cc-544291352ab4', 'f793cb28-3ead-45f8-b840-15742e5f9bf0', '2024-07-07T16:43:29.779Z', '2024-07-07 16:43:31', '2024-07-07 16:43:31');

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
('3d0dd151-0a69-414f-a347-ad9a6de38d23', '45fe7bce-0cda-4d27-b605-1b7ee2748cbc', '<p>Perhatikan code program berikut.</p><p><img src=\"data:image/png;base64,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\"></p><p>Jika a=40 dan b=53 maka output yang dihasilkan dari program di atas adalah…</p>', '2024-07-07 10:21:00', '2024-07-07 10:21:00'),
('43f0f900-9b92-44de-99d1-ef455b22985e', 'd0f8e027-8f35-4d92-935e-19615997ca29', '<p>Apa yang dimaksud dengan MERN</p>', '2024-07-07 17:18:13', '2024-07-07 17:18:13'),
('61c630d8-22a2-4c38-9874-0b895a827be2', '8822766f-6718-43d9-be36-655e3e5a87e9', '<p>Jelaskan perbedaan antara algoritma, flowchart, dan pseudocode!</p>', '2024-07-07 10:20:01', '2024-07-07 10:20:01'),
('7b600166-49f8-47d6-8697-ebec740a2426', '23d6ea38-86b9-48af-a4a4-92b003b6b680', '<p>Buatlah secara singkat algoritma dalam menghitung luas lingkaran!</p>', '2024-07-07 10:20:21', '2024-07-07 10:20:21'),
('d57c2dbb-dd0a-4666-b370-21328f8a43e3', 'd921f841-02ae-4edc-99d3-830cd7d3e90a', '<p>Sebutkan satu inovasi sistem informasi yang menurut kamu dapat bermanfaat di kehidupan sehari-hari berserta alasan kenapa dikembangkan</p>', '2024-07-07 10:22:47', '2024-07-07 10:22:47'),
('e0c53561-1de2-45ec-afc5-435e8fad7e91', '6a035e1d-50b0-4504-b656-94ccdd16f72c', '<p>Buatlah sebuah program sederhana menggunakan bahasa C++ untuk menentukan jumlah beban maksimal sks yang diperoleh mahasiswa berdasarkan IPS Sebelumnya!</p><p><img src=\"data:image/png;base64,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\"></p><p>Ketentuan</p><p>Input berupa nama mahasiswa, IPS.</p><p>Outputnya adalah nama mahasiswa, jumlah beban sks maksimal</p>', '2024-07-07 10:21:58', '2024-07-07 10:22:07');

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

--
-- Dumping data for table `soalmultiple`
--

INSERT INTO `soalmultiple` (`id`, `idBankSoal`, `soal`, `pilihan1`, `pilihan2`, `pilihan3`, `pilihan4`, `kunci`, `createdAt`, `updatedAt`) VALUES
('4f401ceb-1be6-4e0f-a9be-27de5e8ba4a5', 'd1258fa9-ebd8-4d95-b835-3a7d2788f962', '<p>Berikut adalah tampilan dari beberapa halaman desain aplikasi.</p><p><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXAAAACNCAYAAACuYiFMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAFfsSURBVHhe7Z0FXFRNF8YfQBoUUAExsRW7X7HAQLEb67XrtTtQUUQFwe7uRsXWz+7ubrADQURFROQ7Z3YvrrgoKrCL3v/9DezeubX3zjxzZubMXJ0YAkpmzpyJrZu3wkDfQLlGJsVBT9PY3BiLFy+GoaGhcuW3PHz4EN26dcfnz4COjo5yrUxKgrPup09R6NmzO1xdXZVr1TN48GBcunoVenp6yjUyKY3PlFnts2TB9OnTlWso76oKeKMGjZCuZDoULVcUnz5+Uq5NAHL+Tz5in5Z69A31McxtGO5cvYPUaVIr137L6dNn0KFDU8yd6463byOUa2VSEiYmRvT8/JEtmyM8PIYp16qnQMGCGN60KaytrPD5S5aXSUF8iIxEtylTEBgUpFwTR8Dr1amH6j2qw6mqEz7SklCiaYn6HPUjbZH5DdhK1tdJBT1avocRLVVyVcGl05eQxiKNcu23nDhxCu7u3bF371r6Fq5Y+RXxnSda+V9T6FKQLAZOcVSF+GsxhY/PZCqArTB69EjlOvUUKFAAuynzZ7C1ZVNOuVYmJRHx4QMcmjTBvfv3lWviCHj9OvVRuUdlVKxaMcECbk5L39Z9cXT9QVhaWYhqnUziwuL98nkwGvRuAncfd5JbdYKrwJAW11yuuHz6cgIE/D8S8JX0TfV4OoiKisLTp8HfNK3o6uoiY0Y7+hSlWJHs6OPly2BERChqDAYGBrC1taFPmrqen4ELHg6qNdufaarkgjNu4ckCPpUE3DphAu7nhww2dL8SIuCpUim2k7bltKCvr/icUD4m3AiU+TFCwFu2THwBb9+gIzyqNEcV54ryQ0sKjI2xfNVarH1yBn6zfZJYwPVx+fJ1FCrkpvz+BTMzExw9upjiHOjbewrJ1XbGSdQYL14Eo2bNrjhz5rpYmyWLLQ4cWAB7+2z0LTmv52fRxatXoRTCkDu3PX1nIdbBgf2nkYoKofc/0NNPn6LhkDsTsmYk6/krEU8iAdfTw12qppubmsI6bVpubMd7KjSPXrwIQyMTRHyO+e6d5qdlohuDfxwcqByggkCbYLnjgoj7h+Iam3xf2DhIjj4hPgfl69jPJM6I/n7tNgkFvBM8nBqjSqUKXws4H5ovkm/Y27df37DvxcWFf6CZGRlaZGn9zA2Obz9KmIJ37xT/E4OkOKYEC/jqdVj78gL8ZiWfgOfLZ4+yZQvRI1VYuMuX74CNjRXWr/el9cVpDT9rEwqqzS1sYbKFrPqM+N6w9cnH4XhOuCy4UoLlOD4O70MJWRxXdf9UePDgEVq1GoFDh86hTp0KSJs2DZ48Ccb9+4+xYYMfHBzy0Hbaaomb0D3bQ9e5GytWTKXvwRT00MRtELat2Y3qlAXiy7qcK6LpZ/WY0gcuPTvRN9X0lQQCzvmQRLvj4MEoV6wYWtetK/LOy1ev4NKrF55fu4aypH3x3Wm+XgtKDgH0eG/t3g0bLgB+VGAkJ1Sg3A0MxMFz50RN8yMFrmmyDObOkQMuTk6UHSg/JFRjfgU69nuqza7asAHv3r9HKiowXatWRTZu3oqMVG70LeoEnHNO0mFkhPXbt6P/6NEIi3tTKG5DfHGq0Pq3JIoDvLywdssWsV+CUO43kPZbs3MnkIbEjBMn3awJc+bAe8YM+vWJ9PPpmBPpmOO4dzixjqkF1KhRCfPnz8bSpZMoTIafXx88e/YK3t6LKJY9XCywZMlGDBnijREj/Oj/OBKorWK9IitzMMWYMdMwePBY+Pvvwvnzd9Gz53DcuRNIcWyd6ZFlHUHx4zBw4GicOnVD7KPYV8IQAQEHhHi7uVWja5mAhQunYeLE4bh16wHmzt1A2yQwXSQ7egh7/QrL1pzCqdu5cP7sXlrH9y4Gs+d6IyNd9vpSJHhF1YdNxYARmclQit+hKHEhQ+TKxSM4esMCq/c8xKvH/JyA9HZ2GDmARJ3K2XUl6doKqw+b6JobURnRq2lDmLFR8z3DTBNQjefw+fNo7+mJrYcP4/HLlwh6+hTnbt5EyyFDsI21IqEa84t8Jkv7vxEj4E4aFELaNy8gAB3d3fGCroO15GdIWrWhm7XpwAFMWL4cb7gUlsSNHypZxpuOHRNxYWyBxyd8LMRkAfgtW4b1+/aJYyYI2u8d7edL+3WjQoILC6ROLW7QlFWrxPESTWypVJ+6erU4V7wFUYqEMx9bT4pw69aX3m+2opctW4levbxJ0BeTBTif/i9Bjx5jsHo1d4yylZ0GffuOwfDhs8hSXIL+/f3QtasHpk1bi3v3HlO8vqgYtW7dX8T7+i5HmzaDcO3aXYpTzUSRqF69LBUmw0m03aks5jQQRkGLLDu16JBB9RbNW/lh0/FuuHM3Ew7uP0vr+d7EII3ZZ/Qe1xejb4qvCjM8biD2kX2z843ic5JCteGb187DbehOXI8chZ1Hg/AoLETRHk6WYTn7rMhevTY2sKZ/53qnPQFcmrSEKdd+tU3AVfi3USN4kzb4enhgZJ8+CH79Guv27FG0CnATCxdAHEy4dqiEf49qHAcWfF4fN051PxX4jpQtWBDLx43DSDIw61Spgj2nTuH+E7pxWiXgKtTr1g1RUvWAftySJUuwhkVVFRY/TixS4O8k/GnJej5D4ujTs6eiiYJ/pOp2P/jRr8LC0HroUOzYtUt96cpCrno8RrqWuCL/o/Pxw49vPymoxqn+lp98eEnNypVb8M8/1VGqVEMKDTBnznpky2aHGTMGU2wUjh+/jLCwt2RZj8f16+uxbp0PQkPDcfLkVYpPQ+LugUmTltPjNsbly2vI8najuCvi2Api4Oz8L27efIAbN9aTVb4J+fPnQIUKrfDw4QOKl+5HFHLnzo727ZshQwZ2jfxEyeAd6tTpipIl88PDoyOt4yYZ7eNjZDS2774OZCwDZOoIz1mROH6ErDwYQE9XH47VK2PXa/qqLidSEjxERtlt54ro17UBreCmqSSE0t/j4Ge4GkgSY0nV+ewz4Oa+EGGvngtxsspgC6sCJXGGCxN1dgo9rvG3gWodu6F05kz02LS1SUsJtztz7Z8NyPcq6YcMvaGTJiFfjRooVKcO6nTp8kU3KM59yhQRV7RuXRSh0HHYMIVYU9wwZRzvV1t1PxX0KP93atECVRwdgTd0M3/Q9v091CWbJOHSrVvCj1GyUO8/foxIZXu5WEMCduzCBVjQj8pTuzasypfHEarqcIn2mm5yVSoAhNWcPj16jx+PNLRdNrpRdlWrwqVrV4VwxgPfsLf0gB4+exZ7/ljo+OMXLYIlnS83nTezi4u4zsu3b0OnSBGMW7iQ6q/mYtPPtG+matVQuVMnMqLYivoCe2iE0sPITvtbVaiAUbNnK7ahfbgmwNeaq1YtpK9YESNnzVLE0bn/+fdfWFeqJH5PFyqNRcmtJXBzyYkTl3H69DURrK2tcPbsCmTmzEkW8PjxPREYuFm0STdo0B/duvkodhTokigr2uouXFiJAgUcyBpvj5EjuR33C1ev3sWDB89QtWo3EvPO2LXrOF69ek35SbUdnf9z27kik3HbZZEiTXH37kPY2dnAyiorrf31TJB06KJk6c5A7sPKpn8zhD7RwzOuKovCKRqF89qh6/Jx6MH9snFzI/3sR6QxETYZyVrPQCuSsMZB4h0UeBO13TcD+ZYrGrlNs+DG/ReUfknk2LggoRtQvzbCazTFGjIWvxFx0v3r9NjSZc+NVGaUjtki1WI+sP5Q3oykIHk2WZGxuJDyLud7L9KVVWPGYMuhQ8IApQwA3xkzMHY+1Ta7d8dGPz9cJF27zm3SJN5+M2diDMV5kD7wfltpv1os4uos8U+fcJb0zqZUKYyeOxcTqQZQunDhny70kk3AP1Epwz6M3EGydts2jJo3TxmjEL+Qly9Rr39/NKTqxEkS6nJFi6J8hw54/OiREEEWx5ehoSIhsaC/IQtsH93o00uX4n8nTqDZgAGxQhuX1iTM0wYOROexY3HmzBkqFJWlIv3fsW8fRtINHPPff9g/Zw7d10/I1aABDJQFQiBXa9jqp2t8QgXA81evoK/GUubBEZZ0/ns7d2LWkCHimIvWrBFt7zWo5mBB1ckD9JuHtm8vfvvC1avFg30REoKXVHUr5eCA2SNGJE0n6C/Su3dzyoPXKE2dFOHx4x0kltwxqkhkxsZGaNfOEwYGZcgSp0wuKoffYm3N4sO1LwO6HVZinSq6ujpU/uqJe58+vQWyZLGh73z/4x5PnzTkHfLmbUjW+kMS/JIICJhM69mE1TYM8PzZIzwNpoJaP71iFYt4wblo0C4Ie3ZzWzgr4Ge0aFoP1p4D4cFNKVQRk9gXAgRUro6VM93pWxL/xlR6ePD4Id5H0PNJpZQFLhMdLiJPq/F4/ISbvAiqEU8bNQpzs1XEMcqOsSJOj8qbNsnffTDauFT52qLVUgZMnoyc9eohf+PGqEz5v4GzMyZS3m1Xvz7eHjkCD8rD1Vi4Ca7Fswaw7jAZbW2RLRMbMkpIo0RTMDGQrPAGpGU2Vlaig1ItJNRF8+TB84MHMaRtW/Qli//0pUvfNUTVkWwCXixvXmFxXzx+HFdu3kR6CwvYkTXNRFOisEqXDs8oLguVcvYkuCevKKva3ynFWWQNlT+YjxEfPAQ1h/Jmn6GbxKWt8HGm/zWowHhx9Cg20410JHENoYKCrzNPwYLwnzgRczdswEJu6rGzgyMVKKlJiHcuWCD2/Qq+Tj4mXY8k8GLEGx3r0Nq18KMSNhclltnr13+J4/90bRZUeu9mS1/LqpwsrGwppqLMLQW6YhEHmKFHj/HYt+8MypcvgocPj9Fn9mj5ltOnqSYFc0RGhuP27TuKlUrYRc7OLh0OHlxEBcR5+r8ECxd6wMYmLcVK5+J7ZYTnz0PoXO2oEEmNxo2rYu/eVbSenz+3icefTpIfPdy7dxely07Gmwz7FelCgn9S/uWoWms2Ql9xocdx0ciZLQM+pDclAVWsCqWk0EU3K9au5AIqTlpLbOj6Dhw9hgr9DpFgb1AItwTFvc24CxW7/KfoQ+J8RqFI7ly4HaOLGP49pCKbXwLnSjbEgE4dvs0bWsq0oUNxZ/9+3N2xA4/37sV6ElHOgyFkKFYnC5u9Ps6yEUaoOOspUN4HdfjTcW7+7394duoUAsgoVGuUkfGmq/TCk0T+V0bIJpuA+0+bhrd0Q4o0a4bRVM0Y3LkzGrq4iDhdSiQxkZFw9/bGpJUrsYWqKQ2qVRNxiQG76tRo3hxtyLLuOm4cHr14IZpVuNnmxePHaEwWMvdEH1u1CpkzZEA0t0nRg8xJn7NQSXvg2DFsoFoB+8I2rlz5a1fJH0EPx59Eu3bv3hhJVbJJlGi+gR+clon3z+Dm5oJ16/zJGt6iXMOCqovq1f+BoaEBatXqhTVr/DFkyATMnOmv2EQJ7xsU9Iy26Y5t29ajZctB6NnTD+HhnOil5KlP29wn0e6LCxduoU2b2mjVqgaWLFmO+fNX4tQpLiB+ZlBMUsKZ0Ao9u49DkK43YMgeOXHgfG9ZD/4b2ArnLxFoVrcuXtZsjI0v6CsLYrgO6tevRF/idytLFDjtkVHS2N0LyLtWcTlx0TVEqE5l7N+zS2EhkiBNGDYUfgZ58IyS7QfKDpcNzVG1WGFFu3JKgWp8Ii9LgfMgCevE5ctx5MIFrKGasq2qla0KN4vEU+PXYUcLuk8LlizBuoAASppfp002NqeRwbbjwAHRIpFgxww1JJuA65FA92/ZUnzOnTUrapUujQ/KkkmHxJR7gL0XL0Z1sojLkdiyWCYabAGFh6M5ia9k9Qvoxh06fx47SaAHksDaFS4s/EIF9EALFymCgOnTce7GDTQcMABt6tTBTG6njq/Tgc/DVopq+zgVEv2pSmVMD3wgVT2ldv+UT6SwgjNnthFt325uQzF7tj8JsCvWr99BoroTffoMwYIFo0WByPF7955GgwbOyv0VzJkzhiz5prh48RaJeG8SfH38738LYWvLzS7SfTbEpk0HcfgwCzXQvft41KnTl4R8JDp29MKKFTtorZrOaY1ghL171uPS43/oIw8wUgNrfJYx6DeI3TE5rbAV/hYtGpXDQTM7PH0DeL42wTgfRWdxkkJ5YOaCeXhj2oXEO57qfipDhBj1w+hF86jgsVSso/zUq0ljTHxqgDuUVbdaOaBjm9YpxvqOF9Kp2hUqIBvVuL18fNDdnZuvCM7bFFerfHlFHBmk3bnzUoLjlPuNmToV3QYNQi9fX6FrYl8V+Nvlu3fRevhwDO7fHxt27kQNR0dFK8FPdmgmm4BzNaFbmzbic9ECBZC7YkX6zQrrgpsR0lPCGEVW+a59+9CwKlWPSVQTFTpXVRLwNdwBShaHaHIhMXUuUQJ16VrGTJiAevXq4UVwMBnNlJD5pr99i6IUX7poUXGI//79F7rxCDAXQuzPXqdpU7jTsapQAcUPm60Vbn//SOevU6sWvFRmEtNOosUIx8WLR5KVW5O+x5chI+HkVBHLlo3DypVeWLVqDBYt8sTEiUMxdGgbWFunxfjxXti58yD8/X2xZcsk+j8Fzs6qAh5DhsoneHn1JxEeTcfyJAt9JDJmTEdxqvc5EjVqlKX40WTJj/sqLF8+WljkSd7MkCBYmU2xlQqbh8Ek4Knpd3AOY12MGzh5pZuJ3r1H0xduBopE5fLl0GS5HwZGW8FrYj/aNYnbkZXW99xNAfho2Y4yKa1Td638G0xz4kxoWyyaN01hfVI+6EC16fy9R8L3gwXGd+oIcB9VHLHSOigfVipeHAtHjECZggUVlrcqFF+a8u4q0glXEtXCuXNj5Zgx8CRtYo+R0uXKIWDmTNShvJ0/e3blTgQdp3SpUor9aBveb5W3N7qy5il1TkKX9GUKnZ87Lu0zZkRvuo9zPD2Rztr6pwU8aUdi0oXef/AAz0NCUDxfPlHynLl+HdYk1tnt7XE/MFDEcfu4gZER3lOV5vzFi4ik/yaGhqKZg28Ed3KevXZNiLzYLyhIdCbyflJcOorLQZa96g2IouOco/PFxnGViazjS1euCGf6InnyCAvkGYn2zdu3RRuUKV2HIa0rzHF8a+g3BD58iGd0vqJ0Po4T61WhRHv51i1E0G9njxNuEspJD5c7OkSVks55lix97gDRJ4ucA5e26dKlwyW6Pi5M+NjfHFeC9k++kZgM51i2aNn64+cZX6bk6+XtJDuA69+8D68zgItLC7KmT6JcucJUEUlFBXUM7t17hEePXmDXrumoVo2bCLjKzcfnffg/n497+1Th83yvrZu3/951JhfGVEhtpVrIEKppZSFB5A5bdW0SSqL1kDvnS9y8ye60fB/4t1kif34X7NvHtRCuon9n/98diUlC3I/EaeKKFXR7Hej2KfqT1KJDSh4Zig71HDDPxy92tGIY1ViLN2mCO+w/zR192i7gDBto7K/NwqpOMDkfcjxvJ8H3jL5PX7QIk1euxLb585GLtEiP8q0j1dyPsFMCd2Kq7sfHia9Jie+T5EzBn+O7FhWSfyg9wz+GRFaIJ5+K29D4ZvB3ytRfxfEP4XWqJGQ/KU7dDVAXx/vzuaTmEj6W6sNiVNuk4/4GdUjHlIh7Tr4OVTiOt4l7LepIdgFPDHSoNv0BxYu3wPXrgfQTFfeGk5uPT08MHEgWn2giied+pkh0RNv969dv6XHTsxU9fN8nlb4JFeTcLCHdBx0EB4eKjlo2Tr7Pbwo4Hf8FGSZs6OjpUNr+wbOIidGBiXFqpDH/MkCHn2cwCTcbV/HmjcQmbl5NLjgN072r27u3mBeG54phh4WLJN7G7P77s7+ft5eeRQJI2smsqrVAFWeyqOIKuMzvwwK+cg3WPj6dDJNZJSa6VE59Kwy6unpKQU+mDJ+s8O9SFFYJJ24mZuFOSMZOhLlQ+DkoC9cEwXIRV6i4oPkJIfodWK6Cnj5D5PcMniSE02001ST5RRoMN7dyjZqbgX+WNGamsKVaeEKFP8kEvHPjrqiaOif+KVIYH9lKlUlUjAwMsHn/QQRm+IRx08akIAGXSVqSaDZCbYXEk50b0lV2RsFcGYSYawKdOAV0zE8aIlxehr19D0vzDDi+dm2Cx34kiYDzCwRWz1uNA9sPQU9fQ1WbPxx+RJ+jolGreU3UalILH0R7qXpkAf+b+PsEPJzErkiLRrh7aArIDFdGpDD0dHHn/hO49VyMMxvXa1bAufQxpsWAlp8tieLje8fk0i+CFr6+uCWhNqBLixktkbSw0CbWNfJxEnLMxBdwvv88FDhO34SMCnyPFKPwkpe/UcDfo0jzBri73QdQTnOc4mABD3wKt6GrcWaDhgU8KWDxXjJ9CY7tOgZDI0PlWgXv6QF2HtgZpSqVwnstm8CIX3f28P5DeHbwRN12ddGgRQNR2CQniS/gRiQO03Hw4BkoRmLKqMLZx9o6nXCBTH5kAU+R/OkCzu3q/Jq2bUu3Kdd8jUU6C8zdOxd5C+XV6HWqwlaxPi3Xzl+DWzE3tB7UGkO9h5I0Jm/zROILuBkqVGiK1q17I1++vOD5SmRU0UGzZo3w6NEW0pfkrhH+xQK+4w8Q8CF/gYAvP7ccGbIohrebmptikfcizPecDyNjI2y4vQEZMlIcLSyg3HyhCq9XheNVmx8+08LruJmGP0vEfXEwx/2oeYjf4h/yIgQN8zZExLuIP0rAy5VrjBkzVqBw4YLKdTKqZM2aCYGBAT8p4JxWf2Z7Tp9x0+DfKeCF3erj5oaR+EB5LiWiRwJ+K+gZOowO+PMFfHvQdmTMkjFWjE1pkeK2BG5B5qyZheUb/i4cz54/+8p3NmvWrIjSUZTSvE1IcAjC3oSJbXhgiY21DR48fIA0VmlgYWkhhJrb3YOCgmJ7uNk9iLczMjP6pkCQYNF0ye6CJ/efIF2GdAh+GiwL+F/EFwHngj+Ov38sLJqSxaiDJ09eIDwsAe3mlAx19HRgmyE9Uqc2U6yIJREFnAeo/U4Ngo+Z1K59dH081XMBntX0BwaVtsNTapQqUBDreWR2AmduTJECvjVoa6yAsxWcjpY+bfogYEmAiLPOZI1rp66J9vK5I+cqj0A/TFcHc/bNQfGKxYUoh4WEoa9bX5zafUrEW1lbobt3d3i280TbIW0xaOwgIeCnjp9Ch0odhEUt0bJfS3Qb2w2GBoZim7hw4dCvaT98/vQZ3Ty6oWHhhrKA/0WwgAcFbUZo6BucPHUVUVRb/MoapyyWNbMNChbk93ayEWBMgloH70mYeUre76FL1trda/fhObQt+g/oSmtUrbVEEnC61qMXLiDk9ZufqhOoktnOFoV5NLHq4LUfwUPyfwUe7fgn8KNCj5sreYSmMi2lSAHfH7QfmbNkFgLOQnn99nX0b94f189cx/aH22FgZIAq6avAzt4OZaqVQSr9VDAyMcK6GevE/8MvDuPx88fw6uCFw1sPw9HVUYj++/D32LVqlzgfC/iwscOwc/dODGoyCJHvI+H6ryv0UumJ83BYfmA5ilYsGm+nJNcM+PpOnj+JFsVayAL+F6EQ8B3Ytn0/WjcZiKr/OCDqk0LIeFqFZ8GvoW9tjb17ltIatrqN4ZC/FubuXw5rm/RqjQIJTlcTvCcjzfvXGOnZn9YkgYDr6cG2SmWUdSr8VQ02IXBB9TI4FDEhn3Fw1Sr6eQnzxuEm0cVbt+L169fiGDJfw6JcsmBBVChVKlbk1Qn4zz0tDTDTeybGDB2DcYPHwdvDG8M7DBeCWq9DPaRJm0aIdBevLvCa64Vls5ehSo0qMLMwE5YLw6J6/tB5Id7l65SHzyIfTJgzAb6LfNGoWyOxDcPCt8BrAd6+foshM4dgzrw5mDtrLqYsn4LsBbNj3sR5CA4PFm3m6ninXGT+XiI+fET1SkWwapk7/Of0F2Ht/IGY6tke0pv9VXlLCxfw/P97C7uPfs919LchG87IyBDrVs+A/5qZPxXWrZ6DGdM81f6+eCHB5qaQAdOnI9TSEi/MzOSgEkIsLHDk6VNM5/lVpPlS4kHrLXB1NOjcAO4T3KFnqicENTwoHMP7D4eerh6unLyCp0H8yiogrU1aHHt2DBvXbcTgJoMxbtE4NGzTEGG08ACkW2dvoWGJhsICHz12NOpUrINzh87BtaUrPrz/INrBzVKb4dLxSwi6FYTN9zYjs72iNqAOLiyunL8iW+B/GZIF7r/xfwiYtQrLp/emW6ps16Ra3IUr99Bj7k4cPsj3+osFPnH/bKS3SSeaBuODLfCp3jNgQ+nRw7MfrUkCC5ys7my1XXE3aLPoYPs59HD1+m10aDwax9evS5gFTgL+Jjwcxdq3x507X7/gQ0bB7r17Md3DA5v4RS88cRiRIi3wqdunYtXFVVhxboUIS08vRd+xfYV4s5AGhwSjaeWm2Oe/D7vX7kaddnWw+f5mWNlYiWqaKmzJfKKFrRmutsbXHLJ9+Xbs27AP+zfux5YlW4R4y8gkJZwm4y4yMj9C6wU8t0NuFCxUEAWKFhChcInCMLEyiRXiKKq6Pbr7CJXqVcLJTyfRaXAn2GezF23hcQ0baf5xdhNkyz3yg+K7hGQJbbi5AftD92NfCIk4/d/xZAc23t4o2s7js75lfp2bN2+SUaaDYaoT5CuR4tylifW/Q+PGjcX7Tt/wm75TCEKoKUnxALWI92RSKAPXAOO6s8rIxEXrBZyFOirOoq7T51PUJ9ExGfomFE1LNcWLRy9EJyQ3a5iYm4jP47qMw6Y1m/D86XOcO3UO7cu1V+6tEG/rjNbic4cKHYQv97s3VF0lTffr6YdmhZsh9GWonKmSAGlw0MOHD8V/VQIDA8X/twmomltaWsLW1lYIfkqAr5Ob8rYu34ryZuVRzrRcbKicvjKePnwqPKh+NAZB5u9F6wX8R7AXSq7CuXBk2xE4WToJj5ToT9HCffBj5EfsP7YfNarXwLjl42BsZowhbkNQ3a46OlboiPwl8iuPouiEnLRyElyauiDkeQhcM7midrbacLJywuUTl7Hy5EpktPvijy6T+CxduhQzZsxQfoPwUKhevbry2xdOnTqFzZs3i3D58mXlWqBv375YuXIlTE1N8f79e+zbtw//+9//sGnTJvGf12kVpMvrlq2D93/eKFWlFIpXKh4bchfOjX/L/IubT26KMQuaQ3rRhow2opUCzlY2C3A1t2pCdOOzQNgSt7KwwuyA2ajRsobwTKneojqmrJmC1QdWo3LDyji46aA4XuumrTFy2kixHbeTt+rbCpPn8Ru/FXBVludWmbhyIhp3bYx67euJ47k0d8Gk1ZOQt8CPh+3z9bBnDJ/XoaSDOK/Mz3HgwAG8evVKfF7NvfBxYNFmUd+wYQMWLlyI+vXr48KFCyKuT58+cHR0xIcPH/DgwQNUrlwZ3bp1Q0BAAJo1awYfH59v+kU0BVvfb8PeYlzXcejt3Rtrd6/Fiv0rRFi5fyVWHFiBfMXywburN4xNVd6xmqykwvr126jgY5mQRVwb0UoB587FJu2aYPqq6bC0shTCGB8sklbZrDBl2RT4zPPB1OVTYZPLRnia+Mz3wXCf4bh46SI6diSLu0B+LF+2HHMWzMGQ4UMwacIk5VG+EKEbAa+ZXmJfPt60FdNQwLGAsNB/BFvndlnsMMt/Fmo0rBFvJ6lM/Pj7++PMmTPi86BBg8R/VYKDgzFixAjkz58fadOmxd27d7FoEb8cWD01atQQ8fyeQ09PzwQ1xSQXXJhkypQJvXv0xgtaJLdB9lz6bPAZI71Gij4ezWGAUaPm0XPwps88CpRf8cYhNQWuFchNO5pGKwWcrWGeNvUNLd8TbwkWTt6WEz7/l5o5+DtbzUE3g7B5/mYM6DwATZs0RYuGLdC6UWvsWL4D+UvmR4NOX88ayPtJCx+PC4mEegXw9fI+Se67+wfStGlT1K1bF0OGDEGjRo2gr6+PqVOnKmMVtGvXDs+fP8fYsWORM2dO5dqUCb/NJSgwCF5eXkhPi4lyYdfBmMgY9OveDwaG/B5QzaGrq4Pp09egQYMuscHF5V+cPMm1Hu0eEblixQpUrFhRFPJx+V6cKlFRUSJNDh06VLlGu0jxbeA/goW0dNXSwrPEJpMN9qzbI1wEj24/iqx5smL61unCa0Vu7tA8efPmFf7K58+fp6r7eiFwVatWVcYq6N69O7y9vbFnzx7RfJJS4TEG5hbm8F7jjdmes1G9eHXULVJXhDpF6qBe0Xp4GvgUnks98f6tJtvuFUbIxo37Y8P//ncCT568pLXa3aF/9epVHDp0SPSlxOXatWsiLpTfpP8deC4kbrbjbbWRP17ARbu0RRrkyp0LY1aMwe4Xu7Hn5R7xf8mJJWJOlMR88YLMrxMWFias0UqV+G31EEKuMs5MIHmlZM+eHeHKAQ4pFf5tNerWwJhVY3Dz3E3cv3pfhKAbQXj15BVWX1oNu9R2iI7+cS00aYjAgQNzEBKyj4Ruf2zg77Vqlaf4+N8MpU2wpf3yJRc4CtasWSNqcKrws+DmNRZ7dkOV+koMDAxw//590bTHfPz4Ee/evRPbcHrVdMd4ogo4uzzxSEBtW9iVkLEws4BdejtkSJdB/E9vkV64Bapuq+3Ln+jGyJnE3NxctGkz2bJlg52dnfguxaXjl78SW7duFVZ58eLF0bx5c9jY2MTulyFDBhF4Pg/eL3Xq1LH7qcZpC9w5zzXEmg1r4lLMJZyLOocLURew8dZGHHp1COkt0yub7zRFDCwoj4SHR5Bwh8eGkJA3iIpKOVO5suCyCEuofpbYvXu3cEPljm9OU1LTHTeh2Nvbi+Y9ZvTo0TAzMxM1xaJFiyJXrlxfFQ7JTaINpWcL9sLRC3j18pXcYZ0E8GNKpZcKDiUcYJPBJradPy4s8vJQ+uTlV4fSTz4wF+lTp8PRw0dFcxFjaGwI92bu6OXbC7ZZbPFP6X8w2XuahobS6+Hs2StwcupCIv51J/6GDb6oX9+VPn3U2qH03G49btw48ZkHeEVERODw4cOoUKGCWMdwhzkbA+y9VKxYMXTu3BljxowRHlCnT59GiRIlhMcQxx85cgTDhw8XtUR1cYlJQofSJ5qAs5XrktUF5YuXh75BfHMiy/wq3KHHGb3+gPpo261tvK+TkwU8+fklAXeohQl7ZmHLws2YOWym2DQuWXJlwYFbB+DrPVFDAm5Cz7wucuTIhIMHz6JDh3pkzUZQLegwnbcXWaV1aBvtF/CGDRuKMQHjx48X7eJci+Na28mTJ2OFmC1tDxLMZcuWiVobu6b+dQLumt0Vt6/chrGJpvxW/2xGuI9AiEUIug3oJgu4FvErAl7AoTZGkRXbqUJHtB3aVowkZtj4WTh2Iep3rC+mSG7VrhUmeU/VmIAXLFgb/v5L8M8/NTBr1kgS7V7o1KktiZY9WrfmZgXtF/CLFy+idu3aYmwA06tXL+G+OWDAgFgLvEOHDkLYd+zYIf6zq2pKEHDtaRCUkfmLYLvJyNQIkzdPRp9efdC3f18RevfsjckBkzFo+CC0b9de9Hlocig9uxH27TsIY8Z0I+EegebNa2Ljxi0w+dWXMWgA7pCcO1fxspfcuXNj8ODBVM58KWj4WSxYsEC0Z3O7tjRnUkpAFnAZGU1AltunqGj49vZFpUKVULlQZREqFayE8b3Ho2bJmqiQuwI8+nvA1MxUuVNy80G0dV+8eBudOzeDn19vrFq1i0S8Oho0cKb4lCF07ApYrVo18Zk7KHm+HG4yYVi82Ypmy/vEiRNCwCWxTwn8EQLOD4hdytjFJy7fi4sLd3Jo00i9v4UbN26ITJSQGQe/B3sKsGWYEmYj5H7+z2QZ3jh/A4E3A7+EW4G4euoq7l+/jwe3H+DZw2exLydJfj4jRw57ej7+3MqCtm0bITR0H3x9+0BPj/u5NOXemDB4dssXL16gcOHCIn3xKN4tW7aIOE5rHFekSBHxnQX+yZMn2LZtG65cuSI8S6Q43o/XMzzITHU/1ThN8EcI+Llz54TL2KhRo5RrvsC+xBw3cuT32wgZnmODXdZYyGWSD8nnlt29fgcWbn52Kt06Wgtfo6m5Kc5/OI/zkV/CzcibsM9rj20PtuFczDlMWzNNzJmiOXTx6tUb3LlzT/jgBwez7zNbr9rvasaFefr06WMnA+OOyzRpFP1CcePYvZS/s/uqtbW16MhMyH6qcZrgj2pCuX379lfWF2cSrhYllPLly4vODsmlSyZ54WHNu3btwvbt278aIMGTW/FoOB6dGV8c78dD7BmenpZnH+TCW5Xjx49j//79ym+ah2fNPLzvMA7v+RIOHDkg5gbnl3JrHj2cPn0BBQs2Qa5c9WND377jqbDljrU/Sj5SJH/UE1i3bp2YpU6Cqzo89DouPA8C905z4CHZEk5OTnBzcxODQLhqxFObTpkyRYza4v8pfeSftnPr1i3xDFu1aiWGyzNslQ8cOFA8R26n5Dh+blw4s5DzhFc84yDv9+zZs9h9XFxcvmmSadu2LWrVqqX8plm4Sv8h4gP+q/If/qv6JbQv317MZGma2lSjnZcKDNGhg6cYddmlSyN07twQPXq4Yd++09i6lb0u/pC3w6dg/rgidPHixXj06JH4zO4+cfHz8xMuQ1wF4javFi1aYO/evSKOZ6vj79xuzi8XYNFgYTA0NISvry969uwZW92XSXx45sD58+ejZMmSYsQbN4ew65c0bSzHlSpVSjxXacpY9h5o0KCBiOO2TobnA+/Xr5+YN5wtdkZKF+zrqw2wOPNEVX0m9kGfCV9Cd+/u8JrtBRMjEw0JOJ+T27d5xkFzSu86lGe8MWvWdMyePQ1Tp85HtWpV6P7LzYzawB8n4AcPHowdKsuZOi4FCxYUVvr169dFZwVb6ZKAq4ObVVgMeOY7FoGEdIbKaBZjY2NRSHPzys6dO8W6tWvXCsucR9ppBaST7PPdpXcX9O7bOzYMHDQQxumM4x1pm/QYYdeuw3B2bkEF479USD5BmzZdUbduU9Sp44aGDetQ/kkZboQ8KKds2bK/5WvO3io1a9ZUO7WxNvBHCTi/kYUn7m/SpIkQaisrq9hJaCS4aj1r1izRc8yZXObPg9vAeWZDns9izpw5YsAFz3XBBbcmO5ziwq/5u/PgDhxzOsK5gDMqF6yMsjnKIvB2IFKJ+bY1QSoS7afYv/+0mHmQh9Dv3n0CmzcfxJYth+ge7qOC8TXVYLW/n4iNNO734EmnfhWujXMt7ujRo8o12sUfJeDs35k1a1bRFsrWNWdWds5Xhavp7ErEpXK+fPmUa2W0AWkABVs93EbMQepQ5iYThmtAUpw0MZXkNaTq28vw8+Xtz549K0TdwcFBrNcG+PrDX4fDragbnj96jgd3HuDe9Xt4SuLZvERzhL4OFfMLJT/v8e+/NREcvJeEmsX628BxNWumnNkI2bGBa19xXYQ5TfF0shzUxfHMhNJ0s/y8GC4MpHe4MizwfHwpfSY3f5SA8w3nDi5u9mB43gMpU0uwVc7cu3dPdJrJaB7uY8icObOYryJPnjzCm4gLWJ6AiEfO8WvWuNCNL46HPnMc91twgS0Je5UqVWJnlWMrirfXJvhtO2nTp8XVD1dx+cNl1CThnLRuEuxz2+PjByqoNCLgMeJ5pE1rSXnFQm3gOAMx35GmO1kTRps2bUT/CKcRbjJluGCvU6eOWMd9Lpw2JC8mKY7TEk9Fy/AMhPxqPgsLC+ENJcH9Kmwoaqpp7o8QcPbzZsd66Q0tXGVmjxKG46RpHxn2QGnZsiW6dOmCmTNninkM1O3H/uCq+3Ecz1OtTdOR/inw/ecOyZs3b4rAn3m+bwnORNzh/KM4Dlwo87Nj2EuFJyXiTMe1M22DrTq2/C5cvSCaTLhj/eLZiwgPC9ewGyELMw/S+V5IGeLNcNMZF/ycTvhNTwyPGeFmNfZs4rinT5/GxrEzgxTHaYphqztLliyif4XnQZH6wvhFD/wcpQ705OaPUCMuPdnnl93EmIkTJwprjm8sCzAP9JHiGO7c4LYxvvk8CQ2/pouZMGGC2I9FmkWF95Pi2HuFfYjZOpHRfrhay5aX5FfOhbE2wR4m/LLiAqULYHyP8TDmxcwYC7wWIHeR3FriRsjn52H8igLxb4ab6Xi6WXZoYJ24dOmSWM9urdxRyv1vmkA2J2X+SLg9nS11rnH9888/yrVaBGmjoZEhxs0dhwZdGoj3qFaqVwldvLpg9KzRGnQjVMUAvr6zSbS8EBPDIs6eJynH8k4K2GWVjTtuquVZDbn5RFPizcgCLvNHwsOdeTCQ1IapjXAHmEVaC/GibXYbdKrghCHuQ8Q6zbkRqqJPBeB2qtEuEy8ydnefSOvYi+fvFXGuyfH0s9wsw/0r3ETLoq4pZAGXkdEEOjqIeBcB14KuqOJQBbUdaqOaQzU4FXCCa35XMf+JZjoxVVHMRnjq1BLs3n0SY8fOh6cnizgP8tH0tSWcxo0bC7dSfqUev2mH4YmunJ2dhY83x3EfiRTHI3j51Wo8ajd//vxineSFwrAbsrSem+g0yR8h4Dw6kj1QfnceX3Y1Up1LRUYmqWA5YAv88b3HX4XA64FiJsLP0Z+1QMA/I3v2rChRohCiok5i69bJ8PCYTWKWB1u2HKR4I8VmWgq/fIEHc/Gbd/hVauwXzpNVMdwZyXPocFs2x/GMmBkzZoyN27Rpk4hjLyc+hjSil+F3Z7IXFHumSE4OmuKPEHDuwOSbyr3Hv4Orq6to05JnI5RJathX3cTcFMffHcfxCEW4FHEJDbs0jI3XDlLRtaTC06cvERz8WnTw29mlJwHjznztbkphIWa3YW5O4xkG4w7i4ikXeP2P4vgYkmcTew2x5c6jvTlIsxJqCrkJRUZGY3A35ZclnBavGV5o2LGhcCPkdZpFD8ePnyZLdSeyZKmFrl3HYerUQXj8+BSqVi1L8SnnzTWJxapVqxASEiJmOeUpZzXNHyXgPNyV3f3YjVB15kCeppR7jXmCpLhxPKCH43g/9jFm2AKfNGlS7DwaEkuXLlU7v4qMTGLATSbsjTJ67miksUyjBQJuKES7fv0B6NixHry9e6NbN3arDabwd07q1rFjRzG2QFsGhf1RAs5tilylYZHu0aOHWMfD6lu3bi1GUXE1SDWOR15JcbwfV1u5s4IFnl2D4oo1t6lp66Q2Mn8GLOL8wmrNizfzEQMGtMbixaMwd+5M9OzJUzOzcHNzAzcdaHcTyt/AHyXgPIS+d+/ewv93yZIlQpAfP34sLHPuVVaNEx1IFMcDeaQ4nkeF9+GqEQs9d3KwHzHDb7jmkVxshcvI/B1EiemVjxy5BFfXRqhZ041Ce1Sq5Ibjx89RvDyoTdPIbeBq4M4PHjbP86jwpFjMsWPHxHBa7sCQkUkc2N5Wv2gHxmjYsB3VRNdjx45j2L79qAgHD56jmu0ripffXKVpZAFXA89zwA77ixYtEoNB+L13PM84t32xuMvI/C7cVPf+7Xs4pnaEo9nXobx5eYSHhmuBkOvi1q0HOHt2Oezt7cRMhDExF9GmTW28efN77y+VSRz+KAHn9m5u5uA2bG4OYXjieentO6pxnIHixklTSkouXJkyZRJzn3Cvs42NjXBHkpFJDDiF6VIatMlo81WwzWyLyA+RoolPGyxxzievXoUhOvozatToQfknjMJ76GrFOztl/ggBZx9OHjIdFBQk3mnJs8/x67Q48fGc0DwJFc8qFjeOR2CpxrGlzb7g0hzUPB2p9Db7NWvWxA4CkJH5bchI4MmsDlw/gAM3v4ST10/CPpc9PkV9mXNac0SjfPmiaNx4EE6eXI3IyCikTl0BJ05cRp482US8jGb5IwScR0PxiCl+QTHPMMiizA74EuXKlYudffB7cfwmc35TD7/UmOFOTh4qy80p2bJxgpWRSSTIgOX5wHlK45nTv4Qp86aIGp+unjZkzQ+YMcMTvXo1h62tBdaunYLmzV2wePE48W7Sv9EPXNuQ28DjgSdqZ2uc37TBE7hLTTIyMokBN498jPwI3+6+8O3xJYztNBZ12tRBasvUGnIl5HPyyxp45CEHHYwaNZz+8ws0cmLFisVUM+WO/JTxNp4/HVnA44HbxwcOHChcDu3t7ZVrZWQSB+5nMTQ2wtQdUzF1+5cwacskdHPvBv1U+hoScGPs3HkQFSq4kQHTThmaKv+3ptCQ4hrg2LHztK3sRqhpZAGPB57/gH1gte01XDJ/Dvxi4MoulVG5hiI413BGtVrVoGeuh8/irTeaQA8PHz7H4cPnheugusBxz5/LboTagCzgMjIagtu52TXVQccBw7sMhzktXWp2wal9p0gaNSWO79G6dS2EhvIb6Q/j3bsjePx4Jw4enKeMB3x8eqB+fRf6JE/6pmlkAZeR0QDsBfUmNBxtyrRBjgI5sH3ZdowZOQa22WzRpXIXhLwKocypiewZI15YbGGRHmFh7/Ho0XM4ODRGZbqmrFkzYPjwjhg4sBttp3gnpIxmkQVcRkZDRH/6hEzZMuHc5XNYsH0BlkxYgjp166BQiUIadCPkdndjPHz4lKzsPsiTh9u8i6JbNzcEBp6FpyfPBcTbyM0n2oAs4DIyGoLn1uYXkYybNQ53HtyBQ3EH+K/1x/NnzzXoRmiAu3dvo1mz/jh9+ppY4+JSBkWL5sSUKRMxdeps+PrOom2CKEazc2HLyAIuI6MxWKRDX4TC+z9vePzrgXMHz2HTgk2o0aqGBt0IDbBv32kcPXpR+R1kfY9Hmzaj0Lu3H3r18sPAgVNx6dJtimF3QxlNIgu4jIwGkNwIp+2ahmk7FYFdCmfsmYH+w/rDIJWBhgT8A2rUKIstW3g+/GlqA8eVLVuYtpUH8mgaWcBlZDQEuxE6VXWCk4sTnF2cUbt6bRzbfAzOeZ0RFhYmBvskP9HIlMkOtWpVhQtdl7rAcTY2PC+QplwdZSRkAZeR0SDRtLBQL5i8APY69lg/fz3CXoaJyaw0B89xwiMtvxfkeVC0AVnAZWQ0BIt04P1ArJizAlMGTIFtFltM3TYV5yLOabANXCYlIQu4jIwGYD/wiHcRqJujLsZ2GYtmHZvhRtANlKlURrxSTbswoWCqEswoyG6E2oAs4DIyGoCt61QG+mg1oBUcXR1x7vQ5eE31wrN7z2BFizbMBa7w9zbDHKohTJo0D5MnzxfBx2eG7EaoJcgCLiOjCUgbDQ0NMNJnJMYvHg/rzNbw6+WHUT1GYUjPIYh4H6EFIm4Ib+9p6NHDB337TkSfPhNEGDx4muxGqCXIAi4joyHYCg+lxTy9OYZNGYY5B+bgTcgbrJ22Fh8/fNQCAU+FFSt2YtEiD+zePQO7dk0XYdu2yXB0lN0ItQFZwGVkNMxHWtJmTovyFcvDz98P/tf9YZbGTIMzEn6B3y7o5OSIKlWcUK1aJRFcXavA2lp2I9QGZAGXkdEC2J2QOy+tM1ojZ96cWvJGHoWvesaMzjAyKkKhmAg6OgWwadM+ijVSbCSjMWQBl5HRIljIP9GiHXxGzpyZkDt3FvFfClmy2MDMzJjiZTdHTSMLuIyMjAosyuxdwq6CH+HvPw83bx7GlSv7Y0NQ0GlUrlye4nlAj4wmkQVcRkZGBQNcvnwDHh4T8ODBE6xevQa+vhMxceLk2DBunA/u3LlD28peKJpGFnAZGRkVDHDixGV4es7DrVsPMG3aagwcOAX9+k2KDUOHziCRlwVcG5AFXEZGRoUPcHUth82bJ6FYsbyYPLk/du2agd27Z8aGHTumwdGxCG0ruxFqGlnAZWQSETF/yefPYp4TMSEVhZjP6jv7PtN6dhWUtlUbeGFfvmQjGhkz2qJ27aqwsrJAyZJFUa1aBVSpUj42VK9eCdbWaWlb2Y1Q08gCLiOTSFilMUPA4SuwrzYA2Rt4iJCtzjBU6z0DNuktaAtJiGNgaZUabYq3RP1sddAge914g4t9VSwdsxDpbVkwkwtpNsIYvH0bigwZKsHEpCQMDYuJoKNTEFu2HKR42Y1Q08gCLiOTCMTERMLZuSTeRZzE/Qc7EfjwS3j56gD8/f1oq3eKjUkcjxxZhOdP/oeHgdu+H+5vxfu3x/Dff01oP2n/5MIY5cq1h5GRoXgBRZEiuZEvnz309VPh40d+qbE2zNfydyMLuIxMosEWNluv3LSgLqiiLj6+wMdMzmaUL0RHf8aOHcuRNm1qLFw4GhcunEWbNk3JMk/uwkRGHbKAy8jIxAtPe7tixQpUrVoGtWp1IxH3xenTZ2BgYKjcQkaTyAIuIyMTDx8xcmQnzJ27EdOnj0KdOhXRvr0nMmWyhpNTCREvo1lkAZeRkYmHKDRoUAsbN/rB1FSHxLwXtm2bhBkzhsPW1o7i5deqaRpZwGVkZL6BOy3ZezEm5h3Kli1O/z/BwsJAzESYOXM62kIeRq8NyAIuIyOjggkWLNgEXd2SZHWXg7l5BZiZlaFQHoaGpWFgUJTiimHTpkO0rexGqGlkAZeRkVEhhixtc+TIkRn6+vp49y5CBB5UVLq0g3AlzJbNjoSd35OpGc8YmS/IAi4jI6NCBBo2rIY7dw5jyJD2cHV1hJ6eLiwtU8PTszOWLPHB/ftn4excjraVm1E0jSzgMjIyceD5yF9i8OBO2LZtMTw8OqNmzXIk2v+hTZvB8PPzxu3b8jsxtQGdGO6tUFK/Tn1U7lEZFatWFK95+hn0aXHN7orbV27D2IQne5dJbEa4j0CIRQi6Degm3t6iDkNaXHO54vLpy0hjkUa59ltOnDgFd/f/sHfvSvoWrlipFjPKuC0QE2MFW1trUZWW+QLnnn37diI4eLdyTXJiCh+fqXj71hqjR49UrlNPgQIFsNvPDxlsbEAPUblWia4ustV2xd2gzcLa/paMuHv3PnLmLKv8DmzY4Iv69V3p00dcvX4bHRqPxvH160AXo9jge+jo4E14OIq1b6+cllYmLrv37sV0Dw9sWriQsqcif0Z8+ACHli1x7/598Z2RBTwFoRkB18PFi9cRGPiY851MHDj3WFqmQYUKxZRrkpOkFnC2sPXRoEE3PHnyEidPXhGWuLt7exLzzEif3oridWQBTwJkAf8D0YyAM5yRpYwtt7qpJ7GnVk1ITSdpBJwVQUfHBF26DMPmzYfw9GkwMme2wZEj82FkZAJra1vaiX8vH0dPFvAkQBbwPxDNCbgCTiovX4biU5S2vLPxzySVfiqybi1J535U5UkKATfD/Pkr0bGjlzi/JA/82dBQn3aNwcePUWJwT716NShGbkJJCjQi4DXsa2D5vOVUSsv+oYmNqakpJvhOgGVJS3Tu01kDAq6LV69CYZPBBdnz2VNGToiFKPOz6JKY3rt+H8+f7kLatJa05nv3OSkE3BQbNmwTb+ExN+f3YqqikIrw8HeYO3eY0hPlkyzgSUCyC3gqWkZ2GomH9x+KRCiTuPBjio6KRkf3jihfpTxVYNVX2ZNSwJ8/e4myzv9h37W98RYgMr+HCS3O+Svj2L6ZsLFNT2uSW8A57/JLjXmyqlhpiAPXDNiFkIfS/1oTytt375CjUSNMmDwZUVFRyggZhv3vT589i8cU/OfMSR4BZ8xo0ZHnCE4y+N5G0MLPJr77nJQC/oIEvIxzF2y9tlVchyp8Pea0RNHC4q56fd+LU4XfZmNMiwEtb2nht9EkBN7PiBb+7dJ+vI5rhaa08Dm/d88Siuox+fdzIfq7x4wL//5a+WvhxL7ZsNaYgP8MvyDgRNSnTxg2cyZev35Nep649zClw4LMNdyqZcuiSa1aQKTCWEs0AWehlvkaFomECk5SogkBZxF7/+49xnYeC4fSDmjTow3ZZ4pBHhwX8T4CYzqNgUMpiuv5JS4uLMIbV2zEgYADGDhtINKTgCXknvJ+ASsDsG/jPoycOhLmGczpanVx/fJ1zBo+C2493FCucrl4ay0JhcX7xtUbmDlsJpp2a/rdmtCv8rcIuMDcXPlB5hu4UOOXZkRQPlMWcIki4NGfotGjeg+EU4aVC05FaalH+cFvox+sM1gnWMRZDKJpkbZnoWPLM/Zh/AC+9erEQ1MCHhYaBmcrZ1SsVRELtyxEKC1S3IfQD3C0ckS5muWwYOsCOpv687GVPqz7MKybsQ7+N/yRM09OfBKDSr4P7ze8x3Csnb4W+Uvkx+KDi2FqYoq9O/aip2tPDJg6AO16tMO733yjDRcU+3ftF+m/3+R+6NCrw28fMy5/lYBL6OkBqVIpMpOMghh6RnGalhJFwD9GfkTjrPVwcOYcUQ2KC7d/c5sWH5arRqn4wRDSafQonj/zi1r5P4eU3GZuZmKCWj17wX2HN3LlySFE+UcIwek2DE71neFYxVGI+G3KBF1IHI2MDYU4fw9d2uBTdAzWXlsnPH64ai+haQFnuo3phh5De4jmDLaEGzk0wr1r92IFXDRzUAJlY4DRowysp0uZmAgJDkFYSBgy2mcU3hhclRTp5DOlJ/rhqfRSffV7GVUBZ3IUyIGtl7di947dXwk4X/Onz5/wOZoyB91DPhan0egYug46pGo6lNImx0tVfFUB7zOhD9r1pWNGR4jj8DPk+8DH+RT9KTZdS3HS8Rj+Tfyb1TUdaE7Aa5KAb/lFAb9FAu75awJubIy1mzejm48P0pipr9nr0nNXvVf8lqD44Ovn25ySO9kjyfIuTc/Lf/p0qtp/6WtSJ+AKdf0JOAmyKOfInYtSapzOB0NDXLt6FcVbt0JWOzsEPnmCyX37omu7dgCd/DMJfmhoKG1mCDOK7zxgAOZu2ICHO3ciE32nJ6M8UAqCEp0JiyiXmAmApIqKxnd4+iAMz5+8puypsMPz5MuD9uP7IKzDMMx2oHwQj+HJyfgdncr5pTk+KfTgF+Ej/cwBaFuFPv2Qx4GPRTMJi3doSCiePXimjFGIPQtcF6cueHD7AQyMDGBqboplZ5YhrUFaTPSeiOUTlmPj7Y1Ib5ceTpZOMKRCLU3aNHj+8Dk8l3rC1c31G8tcyuCpLVOL7UI/hArBZ4QQ0xL8PBiN8jWCRXoLvA5+DecGzvCb54d2ddvh0JZDOBJ6BMYWxiSLplgxdwVGdxmNyVsno0rNKrHNPtJ5FngtwNoZa/Hq2SusurgKWXNmFeeYM3oOFo5bKAqgZw+fYcW5FcidKzcO7z+MrpW7CuHm37P87HJkz51dfQ2DzpHQJ8PXIxUM3+UH27F74MNHT8T1/QypUunhGRXsvwxd1xPav0X7Gpjs1x/hcV7Vxsd/9zZCuK+y0WdE6YVfKPHxo+K+cTyHyMgoIdovX4SKd3ZaUXpJ0H3RMrgAun3nAdpRgcj3Ji5xf9Ovm76UCYXgSoFu3vnz51HYzQ1NXVxw8/BhzHZ3x39Uss5bulTEvwgPR7oqVdBh7FjKaalJ0xWZ4jNb6QYG/DS+HI+te2m9ahyv50QmrdfX/7KPuv048Pa8XtqG94kbx/+pYOHrjN2O4XWMtE5dSGBCYUH7+CkCo7tPxuEzvTCy0148uxMoRJ0zf4bMNoixMyWrjsoFujR1wdQEaHAL8DiyEhamZpTRtS+RBswLgP9Mf2SkpX3Z9nj/9osVwRbmEu8lCKUMOXrZaIyYPwJ3Lt9B//r9Rd/Kxw+Kmp9keUd9jEIRxyI4d/ccGnVuhKHNhuLOjTvC60kdS49TWiP4vKmNU4vPDDdPjek8BrkL58bETRPR3r09AuYHYOnCpchTNI/YhtvM+Rm9iX6DuzfvCgs6tVVqYUHHpdOITjh59yTsstmhacGmokns/LHzCFgQgJ4+PTEhYAIs01miWaFmYnth9RPGZsaYsXMGcpEBlJDmoWSBhCJXpsyoXbkvajn1/qlQvXwPdG87HgVz51TkhV+An7Mh50V6/uZmpirBgmpmxujd2w/ly3dAyxbDUaigG25cf0BxaSmYk4EQjrNn6Lnp6MJA3wA5c9ZDy5bDYWZqrXKclBNMjM1gSpk8oWVP4rVdkCjW6tULVhYWWDJhAvD8Odq2bo1Wdeui05gxeEjWuP/27WLTm3fv4tm5c6Sf/NCANVSFWrhyJfYdP07PkKpRLKLm5jhw8iTmr1olQmwcu9hcuIDVmzZh3ZYtWEX/uQoYC8UfOHZMHHPB6tVi35OXLin25btC/7fv3x973BMcZ2mJM3TMFevX4x1XWbjkI0F//PQplqxdi8CHDxUC/5uweJ0O2I+1C0mFs7vSbyyL/f87S5b0R9GeXatSJXzu3BWz6HRq9Yku60ooYOdYEKZpjNQKi6axzWIL+3z2uHDqAtbvofsZ/g5lXMooYyGaT/q798fkdZMxovUIzPaYrYyJHy6kVPsLvgeLYvla5UWTzvGDlGaUsAW9JGAJWvRugX9L/ov/rfmfWP+OLL7Ro0YjR74c6O7SHVa0XNpzCSsnrcSgiYNQ/p/yapsT+ZpUBZifX5myZbD1/FYc2XEE/Rv0F01BunGaJLp7dEc5x9/vUE1USHj3Ll6My1s24+LmTT8dru/YjrmeZDGqVPd/HlYs1aCDt2/D0LmzB3bvPoldu+bi3LmdaNSoCpycOuHYsZO0TVpMn74R//zTFjduPCM9kSbX4rxqSoGbZPgzpxs+JsPr1cWprufjSOvj7idtw89ViufPvC5uHH/nMTHSsfg/f+f10r7xhYTxdepKDFgk2bJmEeReVGVDPJeyl5VO+y9fv8aDZ89EezhzhQT9wJkzaDpwIHbs2iWsc3ZkbzpgAM5ev46Lt26hCX0WcWnSYAaJarOhQ9Fk8GCco/ivqhpGRhgxezbchgzBmWvXsIVqAm503JNUGHChMG/ZMjSh77dJlA+ePQs3Ou7NixexkAS/5fDheMnXzNdlbIwTdF1tRo7EPrq2WEv8F2HL7mnIAwRsugekq8cD2IAcozC+/2rovWf7W+EiWNK5IK7YZcP9ELHT15Cojw0CKg7tj2zWdpQcOEFoFyXKlUCngZ2wdclW/Ff1PwQ/Dca4ueOUsYp25D2H9qCjS0c4VnfErI2zlDGJBCU/Pt+TwCeYPeJL4cAW8rx58zCk+RD09e2LgeMGivV837lQqdepHpXRepjoNxH+S6n2kD0jHMo5iGeSELhGEPQkCJ0bdsbrl6+xdN9SZMmehSp3X1vZLNxaY3mrwt4OLMC/GtjVTU2V/9fRJ8G+gcWLt5AF3g7Fi5egw7/CnDljEBr6BiNHzsGDB5ewbdt+sfWkSQvw+nUYbaODe/ceYNiwERg0aAwJ+2OK5ZHhuggLi4GHxwT07+/1VVw0FWA+PtPh7T0dgwePxZ49R2i9lN91aL+38PKaglGjJop93d298fQpt/WzlaWPR4/eYOjQcSpx3Keki7Fjp2IppSWu/ykwwJIl68T6xGqjT3wBj4dUlDlG9+8vPpcrWRKlatcWjfLM2EGDMIHEM5iEfcnWrULAl+/YgRehoQgND0fImzd4FRaGxRynIqQT+vTBeHf3eKtuM8ny96BaAbfFbzp4UDSZcEfJXNqHb+Cbd+8QRFb2qp070b9lS2TNkAF9Ro8Wx3ty/z68pk1DhWLF4FKGLEgW9t+AM3hYYDD2rHkEZHRRFLLc+mI7FmP7jaYy2VRk7kqlSqPsYl+4m2bCC9XmQEorAaT9Bg2qI3eJLGqtQm3gXQRZ3PXKoEi5IuJ793Hd8dn0S2LlTtbda3fj5ZOX6DeoX5JMu/DZ5DP+G/Of8psCFvAVE1dAJ0YHvbr0osf55f6xf3rH3h3Rf3J/TBkwBdfOXsPUjVNJNIqLZ6IObpJJTQsXzAw/37tX7uLsATIKWrqhkHUheYBKosE6wfeSCwhFJym32ZuaGpNU8IslIKYeUHRgcju5PnLlyiwm32rWrA8J7ANa/xlt2w7E8uXbUa5cUVy4cAtubr2VcSDhnYUhQ6Zj585jsLHhSbokK5iFPxzDh8/C1q1HUKhQLjE/TMuWffHuXTgVGiGoV68z1RJOiQnNduw4TnH98PJlCB1zJhU4m+gY3JTHTYLmmDlzAxUus1KegAtIMAWcsCUrneH18fReVy9bFq1r1cL+OXMwqnNnRWmvpGHNmtBRFgJq4RFMKtuzCDdp0gS7yBpfvGULqv3zj2I1XU92R0dkzZQJAQcOiDb557TvBbL8y1ImzpgnzzcuPT+DDt3mt2EhGNh5HpBrJtfzFXAaSdsY6zb/i0Ht+gnr9A3CUaVECVyzyIhgKc3SU9r/BFjqVBltZo+CrWVa0aSgjbBoFbAogPyF8ovvrg1cYWAoWSD0OGjpMKwD8hTJg1a1W6F5xebKmMSBMzCLadfBXdHDu4dyrcLy9VrhBV19XTiVdoJXLy9ljAJ2B6zVuJb4nCVbFhQrVExY5myhq2PRpEVwcnTCg7sPhAspFwLFKxVH426NMdFzIso7lhdx7EmTIlDtF0rqkAiWOqeztGkLoHz5UuJwLVvWix36b2dni9ate8PRsYQQ6ufPX4l0sXHjfrx6FUY1sQ24desBLl26Q3HBQvjZCndwyE4iPQMFCxako3xrIOXPnwv//tuHtsuN/fvPiCkFTEyM4OvbG127NsSUKavw+PELEcc1L55y99ixc2TZT6C9rTFmjC9OnbqE9et9kSqV1NzzeyRq6hJuWGwNc+mibDPmG/cNfMcT+BCdy5VDFhJWIfh8bFVrm6t9P4OpKRq3aQP/vXvxiC18qUBhyNrfNH48CjdrhizVqpElGYHqJPBjOnYEFcG/l+hiouFWpjsexOygwph+i2rhy7fHqixZfQOEWPASQsvkAB+0KuKGg5HPYGYEPOSfmjErMqdOi9e0aBPcHmyWxgyb722GkakRHtHSfnR7NO3XFJaZyTJKpRcbF0ZLBtsMmLlrpvBIYljgjSgjPKeli2cXtOjbAjaZbRT73af9pLhRFNdHEafaDMHi23lkZzTv3VzEce2E02Krnq3g3MgZVtZWQowLFSuEtZfXUpn+XjSXsLiydwsXKvwbdMx0Ys/HfuxxxZsLgaLli4pt2AWSMylfe7as2YSAGxsYo693X7j1chOdluxtpZtKV+xXpHwRBNwJgCVZinw+rYLuRTEybELfhCnycBISTvd+3+w5KJA3708YRfwcOHBmka6Pv/P+0jHYkJO0hjMY5+24x48R0+DOmTOUTv2JRFQPtrbpyK5TbGdpaYFMmbLTJ85f6vI7pzk2NBVpj6XNwMBc7Ofs3IUs+DawtrbEmjW7xX0sXVoxxfAVqplxe/uVK3dIRnRQpkxR+s6/4/eNsMR7WmTd3tiwQdzCIk2b4mNkJPp6eoqmkKMLF8KORZh+MWeccLa2SRR14xNF2s5SOUrryaNHOHf2LHSKFEFPEljRGfkbRCoTTTQVMk8ecxuYEvpuYWGBG+vX42lwsGhO2TF3LmVAKuN+o7rDIvDqxSs8f0K32jyOeEsYZ8DtsEXo16gdLGjhtm3rNOnxwSY9XlK6PP0SmFqqArwm9NM68ZbgBJvZPjPSWacTtQNLK0vRBswiyYlWimOhZIG1pISeI08OETJn+7KfhZXF1/vFE6cK36+4cbxOz1gP2XJkgxlZZtJ57bLYIWfenLDPZS+OLcUx7HYonU9d/wJvZ2RsJLbJljObOE4W+yyI0lWkKS5UDMwMkD1XdhHHvzlj5oyK/YyMkDVHVpil1k7PoVehr3BhYDVcTMJw16MWCqXTx+t3CTG8YqgAVFipr1+/ob98jw3x4gV3DlHFlQpe3uYL/Nzj0RMVTExMSKQLwsbGRk1hxc88rujHD1vuT548RNGibmjVyhVjx/rSWr6OGJKMaKoJWOPIkQVYt243/RZ7BAQcxPHji5AhA7/VP3Fq0L8m4Cy8dCO4o081mKZLh+sk2CZkeVTq3Bn7T5/GrvnzUdbJiXM4rLNlw5UtW3CXRHnV5s0oRlWVIrlzw5DEWp9CMSqV8+XKJQqDyd7e6N68OXqQaHcZOxadGjXCVB8fEZc3Rw6xn1Hq1KLT8qvroCpakXz54EiCz9/NLC2R394e9lmzUg77hM2LFqFp9epoMmgQxtHnEvnzw56uS7St076GadKgYrFiKFmggLDYxXrV46sLcTwNJDij8iCT9mU7ITL7YUX64k3VBQMbvHidGQ9f3xdNANx5tuz4UvxrXRD3KD57fnvajDfULLr0I3jCJfaoibtwuzC3cfNn/s/f1cXxIsVLS0L2ixunuqiL4yYpXsf/pXX8XXVRjZPipfOpW6Rjqi4JiVd3LeoWvrcKyz95RZ7PaEq1CTOjpAtURRGip65S/i0fyYItiW3bpmP8+KXw8JiMM2fOo3BhN9SsWR4bNkyjbcKRJYutOB43TXz4EL9nDxsD3ETCtb4bN06iQ4eRyJ27Pu7dewT2G/8V+LxcyLAg85zpt24dogLmBcVIBUkUHB0dMX/+SJKtT1i82JN+U2mxPrH4+ZGYVN2om8EVvl16kBX7bSnCN4pHJ0qfuaOS25j5M8OeJ6YU/4EsdF7H/p/hyqYMcxJMbtt6r2zXNiVxlAYWsMUsXPwIYxJtA319MaMZO/erwj9H2o+PK52PRzdJ5+TvkvXP31XjGL4O6XzSuvgwJoEfOnMm/I7OQA6yvFTbprnj7PD/DmGomzvexIyjH09iH1/G1KF7FnwI//Z/AXffsWK4ufBJfvIGHat1xM4rO0XTStxqfVxYfBI2EvM03N27YO/eVfQtISMxdRD8MgR5Crmhm08PREUmXiKU+YI+ieiMQVNx4+IqpKeagPoqm4Qpids0vHmTDl5eo5Tr1FOAjKX/kTFkZ2tLh4xzTMor2Vyq4s7IekgVjzGSKJgYwGXMOgwb4IPyJYqSjlEaorw4afY8PDN9C5+xPJpUNS1yXklNlutmLF++FjyA0IpqWtOnjyd7kMWa49Ng7twF2LlzD+bMGYehQ8eTMNtjwIBB2LhxDVau3ARf36HIli07Xr16gz59hopBPzEx0Rg4sDdKlChMl/FGvLwib17erxcdU7Ug4GmUQ9CjhweqVnVE27adMW/eLBw4cAIzZ3oiDdWU795lrxcvcVu5TVxPTwd+fsNEjZ4t8hMnTtBzmovBg7uiVKmStO57Dgh6uHPvPprU6IFzmwK+9BsSrKX5W7TA/cBA5RrKlT8r4Nx7OmfkHIQoXXb+dvj2GRsYoqN7B6SxTPNV1ZvFdNGURXjx6AUMUnG1MR7xFlAVn9JNaZfKqORSUbSbsli/DX+LLYu2iPZcbmf9EUkp4BERHzBq1Fy8D38nP/skgtOTibmJeJGwsTH7DH8vzSSigFevhjs+TZJYwA3hMmIFhvUdSwJeLFbAZy1Zilm716FOrQpCXFUR+Yvug7GxofjMasVeIRK8zszMhCrP+sLdL3VqU6poR9M9eUuHphoNnTMs7J3or2CjjuMZTr9v374XBil/trAwF/txx2TctM1D+dOkMadr+yj24fMZUkHL18HD+tmCNzc3FdciwednTxlex9vyPrwvH+N7eYfjXgaH4trx+zjp75/4As5ws4DM13BHWtx2U25CYfdAHmmZEFiwWbh50IlkafN/rlZ/zyNClaQTcIbP/3t9EDIJhTvLvifeTOIJuG1lZ5TKYBg7NiMp0KfCYeeVR9i7cBlKFi6kEHCyqu+SIG0/fFR0/H5P3P4WWJJz2WeBa8WKotlXItEEXEZ7SVoBl9EuEknASTRPXLqM1+9/0qvrJ2GhMSBrtkwBB9GMKcxpDuzCyH1NX6RIhp+RylSyjCzgfwGygP9NJJKAMyyiyWX9suUti/VPo07ANe/WICMjo3lYVD+S0ZYcQRbvREMWcBkZGZkUiizgMjIyMikUWcBlZGRkUiiygMvIyMikUGQBl5GRkUmhyAIuIyMjk0KRBVxGRkYmhfLVQJ56deqhZo+acKrqJA/kSaHwbHfOuZxx8fTFHwzkOQV39+7Yu3c9fZMH8qRMeCDPJLx5kyZhA3mmToVdhgzqB/LIaD1iIE+DBvGPxGzSqAk+Wn9EvqL5xIT1MikPng97tvtsBN4ORGqebjcezp49hyZNamL48A6IiIh/Gk4Z7cXIyAD+/rtRpkwdeo7uyrXqKVSoEJr+8w/SWlhAJcvLpCD4XQaTN2xAYFCQck0cAd+wcQMO7jsIPR09ilGulElR8OM0tzDHsGHDIL31Xx08b7Gvr5+Y/U2eQChlosi6MWjWrCn+Ub4eMD5mz56NqzduqHmJgUxKgZ93tsyZ0bdvX+WaOAIuIyMjI5NykItjGRkZmRQJ8H8gOAqnWgG1GAAAAABJRU5ErkJggg==\"></p><p>Desain tersebut merupakan desain yang salah karena…</p>', 'Tidak responsif', 'Tata letak tidak konsisten', 'Warna kurang kontras', 'Posisi menu tidak tepat', 'Tata letak tidak konsisten', '2024-07-07 10:19:38', '2024-07-07 10:19:38'),
('613a4d0f-b415-402f-a2a3-e0c8f021271c', '191363a0-ca3e-47f8-a783-fce55f7ce336', '<p>Perbedaan fungsi dan prosedur adalah...</p>', 'Fungsi memiliki parameter sedangkan prosedur tidak', 'Fungsi menghasilkan nilai balik sedangkan prosedur tidak', 'Fungsi dapat dipanngil dalam fungsi main sedangkan prosedur tidak', 'Fungsi tidak memiliki nilai balik sedangkan prosedur memiliki nilai balik', 'Fungsi menghasilkan nilai balik sedangkan prosedur tidak', '2024-07-07 10:17:33', '2024-07-07 10:17:33'),
('9e8c8fb0-9dd2-40fb-8ff3-84d2c81ddbbe', '275ef8d1-3997-4870-a73a-7328eae331ed', '<p>Pendekatan skenario yang dapat digunakan untuk merancang desain antar muka yang baik kecuali…&nbsp;</p>', 'Storyboard', 'Prototype', 'Dokumentation', 'Video mock - up', 'Dokumentation', '2024-07-07 10:18:25', '2024-07-07 10:18:25'),
('e9a476fd-6c89-4da1-8b35-08a8f6a59993', '6aadfb64-531a-45dc-b02e-4619fb25cd41', '<p>Diberikan sebuah algoritma sebagai berikut: </p><p>Apabila diinputkan warna merah maka akan berubah menjadi warna hijau. Apabila yang diinputkan warna hijau maka akan berubah menjadi warna putih. Dan jika yang diinputkan selain warna merah dan warna hijau maka akan berubah menjadi warna ungu. Jika kondisi input warna adalah hitam, maka warna tersebut berubah menjadi warna apa?</p>', 'Merah', 'Ungu', 'Hijau', 'Putih', 'Ungu', '2024-07-07 10:16:12', '2024-07-07 10:16:12');

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
('885280c0-0e8f-4c00-8fde-9cd197f60bba', '41bc850c-897d-4d9b-99f6-94669c18ef3d', 'Wawancara', 'Wawancara', '2024-07-16 05:15:35', '2024-07-16 05:15:35'),
('a8e79815-45fa-4c72-bbf8-4e26fa59b31a', '380617ea-6423-492e-b1d7-b899955bc508', 'Ujian Tulis Susulan', 'Ujian', '2024-07-16 10:07:05', '2024-07-16 10:07:05'),
('bbd1d7d5-3d10-4d8c-b8da-fe4b63dfe3f3', '41bc850c-897d-4d9b-99f6-94669c18ef3d', 'Ujian Tulis ', 'Ujian', '2024-07-16 12:19:45', '2024-07-16 12:19:45'),
('ccb85eee-6489-41e0-9d59-34b3fa8549ec', '380617ea-6423-492e-b1d7-b899955bc508', 'Ujian Tulis ', 'Ujian', '2024-07-16 04:54:21', '2024-07-16 04:54:21');

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
('32c1b52b-561e-4a79-b455-d9c34b8bceeb', 'Close', '2024-07-17 12:19:00', '2024-07-18 12:19:00', 'Ujian Tulis ', 'Ydd2DefFbl', '2024-07-19 12:19:00', 'bbd1d7d5-3d10-4d8c-b8da-fe4b63dfe3f3', '2024-07-16 12:19:45', '2024-07-16 13:11:48'),
('6b3a47e5-e78d-4c57-a90f-81e68f0f0489', 'Open', '2024-07-16 10:06:00', '2024-07-17 10:06:00', 'Ujian Tulis Susulan', 'R6WMAxdoan', '2024-07-27 10:06:00', 'a8e79815-45fa-4c72-bbf8-4e26fa59b31a', '2024-07-16 10:07:05', '2024-07-16 10:07:05'),
('e45fc3ff-8dac-4a0f-a6a8-09edbe8006a5', 'Open', '2024-07-16 05:28:00', '2024-07-23 04:53:00', 'Ujian Tulis ', 'HAQck5efkO', '2024-07-23 17:00:00', 'ccb85eee-6489-41e0-9d59-34b3fa8549ec', '2024-07-16 04:54:21', '2024-07-16 05:28:09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idLabor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nim` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nomor_asisten` varchar(255) DEFAULT NULL,
  `angkatan` varchar(255) DEFAULT NULL,
  `jenisPengguna` enum('Asisten','Calon Asisten','Ex-Asisten') NOT NULL,
  `AksesRole` enum('User','Admin','Super Admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'User',
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Pendaftar','Tahapan1','Tahapan2','Gagal','Lulus') NOT NULL DEFAULT 'Pendaftar',
  `nama_file` text,
  `nomor_hp` varchar(255) DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tanggal_lahir` varchar(255) DEFAULT NULL,
  `JenisKelamin` enum('Pria','Wanita') NOT NULL,
  `alamat` text,
  `kode_verifikasi` varchar(255) DEFAULT NULL,
  `status_akun` enum('Terverifikasi','Tidak Terverifikasi') DEFAULT NULL,
  `verifikasiToken` varchar(225) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `idLabor`, `nim`, `email`, `nomor_asisten`, `angkatan`, `jenisPengguna`, `AksesRole`, `nama`, `password`, `status`, `nama_file`, `nomor_hp`, `tempat_lahir`, `tanggal_lahir`, `JenisKelamin`, `alamat`, `kode_verifikasi`, `status_akun`, `verifikasiToken`, `createdAt`, `updatedAt`) VALUES
('0807d002-bbf9-431c-beb8-57a54d00b78c', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '44', 'Hsuwoqowokfu@gmail.com', '', '2023', 'Calon Asisten', 'User', 'Ye7wjebdndkke', '$argon2id$v=19$m=65536,t=3,p=4$TKcuDivybkYd6EgFpYiBZQ$YbIyNrx2CvzuCDGmQqCrZQ+o1leCPNWTu8eewnNT9hM', 'Pendaftar', '2024-VI-02328-2.pdf', '65649494', 'Hwuwusue', '2024-07-02 00:00:00', 'Pria', '8wjsnjdjdjd', NULL, NULL, NULL, '2024-07-02 01:13:18', '2024-07-05 04:59:42'),
('41b3a8e4-79c6-4f34-a76f-c36da9a13d56', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522011', 'asdagasdasdsdi@gmail.com', '', '2020', 'Calon Asisten', 'User', 'Jafal Bahiaqi', '$argon2id$v=19$m=65536,t=3,p=4$+zDooWKULzmQNGpq7ke2SQ$nb9c7VNBW7sZ1ulMYtJbyCANNXsiLJu3c/vvUDfEurE', 'Lulus', NULL, '081270403357', 'Lubuk Basung', '2001-08-20 00:00:00', 'Pria', 'Kota Padang', NULL, NULL, NULL, '2024-06-17 12:53:03', '2024-07-07 09:57:12'),
('53898a57-2e18-4b59-ad62-1ab78ac65d71', NULL, '5213123', 'manazilyuni4@gmail.com', NULL, NULL, 'Calon Asisten', 'Super Admin', 'SuperAdmin', '$argon2id$v=19$m=65536,t=3,p=4$6X75PRVgZAMoMXIB9N+ZVA$dVnuu3RJ7MDW58MKmZ8uw2eFQdpnqHaoEVAICEFWu1E', 'Pendaftar', NULL, NULL, NULL, NULL, 'Pria', NULL, NULL, 'Terverifikasi', NULL, '2024-07-17 15:30:42', '2024-07-17 16:00:30'),
('551e5976-0ba1-4ea3-a171-a0d636c55fed', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522009', 'asdasdi@gmail.com', 'LEA.V.03.SI', '2020', 'Asisten', 'User', 'Ahmad Hamdi', '$argon2id$v=19$m=65536,t=3,p=4$V02JBJc319qiM8sA2pNL9w$kkufpguW2Tla6MxrziofsuJFBUcUxd0ysgm+ayVAvtE', 'Lulus', NULL, '081270403357', 'Lubuk Basung', '01/08/2001', 'Pria', 'Kota Padang', NULL, NULL, NULL, '2024-06-17 12:50:52', '2024-06-17 12:50:52'),
('621d6915-26c9-4944-a5cc-544291352ab4', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '33', 'Hshshdjsi@gmail.com', '', '2025', 'Calon Asisten', 'User', 'Heuwjwndnd', '$argon2id$v=19$m=65536,t=3,p=4$MjNaMBcD2C1lQo0FVkBhdA$f+yPLSN9iH56UUcxne6GZB7WoHq/pdjNVdTU5NW62h8', 'Tahapan1', '2024-VI-02328-2.pdf', '94646495', 'Bsysushs', '2024-07-02 00:00:00', 'Pria', 'Hsusjsns', NULL, 'Terverifikasi', NULL, '2024-07-02 01:10:59', '2024-07-07 17:15:41'),
('722052f4-b3d9-49f4-9052-e48683d14542', '7f2da845-7224-4025-a07c-354554faa808', '2111521017', 'kemalhiero@gmail.com', 'Hahajja', '2021', 'Asisten', 'Admin', 'Al - Amin', '$argon2id$v=19$m=65536,t=3,p=4$qDNaDfCSfPy3HD92971iMg$JABjaZbNTEdeNfZE3rb9AT1NuPWiDZt0Gdnb4gAadKU', 'Lulus', 'Plafon Indonesia - LAPORAN AKHIR MSC (INKUBASI BISNIS).pdf', '0812346578901', 'Padang', '2008-07-01 00:00:00', 'Pria', 'Alamat', NULL, NULL, NULL, '2024-07-01 09:37:47', '2024-07-02 03:08:16'),
('73f2450a-3843-4c26-8b80-2ca9491ad07c', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '22', 'Bdudjsjsjj@gmail.com', '', '2023', 'Calon Asisten', 'User', 'Gsysjannshs', '$argon2id$v=19$m=65536,t=3,p=4$AA2n9enY996xm/wDNqo0Rg$Mtq+F8fxP9Bls58K+tjF+cZcoQzeyBTleJwJqSNMNiw', 'Pendaftar', 'SEC_Orisinalitas_(SD2024020000370).pdf', '64349494946', 'Ysyshshshs', '2024-06-27 00:00:00', 'Pria', 'Hahahsjsj', NULL, NULL, NULL, '2024-06-29 10:54:20', '2024-07-05 04:59:42'),
('8b715f27-3d25-470a-87e1-acba1cc04254', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522014', 'agasdasds3di@gmail.com', 'LEA.V.14.SI', '2020', 'Asisten', 'User', 'Hendra Wijaya Kusuma', '$argon2id$v=19$m=65536,t=3,p=4$8ImndpLAsLy+l3GmHp33cw$uX5BF+rSu+QQsimnGlldUKRS8LzeEA5v3Wv8sNUMoyA', 'Lulus', NULL, '081270403357', 'Lubuk Basung', '01/08/2001', 'Pria', 'Kota Padang', NULL, NULL, NULL, '2024-06-17 12:54:21', '2024-07-02 03:08:27'),
('98ae7238-c7c7-4f01-a53a-43768549a90f', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522012', 'agasdasdsdi@gmail.com', '', '2020', 'Asisten', 'User', 'Rizki Ramadhan', '$argon2id$v=19$m=65536,t=3,p=4$agI1H9O+KT/draVHdZJcmg$KXn90Tsl+Ay2xq9bLJoZ59Us5Fd7AfZgMQu6PDDfoH4', 'Lulus', NULL, '081270403357', 'Lubuk Basung', '2001-08-20 00:00:00', 'Pria', 'Kota Padang', NULL, NULL, NULL, '2024-06-17 12:53:31', '2024-07-07 10:01:23'),
('9e9182b7-56f4-49f4-ae6f-73a16cea93b0', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522007', 'manazilyuni@gmail.com', 'LEA.V.04.SI', '2020', 'Asisten', 'Admin', 'Iqbal Manazil Yuni', '$argon2id$v=19$m=65536,t=3,p=4$4lcIeiOgMaoqfnLep6dHig$huq+aL5nKUi89y3diQAQrwN5mioYhdLsWOJqIi0eZv8', 'Lulus', 'Daniel Fernandes (KTM).pdf', '081270403357', 'Lubuk Basung', '2001-08-20 00:00:00', 'Pria', 'Kota Padang', NULL, 'Terverifikasi', NULL, '2024-06-17 12:16:12', '2024-07-16 03:34:17'),
('a41ad6f6-b187-428a-8965-4b3b1d942136', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '123456789', 'manazilyun1iiqbal@gmail.com', NULL, '0000', 'Asisten', 'Super Admin', 'SuperAdmin', '$argon2id$v=19$m=65536,t=3,p=4$XNE2zAZCjPURk8nAGjDpPA$Hd5Mt+uAkWf8N/qKDaC3jT0n12ez1tTZNj4U+UMdhFQ', 'Pendaftar', NULL, '080000000000', NULL, NULL, 'Pria', NULL, NULL, NULL, NULL, '2024-07-07 11:18:58', '2024-07-07 11:18:58'),
('ac28103a-a455-404f-b25d-76954166a23f', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2011522010', 'asdaasdsdi@gmail.com', 'LEA.V.02.SI', '2020', 'Asisten', 'User', 'Ahmad Agung Jafar', '$argon2id$v=19$m=65536,t=3,p=4$P4BK6Pfd+Tew5VVDmWQb8w$1s6zmw41tUTmYRa+vfiRAA6Glru5nNrptCem+mtg9cU', 'Lulus', NULL, '081270403357', 'Lubuk Basung', '01/08/2001', 'Pria', 'Kota Padang', NULL, NULL, NULL, '2024-06-17 12:52:32', '2024-06-17 12:52:32'),
('bc4f6f92-bc15-4fa9-92af-487d4fb7746d', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '2211522009', 'Hsusiwk@gmail.com', '', '2024', 'Calon Asisten', 'User', 'Tri Ayunia Patma Lubis ', '$argon2id$v=19$m=65536,t=3,p=4$LkRwbmf62fQoF/wcFfTC4w$txfiyPb2ZU1g4j7O8i2m9EzZZJMN72f++0B/JzM4Iqg', 'Tahapan1', '2024-IV-00029-1.pdf', '946494', '6shsjajs', '2024-06-02 00:00:00', 'Pria', 'Hsuahahs', NULL, 'Terverifikasi', NULL, '2024-06-18 04:22:01', '2024-07-14 23:02:21'),
('e9e43378-459e-40e4-9273-e35bda488fb5', 'a8f3b29d-ee61-436d-a267-6acfd22f1740', '4151526', 'Gsysjsjwi@gmail.com', '', '2020', 'Calon Asisten', 'User', 'Gsyshajshs', '$argon2id$v=19$m=65536,t=3,p=4$rU2oXVGwclAXiRWaR3TRyg$wwM9lyf3RPJFwok6Zo7kejVy8MVjw3y/4L5nb7Ao5Do', 'Pendaftar', '2024-VI-02328-2.pdf', '846494646', 'Gshsushhs', '2024-07-01 00:00:00', 'Pria', 'Wyushsbbs', NULL, NULL, NULL, '2024-07-05 07:34:51', '2024-07-05 07:35:05');

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
('97e69037-1a32-4095-8e16-3a0abda574f9', '885280c0-0e8f-4c00-8fde-9cd197f60bba', 'Wawancara', '2024-07-27 05:15:00', 17, '2024-07-16 05:15:35', '2024-07-16 05:15:35');

--
-- Indexes for dumped tables
--

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
  ADD UNIQUE KEY `idSoalUjian` (`idSoalUjian`,`Jawaban`,`idPesertaUjian`) USING BTREE,
  ADD KEY `idPesertaUjian` (`idPesertaUjian`);

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
  ADD UNIQUE KEY `idPendaftar` (`idPendaftar`) USING BTREE,
  ADD KEY `idUsers` (`idUsers`),
  ADD KEY `idUjian` (`idUjian`);

--
-- Indexes for table `pesertawawancara`
--
ALTER TABLE `pesertawawancara`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idPendaftar` (`idPendaftar`) USING BTREE,
  ADD KEY `idWawancara` (`idWawancara`);

--
-- Indexes for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLabor` (`idLabor`),
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
  ADD KEY `idUjian` (`idUjian`),
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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idLabor` (`idLabor`);

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
  ADD CONSTRAINT `detailkepengurusan_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
-- Constraints for table `modul`
--
ALTER TABLE `modul`
  ADD CONSTRAINT `modul_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nilaiwawancara`
--
ALTER TABLE `nilaiwawancara`
  ADD CONSTRAINT `nilaiwawancara_ibfk_1` FOREIGN KEY (`idPesertaWawancara`) REFERENCES `pesertawawancara` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiwawancara_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD CONSTRAINT `pendaftar_ibfk_1` FOREIGN KEY (`idUsers`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftar_ibfk_2` FOREIGN KEY (`idRecruitment`) REFERENCES `recruitment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesertaujian`
--
ALTER TABLE `pesertaujian`
  ADD CONSTRAINT `pesertaujian_ibfk_1` FOREIGN KEY (`idPendaftar`) REFERENCES `pendaftar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesertaujian_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `riwayatpembaca_ibfk_1` FOREIGN KEY (`idUsers`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idLabor`) REFERENCES `labor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wawancara`
--
ALTER TABLE `wawancara`
  ADD CONSTRAINT `wawancara_ibfk_1` FOREIGN KEY (`idTahapan`) REFERENCES `tahapan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
