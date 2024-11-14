import { gql } from "@apollo/client";


export const getHistory = gql(`
    query getHistory {
        historyCollection{
            edges {
                node {
                    user_id
                    streak
                    max_streak
                    fest_time
                }
            }
        }
    }
      `)
export const createHistory = gql(`
mutation CreateHistory($userid: UUID, $streak: BigInt, $maxstreak: BigInt, $festTime: JSON) {
    insertIntohistoryCollection(objects: 
     [{user_id: $userid, 
       streak: $streak, 
       max_streak: $maxstreak, 
       fest_time: $festTime}]) {
    records {
      user_id
    }
}
}
`)