import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { TosModule } from './tos/tos.module';
import { RootModule } from './root.module';


async function bootstrap() {
  const root = await NestFactory.create(RootModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  root.enableCors(corsOptions)

  await root.listen(process.env.PORT ?? 3001)
}
bootstrap();
