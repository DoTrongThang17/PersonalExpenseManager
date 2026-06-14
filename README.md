# Nền tảng Quản lý Chi tiêu Cá nhân
(Personal Expense Manager)

Ứng dụng Backend xây dựng trên nền tảng NestJS, TypeScript và MySQL nhằm hỗ trợ người dùng quản lý thu nhập, chi tiêu và theo dõi tình hình tài chính cá nhân theo thời gian thực.

---

# 1. Thực trạng & Ý tưởng dự án

Hiện nay nhiều người vẫn quản lý các khoản thu chi bằng sổ tay hoặc ghi chú trên điện thoại. Việc này dễ dẫn đến:

- Quên ghi lại các khoản chi tiêu.
- Khó kiểm soát số tiền đã sử dụng.
- Không biết khoản nào chiếm tỷ trọng lớn.
- Khó lập kế hoạch tài chính trong tương lai.

**Giải pháp:**

Hệ thống cung cấp các API CRUD tập trung, kết nối trực tiếp tới Cơ sở dữ liệu MySQL.

Điểm cốt lõi của dự án là tự động thống kê các khoản thu chi, phân loại theo từng danh mục và tính toán số dư hiện tại, giúp người dùng kiểm soát tài chính cá nhân hiệu quả hơn.

---
# 2. Công nghệ sử dụng

- **Backend:** NestJS, TypeScript
- **Database:** MySQL 8.4 (Hosted trên Aiven Cloud)
- **ORM:** TypeORM
- **Thư viện kết nối:** mysql2, dotenv
- **Công cụ kiểm thử:** Thunder Client / Postman
- **Quản lý mã nguồn:** GitHub

---
---

## 3. Phân công công việc nhóm

| Thành viên | Đối tượng phụ trách | Chức năng |
|------------|---------------------|-----------|
| Nguyễn Thế Tuấn | Student | CRUD Sinh viên |
| Đỗ Trọng Thắng | DanhMuc + NganSach | CRUD Danh mục chi tiêu + Ngân sách |
| Nguyễn Anh Tuấn | Topics | CRUD Chủ đề |

---

## 4. Cơ sở dữ liệu

File SQL: `server/src/database/QuanLyChiTieuCaNhan.sql`

Gồm 4 bảng chính:

| Bảng | Mô tả |
|------|-------|
| NguoiDung | Lưu thông tin người dùng |
| DanhMuc | Danh mục thu/chi (hệ thống + cá nhân) |
| GiaoDich | Các giao dịch thu chi |
| NganSach | Ngân sách giới hạn theo tháng/năm |

---
