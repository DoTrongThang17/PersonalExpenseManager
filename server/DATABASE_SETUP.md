# 📚 Hướng dẫn Thiết lập Database cho Dự án Quản Lý Chi Tiêu Cá Nhân

## 📋 Yêu cầu
- **MySQL Server 5.7** hoặc cao hơn (khuyến nghị 8.0+)
- Máy tính đã cài đặt MySQL
- MySQL Command Line Client hoặc MySQL Workbench

---

## 🚀 Bước 1: Cài đặt MySQL (Nếu chưa có)

### Trên Windows:
```bash
# Tải MySQL từ: https://dev.mysql.com/downloads/mysql/
# Chạy installer và làm theo hướng dẫn
```

### Trên macOS (với Homebrew):
```bash
brew install mysql
brew services start mysql
```

### Trên Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install mysql-server mysql-client
sudo systemctl start mysql
```

---

## 🔧 Bước 2: Kiểm tra MySQL Server

```bash
# Kiểm tra MySQL đang chạy
mysql --version

# Đăng nhập vào MySQL (nhập mật khẩu khi được yêu cầu)
mysql -u root -p
```

---

## 📁 Bước 3: Tạo Database từ SQL Script

### Cách 1: Dùng Command Line
```bash
cd /workspaces/PersonalExpenseManager/server

# Chạy SQL script (nhập mật khẩu root)
mysql -u root -p < src/database/QuanLyChiTieuCaNhan.sql
```

### Cách 2: Dùng MySQL Workbench
1. Mở **MySQL Workbench**
2. Kết nối đến local MySQL server
3. File → Open SQL Script
4. Chọn file: `src/database/QuanLyChiTieuCaNhan.sql`
5. Nhấn **Execute**

### Cách 3: Dùng Command Prompt MySQL
```bash
mysql -u root -p

# Sau khi đăng nhập, chạy:
source /path/to/QuanLyChiTieuCaNhan.sql;
```

---

## ✅ Bước 4: Xác minh Database đã tạo

```bash
mysql -u root -p

# Trong MySQL prompt, chạy:
SHOW DATABASES;
USE quan_ly_chi_tieu;
SHOW TABLES;
SELECT * FROM DanhMuc LIMIT 5;
```

Bạn sẽ thấy:
- Database: `quan_ly_chi_tieu`
- Tables: `NguoiDung`, `DanhMuc`, `GiaoDich`, `NganSach`
- Dữ liệu mẫu đã được tạo

---

## 🔐 Bước 5: Cập nhật .env

File `.env` đã được tạo sẵn với cấu hình mặc định:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=quan_ly_chi_tieu
DB_SSL=false
PORT=5000
NODE_ENV=development
```

### Nếu mật khẩu MySQL của bạn khác:
Chỉnh sửa `DB_PASSWORD` trong file `.env`

---

## 🎯 Bước 6: Chạy Server

```bash
cd /workspaces/PersonalExpenseManager/server

# Cài đặt dependencies (nếu chưa có)
npm install

# Chạy server ở chế độ development
npm run start:dev
```

Bạn sẽ thấy:
```
✅ Application is running on: http://localhost:5000
```

---

## 🧪 Bước 7: Test API

Mở **Postman** hoặc **Thunder Client** và test:

```bash
# GET danh mục
GET http://localhost:5000/danh-muc

# GET người dùng
GET http://localhost:5000/nguoi-dung

# GET giao dịch
GET http://localhost:5000/giao-dich

# GET ngân sách
GET http://localhost:5000/ngan-sach
```

---

## ⚠️ Troubleshooting

### Lỗi: "Access denied for user 'root'@'localhost'"
**Giải pháp:**
- Kiểm tra mật khẩu MySQL
- Cập nhật đúng mật khẩu trong `.env`

### Lỗi: "Can't connect to MySQL server"
**Giải pháp:**
- Đảm bảo MySQL Server đang chạy
- Linux: `sudo systemctl status mysql`
- macOS: `brew services list`
- Windows: Kiểm tra Services

### Lỗi: "Database 'quan_ly_chi_tieu' doesn't exist"
**Giải pháp:**
- Chạy SQL script: `mysql -u root -p < src/database/QuanLyChiTieuCaNhan.sql`

### Lỗi: Database entities không khớp
**Giải pháp:**
- TypeORM sẽ tự động đồng bộ hóa khi `synchronize: true`
- Kiểm tra logs của server

---

## 📝 Schema Database

### NguoiDung (Người dùng)
- id, ho_ten, email, mat_khau, so_dien_thoai, anh_dai_dien

### DanhMuc (Danh mục chi tiêu)
- id, ten_danh_muc, mo_ta, loai (thu/chi), mau_sac, bieu_tuong

### GiaoDich (Giao dịch)
- id, so_tien, loai, mo_ta, ngay_giao_dich, hinh_anh_hoa_don

### NganSach (Ngân sách)
- id, so_tien_gioi_han, thang, nam, ghi_chu

---

## 🎉 Hoàn tất!

Database của bạn đã sẵn sàng. Server chạy ở `http://localhost:5000`

Có bất kỳ câu hỏi? Hãy kiểm tra logs của server!
