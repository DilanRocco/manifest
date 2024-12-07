import React, { useState } from 'react';
import { Box, Flex, HStack, VStack, Text, Heading } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { 
  MdOutlinePsychology, 
  MdOutlineMoving, 
  MdOutlineAutoGraph, 
  MdOutlineSelfImprovement, 
  MdOutlineEmojiObjects, 
  MdOutlineWhatshot 
} from 'react-icons/md';

const shakeAnimation = keyframes`
 0% { transform: translateX(0); }
 25% { transform: translateX(-5px); }
 50% { transform: translateX(5px); }
 75% { transform: translateX(-5px); }
 100% { transform: translateX(0); }
`;

type BenefitBoxProps = {
  title: string;
  description: string;
  icon: React.ElementType;
}

const BenefitBox = (props: BenefitBoxProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="lg"
      p={6}
      minW="300px"
      maxW="300px"
      h="280px"
      color="white"
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s"
      boxShadow="lg"
      _hover={{ 
        animation: `${shakeAnimation} 0.4s ease-in-out`,
        transform: "scale(1.05)"
      }}
    >
      <VStack gap={4} align="center" h="full" justifyContent="center">
        <Box 
          as={props.icon} 
          w={16} 
          h={16} 
          color={isHovered ? "blue.500" : "white"}
          transition="color 0.3s"
        />
        <Text fontSize="xl" fontWeight="bold" mb={3} textAlign="center">
          {props.title}
        </Text>
        <Text fontSize="md" textAlign="center">
          {props.description}
        </Text>
      </VStack>
    </Box>
  );
};

const BenefitsPage = () => {
  const benefits = [
    {
      title: "Transform Your Thinking",
      description: "Reshape your mindset and unlock your full potential through powerful cognitive reframing.",
      icon: MdOutlinePsychology
    },
    {
      title: "Emotional Mastery",
      description: "Develop deeper emotional intelligence and create positive emotional states.",
      icon: MdOutlineMoving
    },
    {
      title: "Personal Growth Acceleration",
      description: "Propel yourself to the next level of personal development and self-awareness.",
      icon: MdOutlineAutoGraph
    },
    {
      title: "Self-Actualization",
      description: "Manifest the ideal version of yourself and align with your true potential.",
      icon: MdOutlineSelfImprovement
    },
    {
      title: "Clarity and Vision",
      description: "Gain crystal-clear insights into your goals and create a roadmap for success.",
      icon: MdOutlineEmojiObjects
    },
    {
      title: "Unleash Your Passion",
      description: "Ignite your inner fire and cultivate unwavering motivation and enthusiasm.",
      icon: MdOutlineWhatshot
    }
  ];

  return (
    <Box 
      bg="#242424" 
      minH="100vh" 
      p={8} 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
    >
      <VStack gap={8} maxW="container.xl" w="full">
        <Heading 
          color="white" 
          lineHeight={"1"}
          fontSize={["3xl", "4xl", "5xl"]} 
          fontWeight="bold" 
          textAlign="center"
          mb={6}
        >
          The Transformative Power of Manifesting
        </Heading>

        <Flex 
          flexWrap="wrap" 
          justifyContent="center" 
          gap={6}
        >
          {benefits.map((benefit, index) => (
            <BenefitBox key={index} {...benefit} />
          ))}
        </Flex>

        <Box 
          color="white" 
          textAlign="center" 
          maxW="container.md"
          borderTop="1px solid rgba(255,255,255,0.1)"
          pt={8}
          mt={8}
        >

          <Text fontSize="xl" mb={4}>
          By consistently applying manifesting techniques, you can rewire your subconscious, 
          overcome limiting beliefs, and create a life aligned with your deepest aspirations.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default BenefitsPage;