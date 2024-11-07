import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TosController } from './tos.controller';
import { TosService } from './tos.service';


@Module({
    imports: [PassportModule],
    controllers: [TosController],
    providers: [TosService],
    exports: [TosService],
})
export class TosModule {
    
}
