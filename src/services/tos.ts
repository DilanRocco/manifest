import { tosResponse } from "@/types/tos";


export const textToSpeechApi = {
    async tos(text: string): Promise<tosResponse> {
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
            const data: tosResponse = await response.json()
            return data
        } catch (error) {
            console.error('Error:', error);
            throw error
        }

    },

}






