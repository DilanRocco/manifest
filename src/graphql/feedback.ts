import { gql } from "@apollo/client";

export const createFeedback = gql(`
    mutation CreateFeedback($userid: UUID, $email: text, $description: text) {
       insertIntofeedbackCollection(objects: 
       [{user_id: $userid, 
       email: $email,
       description: $description}]) {
       records {
         user_id
       }
   }
}
`);