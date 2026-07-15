import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { NguoiDung } from './nguoi-dung.entity';
import { CreateNguoiDungDto } from './nguoi-dung.dto';

@Injectable()
export class NguoiDungService {

  constructor(
    @Inject('NGUOI_DUNG_REPOSITORY')
    private readonly nguoiDungRepository: Repository<NguoiDung>,
  ) {}


  // CREATE - Đăng ký người dùng
  async create(createDto: CreateNguoiDungDto) {

    const email = createDto.email?.trim().toLowerCase();
    const password = createDto.mat_khau?.trim();


    if (!email || !password) {
      throw new BadRequestException(
        'Email và mật khẩu là bắt buộc'
      );
    }


    const existedUser =
      await this.nguoiDungRepository.findOne({
        where:{
          email
        }
      });


    if(existedUser){
      throw new BadRequestException(
        'Email đã tồn tại'
      );
    }



    const hashedPassword =
      await bcrypt.hash(password,10);



    const user =
      this.nguoiDungRepository.create({

        ho_ten:
          createDto.ho_ten?.trim(),

        email,

        mat_khau:
          hashedPassword,

        so_dien_thoai:
          createDto.so_dien_thoai?.trim(),

      });



    const savedUser =
      await this.nguoiDungRepository.save(user);



    delete (savedUser as Partial<NguoiDung>)
      .mat_khau;



    return {

      message:
        'Đăng ký thành công',

      data:
        savedUser

    };

  }





  // READ - lấy tất cả người dùng
  async findAll(){

    const users =
      await this.nguoiDungRepository.find();


    return users.map(user=>{

      delete (user as Partial<NguoiDung>)
        .mat_khau;

      return user;

    });

  }





  // READ - lấy theo id
  async findOne(id:number){

    const user =
      await this.nguoiDungRepository.findOne({

        where:{
          id
        }

      });



    if(!user){

      throw new BadRequestException(
        'Không tìm thấy người dùng'
      );

    }



    delete (user as Partial<NguoiDung>)
      .mat_khau;



    return user;

  }





  // LOGIN JWT tìm email
  async findByEmail(
    email:string
  ): Promise<NguoiDung | null>{


    return this.nguoiDungRepository.findOne({

      where:{
        email
      }

    });

  }





  // UPDATE
  async update(
    id:number,
    data:Partial<NguoiDung>
  ){


    const user =
      await this.nguoiDungRepository.findOne({

        where:{
          id
        }

      });



    if(!user){

      throw new BadRequestException(
        'Không tìm thấy người dùng'
      );

    }



    if(data.email){

      data.email =
        data.email.trim()
        .toLowerCase();

    }



    if(data.mat_khau){

      data.mat_khau =
        await bcrypt.hash(
          data.mat_khau,
          10
        );

    }



    await this.nguoiDungRepository.update(
      id,
      data
    );



    const updatedUser =
      await this.nguoiDungRepository.findOne({

        where:{
          id
        }

      });



    delete (updatedUser as Partial<NguoiDung>)
      .mat_khau;



    return {

      message:
        'Cập nhật thành công',

      data:
        updatedUser

    };

  }





  // DELETE
  async remove(id:number){


    const user =
      await this.nguoiDungRepository.findOne({

        where:{
          id
        }

      });



    if(!user){

      throw new BadRequestException(
        'Không tìm thấy người dùng'
      );

    }



    await this.nguoiDungRepository.delete(id);



    return {

      message:
        'Xóa người dùng thành công'

    };

  }

}