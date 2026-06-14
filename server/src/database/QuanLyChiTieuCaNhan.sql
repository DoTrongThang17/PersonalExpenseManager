-- ============================================================
--  CSDL: Quản Lý Chi Tiêu Cá Nhân
--  Framework: NestJS + TypeORM
--  Ngày tạo: 2026-06-14
-- ============================================================

CREATE DATABASE IF NOT EXISTS quan_ly_chi_tieu
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quan_ly_chi_tieu;

-- ------------------------------------------------------------
-- 1. NGƯỜI DÙNG (NguoiDung)
--    Thành viên A phụ trách
-- ------------------------------------------------------------
CREATE TABLE NguoiDung (
    id            INT          NOT NULL AUTO_INCREMENT,
    ho_ten        VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    mat_khau      VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(20)      NULL,
    anh_dai_dien  VARCHAR(500)     NULL,
    ngay_tao      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active     TINYINT(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. DANH MỤC CHI TIÊU (DanhMuc)
--    Thành viên B phụ trách
-- ------------------------------------------------------------
CREATE TABLE DanhMuc (
    id            INT          NOT NULL AUTO_INCREMENT,
    nguoi_dung_id INT              NULL COMMENT 'NULL = danh mục hệ thống, có giá trị = danh mục riêng',
    ten_danh_muc  VARCHAR(100) NOT NULL,
    mo_ta         TEXT             NULL,
    loai          ENUM('thu','chi') NOT NULL DEFAULT 'chi',
    mau_sac       VARCHAR(10)      NULL COMMENT 'Mã HEX, ví dụ: #FF5733',
    bieu_tuong    VARCHAR(50)      NULL COMMENT 'Tên icon, ví dụ: food, car, home',
    ngay_tao      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_danhmuc_nguoidung
        FOREIGN KEY (nguoi_dung_id) REFERENCES NguoiDung(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. GIAO DỊCH (GiaoDich)
--    Thành viên C phụ trách
-- ------------------------------------------------------------
CREATE TABLE GiaoDich (
    id            INT            NOT NULL AUTO_INCREMENT,
    nguoi_dung_id INT            NOT NULL,
    danh_muc_id   INT            NOT NULL,
    so_tien       DECIMAL(15,2)  NOT NULL CHECK (so_tien > 0),
    loai          ENUM('thu','chi') NOT NULL,
    mo_ta         TEXT               NULL,
    ngay_giao_dich DATE           NOT NULL,
    hinh_anh_hoa_don VARCHAR(500) NULL COMMENT 'URL ảnh hóa đơn đính kèm',
    ngay_tao      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_giaodich_nguoidung
        FOREIGN KEY (nguoi_dung_id) REFERENCES NguoiDung(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_giaodich_danhmuc
        FOREIGN KEY (danh_muc_id) REFERENCES DanhMuc(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. NGÂN SÁCH (NganSach)
--    Thành viên B phụ trách (liên quan đến DanhMuc)
-- ------------------------------------------------------------
CREATE TABLE NganSach (
    id            INT           NOT NULL AUTO_INCREMENT,
    nguoi_dung_id INT           NOT NULL,
    danh_muc_id   INT           NOT NULL,
    so_tien_gioi_han DECIMAL(15,2) NOT NULL CHECK (so_tien_gioi_han > 0),
    thang         TINYINT       NOT NULL CHECK (thang BETWEEN 1 AND 12),
    nam           YEAR          NOT NULL,
    ghi_chu       TEXT              NULL,
    ngay_tao      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nganSach_user_cat_period (nguoi_dung_id, danh_muc_id, thang, nam),
    CONSTRAINT fk_ngansach_nguoidung
        FOREIGN KEY (nguoi_dung_id) REFERENCES NguoiDung(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ngansach_danhmuc
        FOREIGN KEY (danh_muc_id) REFERENCES DanhMuc(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- DỮ LIỆU MẪU
-- ============================================================

-- Danh mục hệ thống (mặc định cho tất cả người dùng)
INSERT INTO DanhMuc (nguoi_dung_id, ten_danh_muc, mo_ta, loai, mau_sac, bieu_tuong) VALUES
(NULL, 'Ăn uống',       'Chi phí ăn uống hàng ngày',   'chi', '#FF6B6B', 'food'),
(NULL, 'Di chuyển',     'Xăng xe, taxi, xe buýt',       'chi', '#4ECDC4', 'car'),
(NULL, 'Mua sắm',       'Quần áo, đồ dùng cá nhân',    'chi', '#45B7D1', 'shopping'),
(NULL, 'Giải trí',      'Phim, game, du lịch',          'chi', '#96CEB4', 'entertainment'),
(NULL, 'Hóa đơn',       'Điện, nước, internet',         'chi', '#FFEAA7', 'bill'),
(NULL, 'Sức khỏe',      'Thuốc, khám bệnh',             'chi', '#DDA0DD', 'health'),
(NULL, 'Lương',         'Thu nhập từ công việc',        'thu', '#98FB98', 'salary'),
(NULL, 'Freelance',     'Thu nhập ngoài',               'thu', '#87CEEB', 'freelance'),
(NULL, 'Đầu tư',        'Lãi suất, cổ tức',             'thu', '#F0E68C', 'invest');

-- Người dùng mẫu
INSERT INTO NguoiDung (ho_ten, email, mat_khau, so_dien_thoai) VALUES
('Nguyễn Văn A', 'nguyenvana@email.com', '$2b$10$hashmatkhau1', '0901234567'),
('Trần Thị B',   'tranthib@email.com',   '$2b$10$hashmatkhau2', '0912345678'),
('Lê Văn C',     'levanc@email.com',     '$2b$10$hashmatkhau3', '0923456789');

-- Giao dịch mẫu (người dùng 1)
INSERT INTO GiaoDich (nguoi_dung_id, danh_muc_id, so_tien, loai, mo_ta, ngay_giao_dich) VALUES
(1, 1, 85000,    'chi', 'Cơm trưa văn phòng',      '2026-06-01'),
(1, 2, 50000,    'chi', 'Đổ xăng',                 '2026-06-02'),
(1, 7, 15000000, 'thu', 'Lương tháng 6',            '2026-06-05'),
(1, 3, 350000,   'chi', 'Mua áo sơ mi',             '2026-06-08'),
(1, 5, 250000,   'chi', 'Tiền điện tháng 6',        '2026-06-10'),
(1, 4, 120000,   'chi', 'Vé xem phim',              '2026-06-12');

-- Ngân sách mẫu (người dùng 1, tháng 6/2026)
INSERT INTO NganSach (nguoi_dung_id, danh_muc_id, so_tien_gioi_han, thang, nam, ghi_chu) VALUES
(1, 1, 3000000, 6, 2026, 'Giới hạn chi tiêu ăn uống tháng 6'),
(1, 2, 500000,  6, 2026, 'Giới hạn xăng xe tháng 6'),
(1, 3, 1000000, 6, 2026, 'Giới hạn mua sắm tháng 6'),
(1, 4, 500000,  6, 2026, 'Giới hạn giải trí tháng 6');

-- ============================================================
-- VIEW HỮU ÍCH
-- ============================================================

-- Tổng thu/chi theo tháng của từng người dùng
CREATE OR REPLACE VIEW v_tong_thuchi_thang AS
SELECT
    nd.id           AS nguoi_dung_id,
    nd.ho_ten,
    MONTH(gd.ngay_giao_dich) AS thang,
    YEAR(gd.ngay_giao_dich)  AS nam,
    gd.loai,
    SUM(gd.so_tien)           AS tong_tien,
    COUNT(*)                  AS so_giao_dich
FROM GiaoDich gd
JOIN NguoiDung nd ON nd.id = gd.nguoi_dung_id
GROUP BY nd.id, nd.ho_ten, thang, nam, gd.loai;

-- Theo dõi ngân sách vs thực chi
CREATE OR REPLACE VIEW v_theo_doi_ngan_sach AS
SELECT
    ns.nguoi_dung_id,
    dm.ten_danh_muc,
    ns.thang,
    ns.nam,
    ns.so_tien_gioi_han,
    COALESCE(SUM(gd.so_tien), 0)                           AS da_chi,
    ns.so_tien_gioi_han - COALESCE(SUM(gd.so_tien), 0)    AS con_lai,
    ROUND(COALESCE(SUM(gd.so_tien), 0)
          / ns.so_tien_gioi_han * 100, 1)                  AS phan_tram_su_dung
FROM NganSach ns
JOIN DanhMuc dm ON dm.id = ns.danh_muc_id
LEFT JOIN GiaoDich gd
    ON  gd.nguoi_dung_id = ns.nguoi_dung_id
    AND gd.danh_muc_id   = ns.danh_muc_id
    AND gd.loai          = 'chi'
    AND MONTH(gd.ngay_giao_dich) = ns.thang
    AND YEAR(gd.ngay_giao_dich)  = ns.nam
GROUP BY ns.id, ns.nguoi_dung_id, dm.ten_danh_muc,
         ns.thang, ns.nam, ns.so_tien_gioi_han;
