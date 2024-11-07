import { ApiProperty } from "@nestjs/swagger";

export class SynthesizeTextDto {
    
    @ApiProperty()
    text: string;


  }