export const affirmationsAPI = {
    async getRandomAffirmation() {
        const url = 'https://avyrie.github.io/affirmations-api/affirmations.json';
        const randomNum = (arrLength: number) => Math.floor(Math.random() * arrLength);
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.affirmations[randomNum(data.affirmations.length)];
        } catch (err) {
          console.error('Error fetching affirmation:', err);
          throw err;
        }
      }      
    }