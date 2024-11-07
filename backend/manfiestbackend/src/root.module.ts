import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { TosModule } from './tos/tos.module';

@Module({
   imports: [AppModule, AuthModule, TosModule],
})
export class RootModule {}