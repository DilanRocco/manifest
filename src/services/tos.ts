import { TosResponse, HelloResponse } from "@/types/tos";


export const textToSpeechApi = {
    async tos(text: string): Promise<Blob> {
        try {
            const response = await fetch(`http://localhost:3000/tos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                throw new Error('Failed to synthesize speech');
            }
            console.log("response json working")
            
            const data = await response.json();
            if (!data.audioContent) {
                throw new Error('Audio content not found in response');
            }

            const audioBytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
            const blob = new Blob([audioBytes], { type: 'audio/mpeg' }); 

            return blob;
        } catch (error) {
            console.error('Error:', error);
            throw error
        }

    },
    async hello(): Promise<HelloResponse> {
        try {
            const response = await fetch(`http://localhost:3000/hello`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to synthesize speech');
            }
            console.log(response)
            const data: HelloResponse = await response.json()
            return data
        } catch (error) {
            console.error('Error:', error);
            throw error
        }

    },

}






