import { gql } from "@apollo/client";

export const getUsers = gql(/* GraphQL */ `
query getUsers {
    userCollection{
        edges {
            node {
                first
            }
        }
    }
}
  `)