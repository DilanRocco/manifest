import { gql } from '@apollo/client';

export const GET_GOALS = gql(`
  query GetGoals($userid: UUID!) {
    goalsCollection(filter: { user_id: { eq: $userid } }) {
      edges {
        node {
          id
          text
          type
          tags
          color
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
    $type: String!,
    $tags: String!,
    $color: String!
  ) {
    insertIntogoalsCollection(
      objects: [{
        user_id: $userid,
        text: $text,
        type: $type,
        tags: $tags,
        color: $color
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
    $text: String!,
    $type: String!,
    $tags: String!,
    $color: String!
  ) {
    updategoalsCollection(
      filter: { 
        id: { eq: $id },
        user_id: { eq: $userid }
      },
      set: {
         $text:  $text!,
         $type:  $type!,
         $tags:  $tags!,
         $color: $color!
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
