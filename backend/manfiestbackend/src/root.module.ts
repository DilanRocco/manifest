import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { TosModule } from './tos/tos.module';

@Module({
   imports: [AppModule, TosModule],
})
export class RootModule {}