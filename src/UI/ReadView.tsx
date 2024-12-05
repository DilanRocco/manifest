import { useDatabase } from "@/provider/databaseProvider" 
import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ReadView = () => {
    const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()
    const [manifestText, setManifestText] = useState("")
    const location = useLocation()
    const text = location.state?.text
    useEffect(() => {
        if (fest == undefined) {
            return
        }
        text ?? setManifestText(JSON.parse(fest.fest_text))
    },[fest])

    return (<Text textStyle="4xl">{text}</Text>)
}

export default ReadView