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
  
  const SettingsPage = () => {
    const auth = useAuth()
    const email = auth.session?.user.email
    
    //const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box  minW="40vh" minH="100vh" p={8}>
        <VStack gap={6} align="stretch" maxW="600px" mx="auto">
          <Heading mb={6}>Settings</Heading>
  
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input disabled={true} type="email" placeholder="your@email.com" value={email}/>
          </FormControl>
  
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
  
          <FormControl>
            <FormLabel>Confirm New Password</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
  
     
  
          <Button colorScheme="blue">Save Changes</Button>
  
          <Divider my={6} />
  

          <FormControl>
            <FormLabel>Your Feedback</FormLabel>
            <Textarea placeholder="Tell us what you think..." />
          </FormControl>
          <Button colorScheme="green">Submit Feedback</Button>
  
          <Divider my={6} />
  
          {/* <Heading size="md" mb={4}>Contact Us</Heading> */}
          {/* <Text>
            Need help? <Link color="blue.500" href="mailto:support@example.com">Contact our support team</Link>
          </Text> */}
        </VStack>
      </Box>
    );
  };
  
  export default SettingsPage;