import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param,
  Put,
  Delete
} from '@nestjs/common';

import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './nguoi-dung.dto';


@Controller('nguoi-dung')
export class NguoiDungController {


  constructor(
    private readonly service: NguoiDungService
  ) {}



  // CREATE
  @Post()
  create(
    @Body() createDto: CreateNguoiDungDto
  ) {

    return this.service.create(createDto);

  }





  // READ ALL
  @Get()
  findAll() {

    return this.service.findAll();

  }





  // READ ONE
  @Get(':id')
  findOne(
    @Param('id') id:string
  ) {

    return this.service.findOne(
      Number(id)
    );

  }





  // UPDATE
  @Put(':id')
  update(

    @Param('id') id:string,

    @Body() body:any

  ) {


    return this.service.update(

      Number(id),

      body

    );

  }





  // DELETE
  @Delete(':id')
  remove(

    @Param('id') id:string

  ) {


    return this.service.remove(

      Number(id)

    );

  }


}