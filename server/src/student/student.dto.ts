import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Mã sinh viên không được để trống' })
  @MaxLength(10, { message: 'Mã sinh viên tối đa 10 ký tự' })
  SID: string;

  @IsString()
  @IsNotEmpty({ message: 'Tên sinh viên không được để trống' })
  @MaxLength(30, { message: 'Tên sinh viên tối đa 30 ký tự' })
  SNAME: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(30, { message: 'Email tối đa 30 ký tự' })
  EMAIL: string;

  @IsString()
  @IsNotEmpty({ message: 'Mã giảng viên hướng dẫn không được để trống' })
  @MaxLength(10, { message: 'Mã giảng viên hướng dẫn tối đa 10 ký tự' })
  Tutor_id: string;
}

// Không cho sửa SID qua Update vì đây là khoá chính (sửa qua route riêng nếu cần)
export class UpdateStudentDto extends PartialType(
  OmitType(CreateStudentDto, ['SID'] as const),
) {}
