import { useEffect, useState } from "react"
import { authApi } from '@/services/auth'
import { Navigate } from "react-router-dom"
import { AUTH_TOKEN_STR } from "@/constants"
import Loading from "@/UI/loading"
type Props = {
    children: React.ReactNode
}
const ProtectedProvider = (children: Props) => {
    const [valid, setValid] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const fetchData = async () => {
        setLoading(true)
        const credientialsValid = await authApi.credentialsValid()
        
        setValid(credientialsValid)
        setLoading(false)
        if (!credientialsValid) {
            localStorage.setItem(AUTH_TOKEN_STR, "")
        } else {
            sessionStorage.setItem("userId", await authApi.uuid());
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    if (loading) {
        return (<Loading/>)
    }
      
    return valid ? children.children : <Navigate to='/login' />
}

export default ProtectedProvider