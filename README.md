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
- **Authentication:** JWT
- **Security:** Cookies, Session, Hash Password (bcrypt)
- **API Testing:** Thunder Client / Postman
- **API Call:** Axios, Fetch, Async/Await
- **Quản lý mã nguồn:** GitHub

---

# 3. Phân công công việc nhóm

| Thành viên | Đối tượng phụ trách | Chức năng |
|------------|---------------------|-----------|
| Nguyễn Thế Tuấn | Student | CRUD Sinh viên |
| Đỗ Trọng Thắng | DanhMuc + NganSach | CRUD Danh mục chi tiêu + Ngân sách |
| Nguyễn Anh Tuấn | Topics | CRUD Chủ đề |

---

# 4. Cơ sở dữ liệu

File SQL:

```
server/src/database/QuanLyChiTieuCaNhan.sql
```

Hệ thống gồm các bảng chính:

| Bảng | Mô tả |
|------|-------|
| NguoiDung | Lưu thông tin người dùng |
| DanhMuc | Quản lý các danh mục thu/chi |
| GiaoDich | Lưu các giao dịch tài chính |
| NganSach | Quản lý giới hạn ngân sách |

Cơ sở dữ liệu được triển khai trên MySQL Cloud thông qua Aiven.

---

# 5. Đạo đức nghề nghiệp, đạo đức xã hội và pháp luật

## 5.1. Đạo đức nghề nghiệp

Trong quá trình phát triển ứng dụng Personal Expense Manager, nhóm cam kết tuân thủ các nguyên tắc đạo đức nghề nghiệp trong lĩnh vực Công nghệ thông tin:

- Phát triển phần mềm trung thực, không sao chép mã nguồn hoặc tài liệu của người khác khi chưa được cho phép.
- Kiểm thử đầy đủ trước khi triển khai nhằm giảm thiểu lỗi và đảm bảo tính chính xác của dữ liệu tài chính.
- Bảo vệ thông tin cá nhân và dữ liệu chi tiêu của người dùng, không tiết lộ hoặc sử dụng dữ liệu cho mục đích khác.
- Tôn trọng bản quyền của các thư viện, framework được sử dụng trong dự án như NestJS, TypeORM và các tài nguyên mã nguồn mở khác.
- Có trách nhiệm sửa lỗi, cập nhật và cải thiện hệ thống khi phát hiện sự cố.

---

## 5.2. Đạo đức xã hội

Ứng dụng được xây dựng nhằm hỗ trợ người dùng quản lý tài chính cá nhân hiệu quả và có trách nhiệm:

- Chỉ thu thập những thông tin cần thiết phục vụ cho việc quản lý chi tiêu.
- Không sử dụng dữ liệu người dùng vào mục đích quảng cáo hoặc mua bán thông tin cá nhân.
- Cung cấp thông tin minh bạch về các khoản thu, chi và thống kê tài chính.
- Khuyến khích người dùng xây dựng thói quen quản lý chi tiêu hợp lý.
- Thiết kế hệ thống thân thiện, dễ sử dụng và hỗ trợ nhiều nhóm người dùng.

---

## 5.3. Khía cạnh pháp luật

Trong quá trình phát triển và vận hành hệ thống, nhóm tuân thủ các quy định pháp luật liên quan:

- Tuân thủ **Luật An ninh mạng năm 2018** nhằm bảo vệ hệ thống và dữ liệu người dùng khỏi các truy cập trái phép.
- Tuân thủ **Luật Sở hữu trí tuệ**, sử dụng hợp pháp các thư viện, framework và tài nguyên trong dự án.
- Bảo vệ dữ liệu cá nhân của người dùng, chỉ thu thập và xử lý dữ liệu phục vụ mục đích quản lý chi tiêu.
- Áp dụng các biện pháp bảo mật:
  - Hash mật khẩu bằng bcrypt.
  - Xác thực người dùng bằng JWT.
  - Quản lý Session và Cookie.
  - Phân quyền truy cập.
  - Bảo vệ kết nối cơ sở dữ liệu.

---

## 5.4. Cam kết của nhóm

Nhóm cam kết phát triển ứng dụng Personal Expense Manager theo các nguyên tắc:

- Đảm bảo tính trung thực trong quá trình phát triển phần mềm.
- Bảo vệ quyền riêng tư và dữ liệu cá nhân của người dùng.
- Tuân thủ các quy định pháp luật và chuẩn mực đạo đức nghề nghiệp.
- Xây dựng hệ thống an toàn, minh bạch và đáng tin cậy.

Mục tiêu của dự án là tạo ra một nền tảng hỗ trợ người dùng quản lý tài chính cá nhân hiệu quả, đồng thời đảm bảo trách nhiệm với xã hội và cộng đồng.

---

# 6. Các chức năng chính

## Authentication & Security

- Đăng ký tài khoản.
- Hash password bằng bcrypt.
- Đăng nhập bằng email và mật khẩu.
- Sinh JWT Token.
- Kiểm tra quyền truy cập API.
- Sử dụng Cookie và Session.

---

## CRUD Người dùng

Đối tượng: `NguoiDung`

Các API:

### Create

```
POST /nguoi-dung
```

Tạo người dùng mới.

---

### Read All

```
GET /nguoi-dung
```

Lấy danh sách người dùng.

---

### Read One

```
GET /nguoi-dung/:id
```

Lấy thông tin người dùng theo ID.

---

### Update

```
PUT /nguoi-dung/:id
```

Cập nhật thông tin người dùng.

---

### Delete

```
DELETE /nguoi-dung/:id
```

Xóa người dùng.

---

# 7. API Testing

Công cụ sử dụng:

- Postman
- Thunder Client
- Curl Terminal

Ví dụ:

```
POST http://localhost:5000/nguoi-dung
```

Body:

```json
{
    "ho_ten": "Nguyen Van A",
    "email": "vana@gmail.com",
    "mat_khau": "123456",
    "so_dien_thoai": "0987654321"
}
```

---

# 8. Kiểm thử CRUD

Đã thực hiện thành công:

✅ Create người dùng  
✅ Read danh sách người dùng  
✅ Read người dùng theo ID  
✅ Update người dùng  
✅ Delete người dùng  

---

# 9. API Call

Đã triển khai:

## Axios

```
GET /api-test/axios
```

Kết quả:

```
Call API bằng Axios thành công
```

---

## Fetch

```
GET /api-test/fetch
```

Kết quả:

```
Call API bằng Fetch thành công
```

---

# 10. Kiến trúc dự án

Dự án sử dụng mô hình phân lớp của NestJS:

```
Controller
     |
     |
Service
     |
     |
Repository
     |
     |
Database
```

Bao gồm:

- Entity
- DTO
- Controller
- Service
- Module
- Provider

---

# 11. Activity Diagram

Đã xây dựng lưu đồ thuật toán cho chức năng CRUD:

- Create User
- Read User
- Update User
- Delete User

File hình ảnh được lưu trong repository.

---

# 12. Repository

Github:

```
(Dán link Github của nhóm tại đây)
```

---

# 13. Thành viên thực hiện

- Đỗ Trọng Thắng
- Nguyễn Thế Tuấn
- Nguyễn Anh Tuấn

---

# 14. Kết luận

Personal Expense Manager là hệ thống quản lý chi tiêu cá nhân được xây dựng bằng NestJS và MySQL.

Dự án áp dụng các kiến thức về:

- Backend Framework.
- Database.
- CRUD API.
- Authentication/Authorization.
- Security.
- API Testing.
- Đạo đức nghề nghiệp và bảo vệ dữ liệu người dùng.

Nhóm hướng tới xây dựng một hệ thống an toàn, hiệu quả và có tính ứng dụng thực tế.