import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //1
    return 'Hello World!';
  }
}
