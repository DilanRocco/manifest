import { useDatabase } from "@/provider/databaseProvider" 
import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type ReadViewProps = {
    text: string
}
const ReadView = (props: ReadViewProps) => {
    return (<Text 
        textStyle="4xl"
        data-state="open"
        _open={{
            animation: "fade-in 300ms ease-in",
        }}>{props.text}</Text>)
}

export default ReadView