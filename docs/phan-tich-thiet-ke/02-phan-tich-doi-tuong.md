# Câu 2 — Phân tích yêu cầu, đối tượng, mối quan hệ và phương thức

## 2.1. Tóm tắt yêu cầu chức năng

Bài toán quản lý chi tiêu cá nhân, gồm 4 đối tượng chính: **Người dùng** (NguoiDung), **Danh mục** (DanhMuc), **Giao dịch** (GiaoDich) và **Ngân sách** (NganSach). Hệ thống cho phép:

- Người dùng đăng ký, đăng nhập và quản lý hồ sơ cá nhân.
- Người dùng tự định nghĩa danh mục thu/chi, hoặc dùng danh mục chung có sẵn.
- Người dùng ghi nhận từng giao dịch thu/chi, gắn với 1 danh mục cụ thể.
- Người dùng đặt hạn mức ngân sách theo danh mục và theo tháng, hệ thống hỗ trợ theo dõi mức đã chi so với hạn mức.
- Mọi dữ liệu (danh mục riêng, giao dịch, ngân sách) đều gắn với đúng 1 người dùng sở hữu và chỉ người đó truy cập được.

## 2.2. Đối tượng, thuộc tính và phương thức

### a) Người dùng (NguoiDung)

Đại diện cho tài khoản sử dụng hệ thống. Là gốc sở hữu của Danh mục, Giao dịch và Ngân sách.

| Thuộc tính | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | number | Mã định danh, tự tăng, khoá chính |
| ho_ten | string | Họ và tên hiển thị |
| email | string (duy nhất) | Email dùng để đăng nhập |
| mat_khau | string | Mật khẩu đã băm bằng bcrypt — không bao giờ trả về cho client |
| so_dien_thoai | string | Số điện thoại liên hệ |

| Phương thức | Chức năng |
|---|---|
| create(dto) | Đăng ký tài khoản mới (băm mật khẩu, kiểm tra email chưa tồn tại) |
| findAll() | Lấy danh sách người dùng (yêu cầu đăng nhập) |
| findOne(id, requestingUserId) | Xem hồ sơ — chỉ chủ tài khoản mới xem được chính mình |
| update(id, requestingUserId, dto) | Cập nhật hồ sơ — chỉ chủ tài khoản |
| remove(id, requestingUserId) | Xoá tài khoản — chỉ chủ tài khoản |

### b) Danh mục (DanhMuc)

Đại diện cho một nhóm phân loại thu/chi (vd: "Ăn uống", "Lương"). Có thể thuộc về 1 người dùng cụ thể, hoặc là danh mục dùng chung (`nguoiDungId = null`).

| Thuộc tính | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | number | Mã định danh, tự tăng, khoá chính |
| nguoiDungId | number \| null | Chủ sở hữu; null nghĩa là danh mục dùng chung |
| tenDanhMuc | string | Tên danh mục |
| moTa | string | Mô tả thêm (không bắt buộc) |
| loai | enum: thu \| chi | Phân loại thu nhập hay chi tiêu |
| mauSac | string (mã hex) | Màu hiển thị, vd #AD7F24 |
| bieuTuong | string | Emoji/icon hiển thị |

| Phương thức | Chức năng |
|---|---|
| create(nguoiDungId, dto) | Tạo danh mục mới, kiểm tra không trùng tên + loại với danh mục đã có |
| findAll(nguoiDungId) | Lấy danh mục của người dùng + danh mục dùng chung |
| findOne(id, nguoiDungId) | Xem chi tiết 1 danh mục |
| update(id, nguoiDungId, dto) | Cập nhật danh mục |
| remove(id, nguoiDungId) | Xoá danh mục |

### c) Giao dịch (GiaoDich)

Đại diện cho một khoản thu hoặc chi cụ thể — đối tượng trung tâm của bài toán. Luôn gắn với đúng 1 người dùng và đúng 1 danh mục.

| Thuộc tính | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | number | Mã định danh, tự tăng, khoá chính |
| nguoiDungId | number | Người thực hiện giao dịch |
| danhMucId | number | Danh mục được gán |
| soTien | decimal(15,2) | Số tiền giao dịch, luôn dương |
| loai | enum: thu \| chi | Phải khớp với `loai` của danh mục được gán |
| moTa | text | Ghi chú (không bắt buộc) |
| ngayGiaoDich | date | Ngày phát sinh giao dịch |
| hinhAnhHoaDon | string | Đường dẫn ảnh hoá đơn (không bắt buộc) |

| Phương thức | Chức năng |
|---|---|
| create(nguoiDungId, dto) | Tạo giao dịch — kiểm tra danh mục tồn tại, đúng chủ, đúng loại |
| findAll(nguoiDungId, filter) | Lấy danh sách, lọc theo tháng/năm/loại/danh mục |
| findOne(id, nguoiDungId) | Xem chi tiết 1 giao dịch |
| update(id, nguoiDungId, dto) | Cập nhật, re-validate danh mục nếu thay đổi |
| remove(id, nguoiDungId) | Xoá giao dịch |
| tongHopTheoThang(nguoiDungId, thang, nam) | Tính tổng thu, tổng chi, chênh lệch trong tháng — phục vụ Tổng quan |

### d) Ngân sách (NganSach)

Đại diện cho hạn mức chi tiêu mà người dùng tự đặt ra cho 1 danh mục trong 1 tháng cụ thể.

| Thuộc tính | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | number | Mã định danh, tự tăng, khoá chính |
| nguoiDungId | number | Người đặt ngân sách |
| danhMucId | number | Danh mục được áp hạn mức |
| soTienGioiHan | decimal(15,2) | Hạn mức chi tiêu tối đa |
| thang | number (1–12) | Tháng áp dụng |
| nam | number | Năm áp dụng |
| ghiChu | text | Ghi chú (không bắt buộc) |

| Phương thức | Chức năng |
|---|---|
| create(nguoiDungId, dto) | Tạo ngân sách — kiểm tra chưa tồn tại ngân sách trùng danh mục + tháng + năm |
| findAll(nguoiDungId, thang, nam) | Lấy danh sách ngân sách theo tháng/năm |
| findOne(id, nguoiDungId) | Xem chi tiết |
| update(id, nguoiDungId, dto) | Cập nhật, re-check trùng lặp nếu đổi tháng/danh mục |
| remove(id, nguoiDungId) | Xoá ngân sách |

## 2.3. Mối quan hệ giữa các đối tượng

| Quan hệ | Bội số | Ý nghĩa nghiệp vụ |
|---|---|---|
| NguoiDung — DanhMuc | 1 — 0..* | Một người dùng sở hữu nhiều danh mục riêng; danh mục cũng có thể không thuộc ai (dùng chung). |
| NguoiDung — GiaoDich | 1 — 0..* | Một người dùng có nhiều giao dịch. Xoá người dùng thì xoá toàn bộ giao dịch liên quan (ON DELETE CASCADE). |
| NguoiDung — NganSach | 1 — 0..* | Một người dùng có nhiều ngân sách đã đặt. Xoá người dùng thì xoá toàn bộ ngân sách liên quan (CASCADE). |
| DanhMuc — GiaoDich | 1 — 0..* | Một danh mục được dùng cho nhiều giao dịch. Không cho xoá danh mục nếu còn giao dịch tham chiếu (ON DELETE RESTRICT) để bảo toàn lịch sử. |
| DanhMuc — NganSach | 1 — 0..* | Một danh mục có thể có nhiều ngân sách (ở các tháng khác nhau). Xoá danh mục thì xoá luôn ngân sách liên quan (CASCADE). |

Hai ràng buộc nghiệp vụ quan trọng không thể hiện trực tiếp trên sơ đồ nhưng được kiểm soát ở tầng service:

- `GiaoDich.loai` phải trùng với `DanhMuc.loai` của danh mục được chọn (không thể gán một khoản "chi" vào danh mục "thu").
- `NganSach` có ràng buộc duy nhất `(nguoiDungId, danhMucId, thang, nam)` — không cho phép 2 ngân sách trùng nhau cho cùng 1 danh mục trong cùng 1 tháng.

Xem sơ đồ cấu trúc lớp (Class Diagram) đầy đủ tại `diagrams/class_diagram.png` (Câu 3).
