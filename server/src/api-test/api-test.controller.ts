import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('api-test')
export class ApiTestController {
  @Get('axios')
  async testAxios() {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1',
    );

    return {
      message: 'Call API bằng Axios thành công',
      data: response.data,
    };
  }

  @Get('fetch')
  async testFetch() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );

    const data = await response.json();

    return {
      message: 'Call API bằng Fetch thành công',
      data,
    };
  }
}