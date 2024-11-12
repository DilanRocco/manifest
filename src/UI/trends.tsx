import { Text, VStack } from "@chakra-ui/react"
import {  useQuery } from '@apollo/client';
import { useEffect } from "react";
import { getUser } from "@/graphql/user";
import { GetUsersQuery, GetUsersQueryVariables }  from "@/generated/graphql"


const Trends = () => {
    const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(getUser);
    const user = data?.userCollection?.edges[0].node 
    useEffect(() => {
        console.log(loading)
        console.log(error)
        console.log(data)
    })
    return <VStack><Text>Welcome {user?.first}</Text></VStack>
}

export default Trends