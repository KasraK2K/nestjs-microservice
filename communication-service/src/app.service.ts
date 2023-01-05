import { CreateUserEvent } from './event/create-user.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handleUserCreated - COMMUNICATION', data);
    // TODO: Email the user...
  }
}
