import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DEMO_URL = 'https://jsonplaceholder.typicode.com/posts/1';

@Controller('api-test')
export class ApiTestController {
  @Get('axios')
  async testAxios() {
    const response = await axios.get<JsonPlaceholderPost>(DEMO_URL);

    return {
      message: 'Call API bằng Axios thành công',
      data: response.data,
    };
  }

  @Get('fetch')
  async testFetch() {
    const response = await fetch(DEMO_URL);
    const data = (await response.json()) as JsonPlaceholderPost;

    return {
      message: 'Call API bằng Fetch thành công',
      data,
    };
  }
}
