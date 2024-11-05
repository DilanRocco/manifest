
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
require('dotenv').config()




export const textToSpeechApi = {
    async tos(text: string): Promise<Buffer> {
        const client = new TextToSpeechClient()

        const request = {
            input: { text: text },
            voice: { languageCode: 'en-us', ssmlgender: 'standard'},
            audioconfig: { audioEncoding: 'MP3' }
        }
        const [response] = await client.synthesizeSpeech(request)
        return response as Buffer;
    }
}