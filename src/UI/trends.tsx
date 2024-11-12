import { Text, VStack } from "@chakra-ui/react"
import {  useQuery } from '@apollo/client';
import { useEffect } from "react";
import { getUsers } from "@/graphql/user";
import { GetUsersQuery, GetUsersQueryVariables }  from "@/generated/graphql"


const Trends = () => {
    const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(getUsers);

    useEffect(() => {
        console.log(loading)
        console.log(error)
        console.log(data)
    })
    return <VStack><Text>{data?.userCollection?.edges[0].node.first}</Text></VStack>
}

export default Trends