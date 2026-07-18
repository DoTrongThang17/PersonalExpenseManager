# Sổ Quỹ — Frontend (React)

Giao diện web cho ứng dụng Quản lý Chi tiêu Cá nhân, kết nối với backend NestJS trong thư mục `server/`.

## Cài đặt

```bash
npm install
cp .env.example .env   # chỉnh REACT_APP_API_URL nếu backend không chạy ở localhost:5000
npm start
```

Mặc định chạy tại http://localhost:3000, gọi API tới backend tại `REACT_APP_API_URL` (mặc định `http://localhost:5000`). Backend phải đang chạy (`npm run start:dev` trong thư mục `server/`) trước khi dùng.

## Cấu trúc

```
src/
  api/          Gọi REST API (axios) tới backend, gắn JWT tự động
  context/      AuthContext (phiên đăng nhập), ToastContext (thông báo)
  components/
    ui/         Bộ component dùng chung (Button, Input, Modal, Card...)
    layout/     Khung sidebar + nội dung (AppShell)
    charts/     Biểu đồ (recharts)
  pages/        Các màn hình: đăng nhập, đăng ký, tổng quan, danh mục, giao dịch, ngân sách
  utils/        Định dạng tiền tệ, ngày tháng
```

## Chức năng

- Đăng ký / đăng nhập (JWT, tự lưu phiên)
- Tổng quan: số liệu thu/chi/chênh lệch theo tháng, biểu đồ xu hướng 6 tháng, top danh mục chi nhiều nhất, tiến độ ngân sách, giao dịch gần đây
- Danh mục: thêm/sửa/xoá, chọn màu + emoji, lọc theo Thu/Chi
- Giao dịch: thêm/sửa/xoá, lọc theo tháng/loại/danh mục
- Ngân sách: đặt hạn mức theo danh mục + tháng, thanh tiến độ, cảnh báo khi vượt mức

## Build production

```bash
npm run build
```
