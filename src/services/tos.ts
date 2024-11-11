const base_url = import.meta.env.VITE_API_BASE_URL
export const textToSpeechApi = {
    async tos(text: string): Promise<Response> {
        try {
            const response = await fetch(`${base_url}/tos/synthesize`, {
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






