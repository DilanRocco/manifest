module.exports = {
    schema: [
      {
        [`https://dpqpapwghkhmczofddna.supabase.co/graphql/v1`]: {
          headers: {
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcXBhcHdnaGtobWN6b2ZkZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODA0MDcsImV4cCI6MjA0NjE1NjQwN30.H1bhZvJq1aT-1Q7bY570tPV7GH3J1orse1mHzjXJVQQ',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcXBhcHdnaGtobWN6b2ZkZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODA0MDcsImV4cCI6MjA0NjE1NjQwN30.H1bhZvJq1aT-1Q7bY570tPV7GH3J1orse1mHzjXJVQQ'
          }
        }
      }
    ],
    documents: 'src/**/*.ts', // Adjust this path to match where your GraphQL queries are
    generates: {
      'src/generated/graphql.ts': {
        plugins: [
          'typescript',
          'typescript-operations'
        ]
      }
    }
  };