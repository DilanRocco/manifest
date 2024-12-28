import {
    Box,
    Input,
    Switch,
    VStack,
    Heading,
    Textarea,

    Text,
    Link,
  } from "@chakra-ui/react";

import { Button } from "@/components/ui/button"
import { Divider } from "@chakra-ui/layout"
import { FormControl, FormLabel} from "@chakra-ui/form-control";
import { useAuth } from "@/provider/authProvider";
import { supabase } from "@/services/client";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { createFeedback } from "@/graphql/feedback";
  
  const SettingsPage = () => {
    const auth = useAuth()
    const email = auth.session?.user.email ?? ""
    const [updatePasswordText, setUpdatePasswordText] = useState("")
    const [feedback, setFeedback] = useState("")
    const [success, setSuccess] = useState<boolean | null>(null)
    const [createFeedbackField, { data, loading, error: ErrorFeedback }] = useMutation(createFeedback);

  async function updatePassword() {
    try {
      await auth.resetPasswordForEmail(email, "reset-password")
      setUpdatePasswordText("Password reset instructions were sent to your email")
    } catch (e) {
      setUpdatePasswordText("There was an error trying to reset your password")
      console.log(e)
    }
  }

  async function uploadFeedback() {
    try {
      await createFeedbackField({
        variables: {
            user_id: auth.user?.id,
            email: auth.user?.email,
            description: feedback
        },
    });
    setSuccess(true)
    } catch (e) {
      console.log(e)
    }
  }

    return (
      <Box  maxW="50vh" minW="50vh" minH="100vh" p={8}>
        <VStack gap={6} align="stretch" maxW="600px" mx="auto">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input disabled={true} type="email" value={email}/>
          </FormControl>
          <Button colorScheme="blue" onClick={updatePassword}>Update Password</Button>
          <Text>{updatePasswordText}</Text>
          <Divider my={6} />
  

          <FormControl>
            <FormLabel>Your Feedback</FormLabel>
            <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="What do you think..." />
          </FormControl>
          <Button loading={loading} onClick={uploadFeedback} colorScheme="green">Submit Feedback</Button>
          {success && <Text color="green.400">Thanks for the feedback!</Text>}
          <Text color="red.400">{ErrorFeedback?.message}</Text>
    
          <Button background="red.400" onClick={auth.logout}>Logout</Button>
        </VStack>
      </Box>
    );
  };
  
  export default SettingsPage;