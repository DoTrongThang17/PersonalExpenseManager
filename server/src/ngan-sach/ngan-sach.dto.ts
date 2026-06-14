import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateNganSachDto {
  @IsInt({ message: 'Mã danh mục phải là số nguyên' })
  @IsPositive({ message: 'Mã danh mục phải lớn hơn 0' })
  danhMucId: number;

  @IsPositive({ message: 'Số tiền giới hạn phải lớn hơn 0' })
  soTienGioiHan: number;

  @IsInt()
  @Min(1, { message: 'Tháng phải từ 1 đến 12' })
  @Max(12, { message: 'Tháng phải từ 1 đến 12' })
  thang: number;

  @IsInt()
  @Min(2000, { message: 'Năm không hợp lệ' })
  @Max(2100, { message: 'Năm không hợp lệ' })
  nam: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class UpdateNganSachDto extends PartialType(CreateNganSachDto) {}
