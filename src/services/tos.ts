import.meta.env.MODE
const API_BASE_URL = 'http://localhost:3001';
export const textToSpeechApi = {
    async tos(text: string): Promise<Response> {
        try {
            const response = await fetch(`${API_BASE_URL}/tos/synthesize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to synthesize speech');
            }

            return response
        } catch (error) {
            console.error('Error:', error);
            throw error
        }

    },

}






