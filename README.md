<div align="center">

# 💰 Personal Expense Manager

### Personal Finance Management System

A Full-stack Web Application built with **React**, **NestJS**, **TypeScript**, and **MySQL**

<p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-success?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=for-the-badge&logo=jest)

</p>

<p>

![GitHub last commit](https://img.shields.io/github/last-commit/DoTrongThang17/PersonalExpenseManager)
![GitHub repo size](https://img.shields.io/github/repo-size/DoTrongThang17/PersonalExpenseManager)
![GitHub language count](https://img.shields.io/github/languages/count/DoTrongThang17/PersonalExpenseManager)

</p>

</div>

---

# 📑 Table of Contents

- [📖 Overview](#-overview)
- [✨ Main Features](#-main-features)
- [🛠 Technologies](#-technologies)
- [📂 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [🗄 Database](#-database)
- [🔐 Authentication & Security](#-authentication--security)
- [📡 REST API](#-rest-api)
- [🧪 Testing](#-testing)
- [📸 Screenshots](#-screenshots)
- [🎥 Demo Video](#-demo-video)
- [📂 Repository](#-repository)
- [👨‍💻 Team Members](#-team-members)
- [⚖ Đạo đức nghề nghiệp](#-đạo-đức-nghề-nghiệp)
- [📈 System Architecture](#-system-architecture)
- [📄 License](#-license)

---

# 📖 Overview

**Personal Expense Manager** là hệ thống quản lý tài chính cá nhân được phát triển theo mô hình **Full-stack Web Application**, giúp người dùng theo dõi các khoản thu nhập, chi tiêu và quản lý ngân sách một cách trực quan, thuận tiện và an toàn.

Ứng dụng sử dụng **React** cho Frontend, **NestJS** cho Backend và **MySQL** làm hệ quản trị cơ sở dữ liệu. Hệ thống hỗ trợ xác thực bằng **JWT**, quản lý dữ liệu theo từng người dùng và cung cấp các chức năng thống kê tài chính theo thời gian thực.

### 🎯 Mục tiêu của dự án

- 💵 Quản lý thu nhập cá nhân.
- 💸 Quản lý các khoản chi tiêu.
- 📂 Quản lý danh mục thu và chi.
- 📅 Quản lý ngân sách theo tháng.
- 📊 Thống kê tình hình tài chính.
- 🔐 Đăng nhập và bảo mật bằng JWT.

---

# ✨ Main Features

- ✅ User Registration
- ✅ User Login (JWT Authentication)
- ✅ Password Hashing (bcrypt)
- ✅ CRUD User
- ✅ CRUD Category
- ✅ CRUD Transaction
- ✅ CRUD Budget
- ✅ CRUD Student
- ✅ CRUD Topics
- ✅ Monthly Statistics
- ✅ RESTful API
- ✅ Validation Pipe
- ✅ Cookie & Session
- ✅ Authorization
- ✅ Unit Testing (Jest)

---

# 🛠 Technologies

| Category | Technology |
|-----------|------------|
| Frontend | React |
| Backend | NestJS |
| Language | TypeScript |
| Database | MySQL 8 (Aiven Cloud) |
| ORM | TypeORM |
| Authentication | JWT |
| Security | bcrypt, Cookie, Session |
| API Testing | Postman, Thunder Client |
| HTTP Client | Axios, Fetch API |
| Source Control | Git & GitHub |
| Testing | Jest |

---

# 📂 Project Structure

```text
PersonalExpenseManager
│
├── react_client/
│   ├── public/
│   └── src/
│
├── server/
│   ├── src/
│   ├── assets/
│   ├── test/
│   └── dist/
│
├── docs/
│
├── .github/
│
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/DoTrongThang17/PersonalExpenseManager.git

cd PersonalExpenseManager
```

---

## 2️⃣ Backend

```bash
cd server

npm install

cp .env.example .env

npm run start:dev
```

Backend chạy tại:

```
http://localhost:5000
```

---

## 3️⃣ Frontend

```bash
cd react_client

npm install

cp .env.example .env

npm start
```

Frontend chạy tại:

```
http://localhost:3000
```

---

## 4️⃣ Run Unit Test

```bash
cd server

npm test
```
# 🗄 Database

Dự án sử dụng cơ sở dữ liệu **MySQL 8** được triển khai trên **Aiven Cloud**, kết hợp với **TypeORM** để quản lý dữ liệu.

## Main Tables

| Table | Description |
|---------|-------------|
| NguoiDung | Lưu thông tin người dùng |
| DanhMuc | Quản lý danh mục thu và chi |
| GiaoDich | Lưu các giao dịch tài chính |
| NganSach | Quản lý ngân sách theo tháng |

### Database Technologies

- MySQL 8
- TypeORM
- Aiven Cloud Database
- mysql2
- dotenv

---

# 🔐 Authentication & Security

Hệ thống áp dụng nhiều cơ chế nhằm đảm bảo an toàn cho dữ liệu người dùng.

## Authentication

- JWT Authentication
- Login bằng Email và Password
- JWT Token hết hạn sau 1 giờ

## Security

- Password Hashing (bcrypt)
- ValidationPipe
- Cookie
- Session
- Authorization
- Protected REST API
- User-based Data Access

---

# 📡 REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Đăng nhập |
| GET | `/auth/profile` | Lấy thông tin người dùng |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | `/nguoi-dung` |
| GET | `/nguoi-dung/:id` |
| POST | `/nguoi-dung` |
| PUT | `/nguoi-dung/:id` |
| DELETE | `/nguoi-dung/:id` |

---

## Category

| Method | Endpoint |
|---------|----------|
| GET | `/danh-muc` |
| GET | `/danh-muc/:id` |
| POST | `/danh-muc` |
| PUT | `/danh-muc/:id` |
| DELETE | `/danh-muc/:id` |

---

## Transaction

| Method | Endpoint |
|---------|----------|
| GET | `/giao-dich` |
| GET | `/giao-dich/:id` |
| POST | `/giao-dich` |
| PUT | `/giao-dich/:id` |
| DELETE | `/giao-dich/:id` |

---

## Budget

| Method | Endpoint |
|---------|----------|
| GET | `/ngan-sach` |
| GET | `/ngan-sach/:id` |
| POST | `/ngan-sach` |
| PUT | `/ngan-sach/:id` |
| DELETE | `/ngan-sach/:id` |

---

## Student

| Method | Endpoint |
|---------|----------|
| GET | `/student` |
| GET | `/student/:sid` |
| POST | `/student` |
| PUT | `/student/:sid` |
| DELETE | `/student/:sid` |

---

## Topics

| Method | Endpoint |
|---------|----------|
| GET | `/topics` |
| GET | `/topics/:tid` |
| POST | `/topics` |
| PUT | `/topics/:tid` |
| DELETE | `/topics/:tid` |

---

# 🧪 Testing

Dự án sử dụng **Jest** để kiểm thử các Service trong Backend.

```bash
cd server

npm test
```

### Test Result

- ✅ 54 Test Cases
- ✅ 7 Test Suites
- ✅ 100% Passed

### Testing Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| User | ✅ |
| Category | ✅ |
| Transaction | ✅ |
| Budget | ✅ |
| Student | ✅ |
| Topics | ✅ |

---

# 📸 Screenshots

## 🔐 Login

<p align="center">
<img width="900" src="https://github.com/user-attachments/assets/fb913ace-2dbd-4a27-86bf-8f952b323c52"/>
</p>

---

## 📊 Dashboard

<p align="center">
<img width="900" src="https://github.com/user-attachments/assets/6bf30497-68e1-4bbb-b478-305678368a14"/>
</p>

---

## 💳 Transaction Management

<p align="center">
<img width="900" src="https://github.com/user-attachments/assets/246edd6b-2156-4998-b656-0dcd100ca139"/>
</p>

---

## 📈 Statistics

<p align="center">
<img width="900" src="https://github.com/user-attachments/assets/e1b621c8-3c43-452a-b0cb-83f837067057"/>
</p>

---

# 🎥 Demo Video

<div align="center">

### ▶️ Watch the Project Demo

https://youtu.be/6lkS2PFXW4Q

</div>

---

# 📂 Repository

<div align="center">

### GitHub Repository

https://github.com/DoTrongThang17/PersonalExpenseManager

⭐ If you find this project useful, don't forget to give it a star!

</div>

---

# 👨‍💻 Team Members

| Member | Responsibility |
|----------|----------------|
| **Đỗ Trọng Thắng** | Category Module & Budget Module |
| **Nguyễn Thế Tuấn** | Student Module |
| **Nguyễn Anh Tuấn** | Topics Module |

---

# ⚖ ĐẠO ĐỨC NGHỀ NGHIỆP

## Đạo đức nghề nghiệp, đạo đức xã hội và pháp luật trong dự án Personal Expense Manager

### 1. Đạo đức nghề nghiệp

Trong quá trình phát triển ứng dụng Personal Expense Manager, nhóm cam kết tuân thủ các nguyên tắc đạo đức nghề nghiệp của ngành Công nghệ thông tin:

- Phát triển phần mềm trung thực, không sao chép mã nguồn hoặc tài liệu của người khác khi chưa được cho phép.
- Kiểm thử đầy đủ trước khi triển khai nhằm giảm thiểu lỗi và đảm bảo tính chính xác của dữ liệu tài chính.
- Bảo vệ thông tin cá nhân và dữ liệu chi tiêu của người dùng, không tiết lộ hoặc sử dụng cho mục đích khác.
- Tôn trọng bản quyền của các thư viện, framework (NestJS, TypeORM...) và các tài nguyên sử dụng trong dự án.
- Có trách nhiệm sửa lỗi, cập nhật và cải thiện hệ thống khi phát hiện sự cố.

---

### 2. Đạo đức xã hội

Ứng dụng được xây dựng nhằm hỗ trợ người dùng quản lý tài chính cá nhân hiệu quả và có trách nhiệm:

- Chỉ thu thập các thông tin cần thiết phục vụ việc quản lý chi tiêu.
- Không sử dụng dữ liệu người dùng vào mục đích quảng cáo hoặc mua bán thông tin.
- Cung cấp thông tin rõ ràng, minh bạch về các khoản thu, chi và thống kê tài chính.
- Khuyến khích người dùng xây dựng thói quen quản lý chi tiêu hợp lý, góp phần nâng cao ý thức tài chính cá nhân.
- Thiết kế giao diện thân thiện, dễ sử dụng và đảm bảo mọi người đều có thể tiếp cận.

---

### 3. Khía cạnh pháp luật

Trong quá trình phát triển và vận hành ứng dụng, nhóm tuân thủ các quy định của pháp luật Việt Nam:

- Luật An ninh mạng năm 2018: bảo vệ hệ thống và dữ liệu người dùng khỏi truy cập trái phép.
- Luật Sở hữu trí tuệ: sử dụng hợp pháp mã nguồn, thư viện và các tài nguyên có bản quyền.
- Quy định về bảo vệ dữ liệu cá nhân: chỉ thu thập thông tin khi có sự đồng ý của người dùng, bảo mật dữ liệu và không chia sẻ cho bên thứ ba khi chưa được phép.
- Áp dụng các biện pháp bảo mật như mã hóa mật khẩu, phân quyền người dùng, xác thực đăng nhập và sao lưu dữ liệu định kỳ.

---

### 4. Cam kết của nhóm

Nhóm cam kết phát triển ứng dụng Personal Expense Manager theo các nguyên tắc đạo đức nghề nghiệp, đạo đức xã hội và tuân thủ pháp luật. Mục tiêu là xây dựng một hệ thống an toàn, minh bạch, bảo mật, giúp người dùng quản lý tài chính cá nhân hiệu quả và tạo sự tin cậy khi sử dụng sản phẩm.

---

# 📈 System Architecture

Dự án được xây dựng theo kiến trúc nhiều lớp (Layered Architecture) của **NestJS**, giúp hệ thống dễ mở rộng, dễ bảo trì và dễ kiểm thử.

```text
                 Client (React)
                       │
                       ▼
              REST API Controller
                       │
                       ▼
                  Service Layer
                       │
                       ▼
               Repository (TypeORM)
                       │
                       ▼
                 MySQL Database
```

### Các thành phần chính

- 📦 Controller
- ⚙ Service
- 🗄 Repository
- 📝 Entity
- 📄 DTO
- 🔌 Module
- 🛡 Authentication (JWT)
- 🔒 Authorization
- 💾 MySQL Database

---

# 📌 Future Improvements

Trong tương lai, dự án có thể được mở rộng với các chức năng:

- 📱 Responsive trên thiết bị di động.
- 📊 Biểu đồ thống kê trực quan bằng Chart.js.
- 🔔 Nhắc nhở khi vượt ngân sách.
- 🌐 Triển khai trên Render/Vercel.
- 📤 Xuất báo cáo PDF hoặc Excel.
- 🔄 Đồng bộ dữ liệu theo thời gian thực.
- 🌙 Dark Mode.

---

# 🙏 Acknowledgements

Nhóm xin chân thành cảm ơn:

- Giảng viên môn **Lập trình Web Nâng cao**.
- Trường **Đại học Phenikaa**.
- Cộng đồng mã nguồn mở.
- NestJS, React, TypeORM và MySQL.

---

# 📄 License

This project was developed for educational purposes at **Phenikaa University**.

© 2026 Personal Expense Manager Team

---

<div align="center">

## ⭐ Thank you for visiting this project!

If you find this project useful, please consider giving it a ⭐ on GitHub.

Made with ❤️ by Personal Expense Manager Team

</div>
