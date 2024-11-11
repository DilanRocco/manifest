import { Text, VStack } from "@chakra-ui/react"
import { gql, useQuery } from '@apollo/client';
import { useEffect } from "react";

const USER = gql`
{

  userCollection{
     edges {
        node {
        first
        }

}
}
}
`;

const Trends = () => {
    const { loading, error, data } = useQuery(USER);

    useEffect(() => {
        console.log(loading)
        console.log(error)
        console.log(data)
    })
    return <VStack><Text>{}</Text></VStack>
}

export default Trends