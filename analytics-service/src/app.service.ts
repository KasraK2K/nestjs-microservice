import { CreateUserEvent } from './event/create-user.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly analytics: { email: string; timestamps: Date }[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handleUserCreated - ANALYTICS', data);
    this.analytics.push({
      email: data.email,
      timestamps: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }
}
