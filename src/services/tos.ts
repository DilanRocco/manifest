import { TosResponse, HelloResponse } from "@/types/tos";


export const textToSpeechApi = {
    async tos(text: string): Promise<TosResponse> {
        try {
            const response = await fetch(`http://localhost:9000/2015-03-31/functions/function/invocations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to synthesize speech');
            }
            const data: TosResponse = await response.json()
            return data
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






