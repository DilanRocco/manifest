import { useDatabase } from "@/provider/databaseProvider" 
import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ReadView = () => {
    const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()
    const [manifestText, setManifestText] = useState("")
    const location = useLocation()
    const [text, setText] = useState("")
    useEffect(() => {
        refresh()
    }, [refresh])
    useEffect(() => {
        if (fest == undefined) {
            return
        }
        location.state.text
        console.log("WE IN HERE")
        setManifestText(JSON.parse(fest.fest_text))
    },[fest])

    return (<Text 
        textStyle="4xl"
        data-state="open"
        _open={{
            animation: "fade-in 300ms ease-in",
        }}>{location.state.text}</Text>)
}

export default ReadView