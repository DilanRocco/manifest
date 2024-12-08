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
                    times_listened_today
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

export const updateHistory = gql(`
mutation UpdateHistoryField($userid: UUID!, $streak: BigInt, $max_streak: BigInt, $fest_time: JSON, $times_listened_today: BigInt ) {
        updatehistoryCollection(
            filter: { user_id: { eq: $userid } },
            set: { streak: $streak,  max_streak: $max_streak, fest_time: $fest_time, times_listened_today: $times_listened_today }
        ) {
            affectedCount
        }
    }
`);

export const updateTimesListenedToday = gql(`
    mutation UpdateTimesListenedToday($userid: UUID!, $times_listened_today: BigInt) {
        updatehistoryCollection(
            filter: { user_id: { eq: $userid } },
            set: { times_listened_today: $times_listened_today }
        ) {
            affectedCount
        }
    }
`);

// export const updateStreak = gql(`
//     mutation UpdateTimesListenedToday($userid: UUID!, $streak: BigInt) {
//         updatehistoryCollection(
//             filter: { user_id: { eq: $userid } },
//             set: { streak: $streak }
//         ) {
//             affectedCount
//         }
//     }
// `);
    

// export const subscriptionHistory = gql(`
//     subscription OnCommentAdded($postID: ID!) {
//     commentAdded(postID: $postID) {
//       id
//       content
//     }
//   }

//     `)