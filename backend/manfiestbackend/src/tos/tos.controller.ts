import { Body, Controller, Get, Post, UseGuards, Header, Res, StreamableFile} from "@nestjs/common";
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TosService } from "./tos.service";
import { SynthesizeTextDto } from "./dto/syn-text.dto"
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

@Controller('tos')
@ApiTags('Text-to-Speech')
export class TosController {
  constructor(private readonly tosService: TosService) {}

  @Post('synthesize')
  @Header('Content-Type', 'audio/mp3') // or your actual audio format
  @ApiOperation({
    summary: 'Synthesizes the given text and returns its buffered result',
    description: 'This endpoint will provide an access token.'
  })
  async synthesize(@Body() text: SynthesizeTextDto): Promise<StreamableFile> {
    const audioBuffer = await this.tosService.synthesize(text);
    return new StreamableFile(audioBuffer);
  }
}
