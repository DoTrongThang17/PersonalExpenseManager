import {
  IsInt,
  IsPositive,
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LoaiDanhMuc } from '../danh-muc/loai-danh-muc.enum';

export class CreateGiaoDichDto {
  @IsInt({ message: 'Mã danh mục phải là số nguyên' })
  @IsPositive({ message: 'Mã danh mục phải lớn hơn 0' })
  danhMucId: number;

  @IsPositive({ message: 'Số tiền phải lớn hơn 0' })
  soTien: number;

  @IsEnum(LoaiDanhMuc, { message: 'Loại phải là "thu" hoặc "chi"' })
  loai: LoaiDanhMuc;

  @IsDateString(
    {},
    { message: 'Ngày giao dịch không hợp lệ (định dạng YYYY-MM-DD)' },
  )
  ngayGiaoDich: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  moTa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  hinhAnhHoaDon?: string;
}

export class UpdateGiaoDichDto extends PartialType(CreateGiaoDichDto) {}

export class QueryGiaoDichDto {
  @IsOptional()
  @IsInt()
  thang?: number;

  @IsOptional()
  @IsInt()
  nam?: number;

  @IsOptional()
  @IsInt()
  danhMucId?: number;

  @IsOptional()
  @IsEnum(LoaiDanhMuc)
  loai?: LoaiDanhMuc;
}
