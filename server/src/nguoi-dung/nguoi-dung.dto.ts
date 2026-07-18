import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateNguoiDungDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  ho_ten: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(72, { message: 'Mật khẩu tối đa 72 ký tự' })
  mat_khau: string;

  @IsString()
  @Matches(/^[0-9+\s()-]{8,15}$/, { message: 'Số điện thoại không hợp lệ' })
  so_dien_thoai: string;
}

// Cập nhật hồ sơ: mật khẩu là optional (nếu không gửi thì giữ nguyên)
export class UpdateNguoiDungDto extends PartialType(
  OmitType(CreateNguoiDungDto, ['mat_khau'] as const),
) {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(72, { message: 'Mật khẩu tối đa 72 ký tự' })
  mat_khau?: string;
}
