import { gql } from "@apollo/client";

export const getUser = gql(`
query getUsers {
    userCollection{
        edges {
            node {
                user_id
                created_at
                first
                last
            }
        }
    }
}
  `)



  export const createUser = gql(`
 mutation CreateUser($userid: UUID, $first: String, $last: String, $createdAt: Datetime) {
    insertIntouserCollection(objects: [{user_id: $userid, created_at: $createdAt, first: $first, last: $last}]) {
    records {
      user_id
    }
}
  }
  `);