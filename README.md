# Nền tảng Quản lý Chi tiêu Cá nhân
(Personal Expense Manager)

Ứng dụng Backend xây dựng trên nền tảng NestJS, TypeScript và MySQL nhằm hỗ trợ người dùng quản lý thu nhập, chi tiêu và theo dõi tình hình tài chính cá nhân theo thời gian thực.

---

## Cách chạy dự án (Backend + Frontend)

```bash
# 1. Backend (NestJS) - chạy ở cổng 5000
cd server
npm install
cp .env.example .env
npm run start:dev

# 2. Frontend (React) - chạy ở cổng 3000, mở terminal khác
cd react_client
npm install
cp .env.example .env
npm start
```

Mở http://localhost:3000, đăng ký tài khoản mới rồi dùng thử. Backend cần MySQL đang chạy và đúng thông tin trong `server/.env` (bảng sẽ tự tạo nhờ `synchronize: true`, không cần chạy tay file SQL).

Kiểm tra backend độc lập:
```bash
cd server
npm run build     # build production, phải ra "Compiled successfully"
npm test          # 54 unit test, phải pass hết
```

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

- Đăng ký tài khoản, hash password bằng bcrypt.
- Đăng nhập bằng email + mật khẩu, sinh JWT Token (hết hạn sau 1 giờ).
- `JwtAuthGuard` bảo vệ toàn bộ API nghiệp vụ — mỗi người dùng chỉ thao tác được trên dữ liệu của chính mình (không dùng chung/xem được dữ liệu người khác).
- `ValidationPipe` bật toàn cục — mọi dữ liệu gửi lên đều được kiểm tra định dạng (whitelist, forbidNonWhitelisted).

| Method | Endpoint | Mô tả | Cần đăng nhập |
|---|---|---|---|
| POST | `/nguoi-dung` | Đăng ký tài khoản | Không |
| POST | `/auth/login` | Đăng nhập, trả về `access_token` | Không |
| GET | `/auth/profile` | Thông tin JWT hiện tại | Có |

## CRUD Người dùng (`/nguoi-dung`)

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/nguoi-dung` | Danh sách người dùng |
| GET | `/nguoi-dung/:id` | Xem hồ sơ (chỉ chủ tài khoản) |
| PUT | `/nguoi-dung/:id` | Cập nhật hồ sơ (chỉ chủ tài khoản) |
| DELETE | `/nguoi-dung/:id` | Xoá tài khoản (chỉ chủ tài khoản) |

## CRUD Danh mục (`/danh-muc`)

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/danh-muc` | Tạo danh mục thu/chi |
| GET | `/danh-muc` | Danh sách danh mục của người dùng + danh mục dùng chung |
| GET | `/danh-muc/:id` | Chi tiết 1 danh mục |
| PUT | `/danh-muc/:id` | Cập nhật |
| DELETE | `/danh-muc/:id` | Xoá |

## CRUD Giao dịch (`/giao-dich`)

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/giao-dich` | Ghi nhận giao dịch thu/chi (kiểm tra danh mục đúng chủ + đúng loại) |
| GET | `/giao-dich?thang=&nam=&loai=&danhMucId=` | Danh sách giao dịch, lọc theo tháng/năm/loại/danh mục |
| GET | `/giao-dich/tong-hop?thang=&nam=` | Tổng thu, tổng chi, chênh lệch trong tháng |
| GET | `/giao-dich/:id` | Chi tiết 1 giao dịch |
| PUT | `/giao-dich/:id` | Cập nhật |
| DELETE | `/giao-dich/:id` | Xoá |

## CRUD Ngân sách (`/ngan-sach`)

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/ngan-sach` | Đặt hạn mức chi tiêu theo danh mục + tháng/năm |
| GET | `/ngan-sach?thang=&nam=` | Danh sách ngân sách |
| GET | `/ngan-sach/:id` | Chi tiết |
| PUT | `/ngan-sach/:id` | Cập nhật |
| DELETE | `/ngan-sach/:id` | Xoá |

## CRUD Sinh viên (`/student`) — phụ trách: Nguyễn Thế Tuấn

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/student` | Thêm sinh viên |
| GET | `/student` | Danh sách sinh viên |
| GET | `/student/:sid` | Chi tiết theo mã sinh viên |
| PUT | `/student/:sid` | Cập nhật |
| DELETE | `/student/:sid` | Xoá |

## CRUD Chủ đề (`/topics`) — phụ trách: Nguyễn Anh Tuấn

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/topics` | Thêm chủ đề |
| GET | `/topics` | Danh sách chủ đề |
| GET | `/topics/:tid` | Chi tiết theo mã chủ đề |
| PUT | `/topics/:tid` | Cập nhật |
| DELETE | `/topics/:tid` | Xoá |

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

# 8. Kiểm thử

Unit test tự động (Jest) cho toàn bộ tầng Service — 54 test case, 7 test suite:

```bash
cd server && npm test
```

| Module | File test | Số test |
|---|---|---|
| DanhMuc | `danh-muc.service.spec.ts` | 8 |
| GiaoDich | `giao-dich.service.spec.ts` | 9 |
| NganSach | `ngan-sach.service.spec.ts` | 7 |
| NguoiDung | `nguoi-dung.service.spec.ts` | 7 |
| Auth | `auth.service.spec.ts` | 6 |
| Student | `student.service.spec.ts` | 6 |
| Topics | `topics.service.spec.ts` | 6 |

Bao phủ các nhánh chính: tạo thành công, trùng lặp/xung đột dữ liệu, không tìm thấy (404), không đúng quyền sở hữu (403), cập nhật, xoá.

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