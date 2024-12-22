import { gql } from "@apollo/client";

export const getGoalsForUser = gql(`
    query getGoals {
        historyCollection{
            edges {
                node {
                    user_id
                    type
                    text
                    tags
                    color
                }
            }
        }
    }
`)

export const createGoals = gql(`
    mutation CreateGoals($userid: UUID, $text: String, $type: String, $tags: String, $color: String) {
        insertIntohistoryCollection(objects: 
         [{user_id: $userid,
           text: $text, 
           type: $type, 
           tags: $tags, 
           color: $color}]) {
        records {
          user_id
        }
    }
    }
`)

export const updateGoalText = gql(`
    mutation UpdateGoalText($userid: UUID!, $id: String!, $text: String!) {
      updategoalsCollection(
        filter: { 
          user_id: { eq: $userid },
          id: { eq: $id }
        },
        set: { text: $text }
      ) {
        affectedCount
      }
    }
  `);
  
  export const updateGoalType = gql(`
    mutation UpdateGoalType($userid: UUID!, $id: String!, $type: String!) {
      updategoalsCollection(
        filter: { 
          user_id: { eq: $userid },
          id: { eq: $id }
        },
        set: { type: $type }
      ) {
        affectedCount
      }
    }
  `);
  
  export const updateGoalTags = gql(`
    mutation UpdateGoalTags($userid: UUID!, $id: String!, $tags: String!) {
      updategoalsCollection(
        filter: { 
          user_id: { eq: $userid },
          id: { eq: $id }
        },
        set: { tags: $tags }
      ) {
        affectedCount
      }
    }
  `);
  
  export const updateGoalColor = gql(`
    mutation UpdateGoalColor($userid: UUID!, $id: String!, $color: String!) {
      updategoalsCollection(
        filter: { 
          user_id: { eq: $userid },
          id: { eq: $id }
        },
        set: { color: $color }
      ) {
        affectedCount
      }
    }
  `);
  