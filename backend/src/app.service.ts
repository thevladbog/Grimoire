import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //test1
    return 'Hello World!';
  }
}
