import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule/*, {cors: true}*/);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // const server = app.getHttpServer();

  // server.on('stopServer', () => {
  //   console.log('Stopping server...');
  //   app.close();
  // });

  await app.listen(3000);
}
bootstrap();
