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
  
  const SettingsPage = () => {
    //const { colorMode, toggleColorMode } = useColorMode();
  
    return (
      <Box bg="gray.800" minH="100vh" p={8}>
        <VStack gap={6} align="stretch" maxW="600px" mx="auto">
          <Heading mb={6}>Settings</Heading>
  
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="your@email.com" />
          </FormControl>
  
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
  
          <FormControl>
            <FormLabel>Confirm New Password</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
  
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark-mode" mb="0">
              Dark Mode
            </FormLabel>
             {/* <Switch id="dark-mode" isChecked={colorMode === "dark"} onChange={toggleColorMode} /> */}
          </FormControl>
  
          <Button colorScheme="blue">Save Changes</Button>
  
          <Divider my={6} />
  
          <Heading size="md" mb={4}>Feedback</Heading>
          <FormControl>
            <FormLabel>Your Feedback</FormLabel>
            <Textarea placeholder="Tell us what you think..." />
          </FormControl>
          <Button colorScheme="green">Submit Feedback</Button>
  
          <Divider my={6} />
  
          <Heading size="md" mb={4}>Contact Us</Heading>
          <Text>
            Need help? <Link color="blue.500" href="mailto:support@example.com">Contact our support team</Link>
          </Text>
        </VStack>
      </Box>
    );
  };
  
  export default SettingsPage;