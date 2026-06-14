import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum LoaiDanhMuc {
  THU = 'thu',
  CHI = 'chi',
}

export class CreateDanhMucDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @MaxLength(100, { message: 'Tên danh mục tối đa 100 ký tự' })
  tenDanhMuc: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsEnum(LoaiDanhMuc, { message: 'Loại phải là "thu" hoặc "chi"' })
  loai: LoaiDanhMuc;

  @IsOptional()
  @Matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
    message: 'Màu sắc phải là mã HEX hợp lệ, ví dụ: #FF5733',
  })
  mauSac?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  bieuTuong?: string;
}

export class UpdateDanhMucDto extends PartialType(CreateDanhMucDto) {}
