import { CreateUserRequest } from './dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './event/create-user.event';

@Injectable()
export class AppService {
  private readonly users: { email: string; password: string }[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);

    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email), // { email: createUserRequest.email }
    );

    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email), // { email: createUserRequest.email }
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
