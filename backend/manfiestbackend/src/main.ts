import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auth = await NestFactory.create(AuthModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5189', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  auth.enableCors(corsOptions)

  await auth.listen(process.env.PORT ?? 3001)
}
bootstrap();
