import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //tests
    return 'Hello World!';
  }
}
