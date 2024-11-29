import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SynthesizeTextDto } from "./dto/syn-text.dto"
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { protos } from '@google-cloud/speech'


import * as dotenv from 'dotenv';
dotenv.config();

// not ideal solution but typing for API call is incorrrect
//type ISynthesizeSpeechRequest = any

@Injectable()
export class TosService {

    private googleClient: TextToSpeechClient
    constructor(

    ) {
        this.googleClient = new TextToSpeechClient()
    }

    async synthesize(dto: SynthesizeTextDto): Promise<Buffer> {
        const [response] = await this.googleClient.synthesizeSpeech({
            input: {text: dto.text},
            // Select the language and SSML Voice Gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            // Select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
          })
        return response.audioContent as Buffer;

    }
}