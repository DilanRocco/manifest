import {
    Box,
    Button,
    Input,
    Switch,
    VStack,
    Heading,
    Textarea,

    Text,
    Link,
  } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout"
import { FormControl, FormLabel} from "@chakra-ui/form-control";
import { useAuth } from "@/provider/authProvider";
import { supabase } from "@/services/client";
import { useEffect, useState } from "react";
  
  const SettingsPage = () => {
    const auth = useAuth()
    const email = auth.session?.user.email ?? ""
    const [updatePasswordText, setUpdatePasswordText] = useState("")
  

  async function updatePassword() {
    try {
      await auth.resetPasswordForEmail(email, "reset-password")
      setUpdatePasswordText("Password reset instructions were sent to your email")
    } catch (e) {
      setUpdatePasswordText("There was an error trying to reset your password")
      console.log(e)
    }
    
    
  }

    return (
      <Box  maxW="50vh" minW="50vh" minH="100vh" p={8}>
        <VStack gap={6} align="stretch" maxW="600px" mx="auto">
          <Heading mb={6}>Settings</Heading>
  
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input disabled={true} type="email" value={email}/>
          </FormControl>
          <Button colorScheme="blue" onClick={updatePassword}>Update Password</Button>
          <Text>{updatePasswordText}</Text>
          <Divider my={6} />
  

          <FormControl>
            <FormLabel>Your Feedback</FormLabel>
            <Textarea placeholder="What do you think..." />
          </FormControl>
          <Button colorScheme="green">Submit Feedback</Button>
  
    
          <Button background="red.400" onClick={auth.logout}>Logout</Button>
        </VStack>
      </Box>
    );
  };
  
  export default SettingsPage;