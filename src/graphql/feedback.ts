import { gql } from "@apollo/client";

export const createFeedback = gql(`
    mutation CreateFeedback($email: text, $description: text, $user_id: UUID!) {
       insertIntofeedbackCollection(objects: 
       [{
       user_id: $user_id
       email: $email,
       description: $description}]) {
       records {
         email
       }
   }
}
`);