import { 
    Box, 
    VStack, 
    Heading, 
    Text, 
    Link,  
    chakra,
  } from "@chakra-ui/react";
  import { Blockquote } from "@/components/ui/blockquote";
  

  
  export const HowToPage = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1
        }
      }
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100
        }
      }
    };
  
    return (
      <Box
        bg="#242424"
        minW="300px"
        maxW="90vh"
        minH="90vh"
        p={8}
        textAlign={"left"}
        borderRadius="2xl"
        boxShadow="2xl"
        data-state="open"
        _open={{
            animation: "fade-in 300ms ease-in",
        }}
        
        
      >
        <VStack gap={6} align="stretch">
          <Box >
            <Heading 
              color="whiteAlpha.900" 
              size="4xl" 
              mb={4}
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.1)'}}
            >
              What does it mean to "Manifest"
            </Heading>
            <Box 
          color="white" 
          textAlign="center" 
          maxW="container.md"
          borderTop="1px solid rgba(255,255,255,0.1)"
            ></Box>
          </Box>
  
          <Box>
            <Text 
              color="whiteAlpha.800" 
              mb={4}
              lineHeight="tall"
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.02)'}}
            >
              There's many different interperations of what to manifest means. In this app, we try to give you a practical way to figure out what it means for you.
            </Text>
  
            <Text 
              color="whiteAlpha.800" 
              mb={4}
              lineHeight="tall"
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.02)'}}
            >
              Manifesting can be thought of as listening or reading positive thoughts. You are the one who creates these thoughts. In this app, we provide you with the ability to listen or read to your prompts - choosing between listening or reading is mostly a preference.
            </Text>
            <Text               
              color="whiteAlpha.800" 
              mb={4}
              lineHeight="tall"
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.02)'}}
              > A manifest can come in many different forms. When getting started for the first time, it's suggested to start with many one lined sentences with assertive claims. These claims are places you should envision yourself being in the future. As a general thought, push further. Go from something like 'I am good at Basketball' to 'I am the best basketball player I've ever seen' As a more advanced approach, you can start with multi-line more complex thoughts. Here are some initial examples below on where to start:</Text>
          </Box>
  
          <Box 
            // bg="whiteAlpha.100" 
            // p={4} 
            // borderRadius="md"
            // borderLeft="4px solid"
            // borderColor="purple.500"
            // transition="all .20s ease" 
            // _hover={{ transform: 'scale(1.1)'}}
          >
            <Text 
            color="whiteAlpha.700" 
            fontStyle="italic" 
            mb={4}
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="purple.500"
            padding={2}
            paddingLeft={4}
            >
              I know my perspective is valued at the book club
            </Text>
            <Text 
            color="whiteAlpha.700" 
            fontStyle="italic" 
            mb={4}
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="purple.500"
            padding={2}
            paddingLeft={4}>
               I can get whatever I put my mind towards in my career
            </Text>
            <Text 
            color="whiteAlpha.700" 
            fontStyle="italic"
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="purple.500"
            padding={2}
            paddingLeft={4}>
              I am the light of the party in my friend group
            </Text>
          </Box>
          <Box 
          color="white" 
          textAlign="center" 
          maxW="container.md"
          borderTop="1px solid rgba(255,255,255,0.1)"
            ></Box>
          <Box>
            <Heading 
              color="whiteAlpha.900" 
              size="3xl" 
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.1)'}}
            > Background </Heading>
          </Box>
  
          <Box>
            <Text color="whiteAlpha.800" 
                mb={4} 
                lineHeight="tall"
                transition="all .20s ease" 
                _hover={{ transform: 'scale(1.02)'}}
            >
              The book Secret by Rhonda Byrne claims that when you manifest, the things you say magnetically attract to you via the universe's law of attraction.
            </Text>
  
            <Text color="whiteAlpha.800" mb={4}
            transition="all .20s ease" 
            _hover={{ transform: 'scale(1.02)'}} >In the bible it says:</Text>
  
            <Box 
              bg="whiteAlpha.100" 
              p={4} 
              borderRadius="md" 
              borderLeft="4px solid" 
              borderColor="blue.500"
              mb={4}
              transition="all .20s ease" 
              _hover={{ transform: 'scale(1.1)'}}
            >
              <Text>
                Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours. - Mark 11:24
              </Text>
            </Box>
  
            <Text color="whiteAlpha.800" 
            mb={4} 
            lineHeight="tall"
            transition="all .20s ease" 
            _hover={{ transform: 'scale(1.02)'}}>
              Many others just think the results come from the placebo effect.
            </Text>
  
            <Text color="whiteAlpha.800" mb={4} lineHeight="tall"             
            transition="all .20s ease" 
            _hover={{ transform: 'scale(1.02)'}}>
              Wherever this phenomenon comes from, it's been proven to work.
            </Text>
  
            <Box>
              <Link
                href="#"
                display="inline-block"
                mt={4}
                px={6}
                py={3}
                bg="purple.600"
                color="white"
                borderRadius="full"
                fontWeight="bold"
                transition="all .20s ease" 
                _hover={{ 
                  bg: "purple.700",
                  textDecoration: "none",
                  transform: 'scale(1.02)'
                }}
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                Start now!
              </Link>
            </Box>
          </Box>
        </VStack>
      </Box>
    );
  };
  
  