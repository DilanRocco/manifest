import { gql } from "@apollo/client";

export const getFest = gql(`
query getFest {
    festCollection{
        edges {
            node {
                user_id
                fest_text
            }
        }
    }
}
`)

export const createFest = gql(`
    mutation CreateFest($userid: UUID, $festtext: String) {
       insertIntofestCollection(objects: [{user_id: $userid, festtext: $festtext}]) {
       records {
         user_id
       }
   }
}
`);

    