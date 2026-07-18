import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { NguoiDung } from './nguoi-dung.entity';
import { CreateNguoiDungDto, UpdateNguoiDungDto } from './nguoi-dung.dto';

@Injectable()
export class NguoiDungService {
  constructor(
    @Inject('NGUOI_DUNG_REPOSITORY')
    private readonly nguoiDungRepository: Repository<NguoiDung>,
  ) {}

  private stripPassword(user: NguoiDung): Omit<NguoiDung, 'mat_khau'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- chỉ dùng để loại field khỏi response
    const { mat_khau, ...rest } = user;
    return rest;
  }

  /** Chỉ chủ tài khoản mới được xem/sửa/xoá hồ sơ của chính mình. */
  private assertOwnership(id: number, requestingUserId: number) {
    if (id !== requestingUserId) {
      throw new ForbiddenException(
        'Bạn không có quyền thao tác trên tài khoản này',
      );
    }
  }

  // CREATE - Đăng ký người dùng (public, không cần đăng nhập)
  async create(createDto: CreateNguoiDungDto) {
    const email = createDto.email.trim().toLowerCase();
    const password = createDto.mat_khau.trim();

    const existedUser = await this.nguoiDungRepository.findOne({
      where: { email },
    });
    if (existedUser) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.nguoiDungRepository.create({
      ho_ten: createDto.ho_ten.trim(),
      email,
      mat_khau: hashedPassword,
      so_dien_thoai: createDto.so_dien_thoai.trim(),
    });

    const savedUser = await this.nguoiDungRepository.save(user);

    return {
      message: 'Đăng ký thành công',
      data: this.stripPassword(savedUser),
    };
  }

  // READ - lấy tất cả người dùng (yêu cầu đăng nhập - xem ghi chú ở controller)
  async findAll() {
    const users = await this.nguoiDungRepository.find();
    return users.map((user) => this.stripPassword(user));
  }

  // READ - lấy theo id, chỉ chủ tài khoản mới xem được
  async findOne(id: number, requestingUserId: number) {
    this.assertOwnership(id, requestingUserId);

    const user = await this.nguoiDungRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return this.stripPassword(user);
  }

  // Dùng nội bộ cho AuthService khi login - KHÔNG strip mật khẩu vì cần so sánh
  async findByEmail(email: string): Promise<NguoiDung | null> {
    return this.nguoiDungRepository.findOne({ where: { email } });
  }

  // UPDATE - chỉ chủ tài khoản mới sửa được
  async update(id: number, requestingUserId: number, dto: UpdateNguoiDungDto) {
    this.assertOwnership(id, requestingUserId);

    const user = await this.nguoiDungRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (dto.email) {
      const normalizedEmail = dto.email.trim().toLowerCase();
      if (normalizedEmail !== user.email) {
        const emailTaken = await this.nguoiDungRepository.findOne({
          where: { email: normalizedEmail },
        });
        if (emailTaken) {
          throw new BadRequestException(
            'Email đã được sử dụng bởi tài khoản khác',
          );
        }
      }
      user.email = normalizedEmail;
    }

    if (dto.ho_ten) user.ho_ten = dto.ho_ten.trim();
    if (dto.so_dien_thoai) user.so_dien_thoai = dto.so_dien_thoai.trim();
    if (dto.mat_khau) user.mat_khau = await bcrypt.hash(dto.mat_khau, 10);

    const updatedUser = await this.nguoiDungRepository.save(user);

    return {
      message: 'Cập nhật thành công',
      data: this.stripPassword(updatedUser),
    };
  }

  // DELETE - chỉ chủ tài khoản mới xoá được chính mình
  async remove(id: number, requestingUserId: number) {
    this.assertOwnership(id, requestingUserId);

    const user = await this.nguoiDungRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    await this.nguoiDungRepository.remove(user);

    return { message: 'Xóa người dùng thành công' };
  }
}
