import { useAuth } from "@/provider/authProvider";
import { Box, Button, Field, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ResetPasswordPage = () => {
    const auth = useAuth()
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState<boolean | null>(null)
    const [passsword] = useState("")

    function submit() {
        try {
            auth.changePassword(passsword)
            setSuccess(true)
            
        } catch (e) {
            console.log(e)
            setError("Error attempting to reset your password")
        }
        
    }
    useEffect(() => {
        if (auth.currentEvent == "PASSWORD_RECOVERY") {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [auth])
    return (
    <Box>
        <Text>What would you like your new password to be?</Text>
        <Input type="password" placeholder="*********" value={passsword}/>
        <Button disabled={disabled} onClick={submit}> </Button>
        {success && <Text>Successful Password Reset</Text>}
        <Text color="red.300">{error}</Text>
    </Box> )
}
