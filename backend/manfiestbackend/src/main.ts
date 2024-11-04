import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auth = await NestFactory.create(AuthModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
