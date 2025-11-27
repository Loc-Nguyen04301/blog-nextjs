import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

declare const module: any;

async function bootstrap() {
  const port = process.env.PORT ?? 8000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Dùng JwtAuthGuard toàn cụcs
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'log_queue',
      queueOptions: { durable: true },
    },
  })

  await app.startAllMicroservices()
  await app.listen(port).then(() => {
    console.log('Server listening on port ' + port);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
