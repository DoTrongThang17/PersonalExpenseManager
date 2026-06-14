import { Injectable } from '@nestjs/common';

@Injectable()
export class NguoiDungService {
  private users = [];

  create(data) {
    const user = {
      id: this.users.length + 1,
      ...data,
    };

    this.users.push(user);

    return user;
  }
}
