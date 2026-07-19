import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppService } from './app.service';
// Khai báo kiểu cho dữ liệu lưu trong session
declare module 'express-session' {
  interface SessionData {
    username?: string;
  }
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // =========================
  // Trang chủ Backend
  // =========================
  @Get()
  home(@Res() res: Response): void {
    res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Personal Expense Manager API</title>
<style>
*{ box-sizing:border-box; }
body{
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    background:linear-gradient(-45deg,#0f172a,#152238,#0f172a,#1a2744);
    background-size:400% 400%;
    animation:gradientShift 12s ease infinite;
    color:white;
}
@keyframes gradientShift{
    0%{background-position:0% 50%;}
    50%{background-position:100% 50%;}
    100%{background-position:0% 50%;}
}
.container{
    max-width:900px;
    margin:60px auto;
    padding:40px;
}
.card{
    background:#1e293b;
    border-radius:18px;
    padding:35px;
    box-shadow:0 10px 30px rgba(0,0,0,.3);
    animation:fadeUp .7s ease both;
}
@keyframes fadeUp{
    from{opacity:0; transform:translateY(24px);}
    to{opacity:1; transform:translateY(0);}
}
h1{
    color:#f59e0b;
    margin-top:0;
    font-size:38px;
}
.coin{
    display:inline-block;
    animation:spin 3s linear infinite;
}
@keyframes spin{
    0%{transform:rotateY(0deg);}
    100%{transform:rotateY(360deg);}
}
.status{
    display:inline-flex;
    align-items:center;
    gap:10px;
    padding:8px 18px;
    border-radius:20px;
    background:#16a34a;
    margin:15px 0;
    font-weight:bold;
}
.dot{
    width:10px;
    height:10px;
    border-radius:50%;
    background:#4ade80;
    animation:pulse 1.6s infinite;
}
@keyframes pulse{
    0%{box-shadow:0 0 0 0 rgba(74,222,128,.6);}
    70%{box-shadow:0 0 0 10px rgba(74,222,128,0);}
    100%{box-shadow:0 0 0 0 rgba(74,222,128,0);}
}
table{
    width:100%;
    border-collapse:collapse;
    margin-top:25px;
}
th,td{
    padding:14px;
    border-bottom:1px solid #334155;
    text-align:left;
}
th{
    color:#fbbf24;
}
tr.row{
    transition:transform .15s ease, background .15s ease;
}
tr.row:hover{
    background:rgba(245,166,35,.08);
    transform:translateX(4px);
}
.method{
    display:inline-block;
    padding:3px 10px;
    border-radius:6px;
    font-weight:700;
    font-size:12px;
    letter-spacing:.5px;
}
.GET{ background:rgba(56,189,248,.15); color:#38bdf8; }
.POST{ background:rgba(74,222,128,.15); color:#4ade80; }
.footer{
    margin-top:35px;
    color:#94a3b8;
}
#uptime{ color:#4ade80; font-weight:bold; }
</style>
</head>
<body>
<div class="container">
<div class="card">
<h1><span class="coin">💰</span> Personal Expense Manager API</h1>
<div class="status"><span class="dot"></span> Backend Running Successfully</div>
<p>
Backend của hệ thống quản lý chi tiêu cá nhân đang hoạt động. Uptime: <span id="uptime">0s</span>
</p>
<table>
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Mô tả</th>
</tr>
<tr class="row">
<td><span class="method POST">POST</span></td>
<td>/auth/login</td>
<td>Đăng nhập</td>
</tr>
<tr class="row">
<td><span class="method POST">POST</span></td>
<td>/nguoi-dung</td>
<td>Đăng ký tài khoản</td>
</tr>
<tr class="row">
<td><span class="method GET">GET</span></td>
<td>/giao-dich</td>
<td>Danh sách giao dịch</td>
</tr>
<tr class="row">
<td><span class="method GET">GET</span></td>
<td>/danh-muc</td>
<td>Danh sách danh mục</td>
</tr>
<tr class="row">
<td><span class="method GET">GET</span></td>
<td>/ngan-sach</td>
<td>Danh sách ngân sách</td>
</tr>
</table>
<div class="footer">
Version 1.0 • Built with NestJS ❤️<br><br>
Made by <strong>Đỗ Trọng Thắng - Nguyễn Anh Tuấn - Nguyễn Thế Tuấn</strong>
</div>
</div>
</div>
<script>
const start = Date.now();
setInterval(() => {
  const seconds = Math.floor((Date.now() - start) / 1000);
  document.getElementById('uptime').textContent = seconds + 's';
}, 1000);
</script>
</body>
</html>
`);
  }
  // =========================
  // Cookie
  // =========================
  @Get('cookie')
  setCookie(@Res() res: Response): void {
    res.cookie('username', 'thang', {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.send('Cookie created');
  }
  // =========================
  // Session
  // =========================
  @Get('session')
  setSession(@Req() req: Request, @Res() res: Response): void {
    req.session.username = 'thang';
    res.send('Session saved');
  }
  @Get('session/get')
  getSession(@Req() req: Request) {
    return {
      username: req.session.username ?? null,
    };
  }
}