import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateTopicDto {
  @IsInt({ message: 'Mã chủ đề phải là số nguyên' })
  @IsPositive({ message: 'Mã chủ đề phải lớn hơn 0' })
  TId: number;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả chủ đề không được để trống' })
  @MaxLength(100, { message: 'Mô tả chủ đề tối đa 100 ký tự' })
  Tdesc: string;

  @IsString()
  @IsNotEmpty({ message: 'Mã học phần không được để trống' })
  @MaxLength(15, { message: 'Mã học phần tối đa 15 ký tự' })
  Mod_Id: string;
}

// Không cho sửa TId qua Update vì đây là khoá chính
export class UpdateTopicDto extends PartialType(
  OmitType(CreateTopicDto, ['TId'] as const),
) {}
