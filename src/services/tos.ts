

export const textToSpeechApi = {
    async tos(text: string): Promise<Response> {
        try {
            const response = await fetch(`http://127.0.0.1:8080/tos/synthesize/`, {
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






