# 💰 Personal Expense Manager

> A Full-stack Personal Expense Management System built with **React, NestJS, TypeScript and MySQL**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-success)
![License](https://img.shields.io/badge/License-Education-blue)

---

## 📖 Overview

Personal Expense Manager là hệ thống quản lý tài chính cá nhân giúp người dùng:

- 💵 Quản lý thu nhập
- 💸 Quản lý chi tiêu
- 📊 Thống kê tài chính
- 📅 Quản lý ngân sách theo tháng
- 🔐 Đăng nhập bảo mật bằng JWT

Dự án được phát triển theo mô hình **Full-stack Web Application** sử dụng React cho Frontend và NestJS cho Backend.

---

# ✨ Main Features

- ✅ User Registration
- ✅ User Login (JWT Authentication)
- ✅ Password Hashing (bcrypt)
- ✅ CRUD Category
- ✅ CRUD Transaction
- ✅ CRUD Budget
- ✅ Monthly Statistics
- ✅ Session & Cookie
- ✅ RESTful API
- ✅ Unit Testing (Jest)
- ✅ Validation Pipe
- ✅ Authorization

---

# 🛠 Technologies

| Category | Technology |
|----------|------------|
| Frontend | React |
| Backend | NestJS |
| Language | TypeScript |
| Database | MySQL (Aiven Cloud) |
| ORM | TypeORM |
| Authentication | JWT |
| Security | bcrypt, Cookie, Session |
| API Testing | Postman, Thunder Client |
| Source Control | Git & GitHub |

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
│   ├── test/
│   ├── assets/
│   └── dist/
│
├── docs/
│
└── README.md
```

---

# 🚀 Installation

## Backend

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

## Frontend

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

# 🗄 Database

Dự án sử dụng:

- MySQL 8
- TypeORM
- Aiven Cloud Database

Các bảng chính

| Table | Description |
|---------|-------------|
| NguoiDung | Người dùng |
| DanhMuc | Danh mục |
| GiaoDich | Giao dịch |
| NganSach | Ngân sách |

---

# 🔐 Authentication & Security

Hệ thống sử dụng:

- JWT Authentication
- bcrypt Password Hashing
- ValidationPipe
- Cookie
- Session
- Authorization
- Protected Routes

---

# 📡 REST API

## Authentication

| Method | Endpoint |
|---------|-----------|
| POST | /auth/login |
| GET | /auth/profile |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | /nguoi-dung |
| GET | /nguoi-dung/:id |
| POST | /nguoi-dung |
| PUT | /nguoi-dung/:id |
| DELETE | /nguoi-dung/:id |

---

## Category

CRUD đầy đủ

```
/danh-muc
```

---

## Transaction

CRUD đầy đủ

```
/giao-dich
```

---

## Budget

CRUD đầy đủ

```
/ngan-sach
```

---

## Student

CRUD đầy đủ

```
/student
```

---

## Topics

CRUD đầy đủ

```
/topics
```

---

# 🧪 Testing

Dự án sử dụng **Jest**

```bash
cd server

npm test
```

✔ 54 Test Cases

✔ 7 Test Suites

✔ 100% Passed

---

# 📸 Screenshots

## Login

> *(Thêm ảnh login tại đây)*

```
docs/images/login.png
```

---

## Dashboard

> *(Thêm ảnh dashboard)*

```
docs/images/dashboard.png
```

---

## Transaction

> *(Thêm ảnh giao dịch)*

```
docs/images/transaction.png
```

---

## Statistics

> *(Thêm ảnh thống kê)*

```
docs/images/statistics.png
```

---

# 🎥 Demo

Video Demo

https://youtu.be/6lkS2PFXW4Q

---

# 👨‍💻 Team Members

| Member | Responsibility |
|---------|----------------|
| Đỗ Trọng Thắng | Category + Budget |
| Nguyễn Thế Tuấn | Student |
| Nguyễn Anh Tuấn | Topics |

---

# ⚖ Professional Ethics

Trong quá trình phát triển dự án, nhóm cam kết:

- Tuân thủ đạo đức nghề nghiệp CNTT
- Bảo vệ dữ liệu người dùng
- Không sao chép mã nguồn trái phép
- Tuân thủ Luật An ninh mạng
- Tuân thủ Luật Sở hữu trí tuệ

---

# 📈 System Architecture

```
Controller
     │
Service
     │
Repository
     │
Database
```

Bao gồm

- Controller
- Service
- Entity
- DTO
- Module
- Provider

---

# 📄 License

This project was developed for educational purposes at **Phenikaa University**.
