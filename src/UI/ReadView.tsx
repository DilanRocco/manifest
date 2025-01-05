import { useDatabase } from "@/provider/databaseProvider" 
import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type ReadViewProps = {
    text: string
    onMount: () => void
}
const ReadView = (props: ReadViewProps) => {
    useEffect(() => {
          const executeOnMount = async () => {
            try {
              await props.onMount();
            } catch (error) {
              console.error("Error in onMount:", error);
            }
          };
          executeOnMount();
      }, [props.onMount]);
    
    return (
    <Box bg={'#242424'} w='100%' h='100%' margin={'auto'}>
        <Text 
        textStyle="4xl"
        data-state="open"
        _open={{
            animation: "fade-in 300ms ease-in",
        }}>{props.text}</Text>
        </Box>)
}

export default ReadView