import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return JSON.stringify({
      name: process.env.APP_NAME || 'nestjs-kafka-app',
      version: process.env.APP_VERSION || '0.0.1-beta',
    });
  }
}
