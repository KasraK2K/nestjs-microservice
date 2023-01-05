import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port,
    },
  });
  await app.startAllMicroservices();

  await app.listen(port);

  logger.log(`🚪 Analytics service is running on port ${port}`);
  logger.log('📡 Analytics microservice is ready');
}
bootstrap();
