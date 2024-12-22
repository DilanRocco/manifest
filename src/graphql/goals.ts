import { gql } from '@apollo/client';

export const GET_GOALS = gql(`
  query GetGoals($userid: UUID!) {
    goalsCollection(filter: { user_id: { eq: $userid } }) {
      edges {
        node {
          id
          text
          labels
          column_type
          created_at
        }
      }
    }
  }
`);

export const CREATE_GOAL = gql(`
  mutation CreateGoal(
    $userid: UUID!,
    $text: String!,
    $labels: JSON!,
    $column_type: String!
  ) {
    insertIntogoalsCollection(
      objects: [{
        user_id: $userid,
        text: $text,
        labels: $labels,
        column_type: $column_type
      }]
    ) {
      records {
        id
      }
    }
  }
`);

export const UPDATE_GOAL = gql(`
  mutation UpdateGoal(
    $id: String!,
    $userid: UUID!,
    $text: String,
    $labels: JSON,
    $column_type: String
  ) {
    updategoalsCollection(
      filter: { 
        id: { eq: $id },
        user_id: { eq: $userid }
      },
      set: {
        text: $text,
        labels: $labels,
        column_type: $column_type
      }
    ) {
      affectedCount
    }
  }
`);

export const DELETE_GOAL = gql(`
  mutation DeleteGoal($id: String!, $userid: UUID!) {
    deleteFromgoalsCollection(
      filter: { 
        id: { eq: $id },
        user_id: { eq: $userid }
      }
    ) {
      affectedCount
    }
  }
`);
