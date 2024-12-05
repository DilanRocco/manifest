import { Box, Flex, HStack, Text} from "@chakra-ui/react";
import { keyframes } from '@emotion/react'
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;
type BenefitBoxProps = {
    title: string
    description: string
}
const BenefitBox = (props: BenefitBoxProps) => (
  <Box
    bg="rgba(255, 255, 255, 0.1)"
    borderRadius="lg"
    p={6}
    minW="280px"
    maxW="280px"
    h="200px"
    color="white"
    _hover={{ animation: `${shakeAnimation} 0.5s ease-in-out` }}
    transition="all 0.3s"
    mr={4}
  >
    <Text fontSize="xl" fontWeight="bold" mb={3}>
      {props.title}
    </Text>
    <Text fontSize="md">{props.description}</Text>
  </Box>
);

const BenefitsPage = () => {
  const benefits = [
    {
      title: "Transform Your Thinking",
      description: "Reshape your mindset and unlock your full potential.",
    },
    {
      title: "Elevate Your Growth",
      description: "Propel yourself to the next level of personal development.",
    },
    {
      title: "Become Your Ideal Self",
      description: "Manifest the person you've always aspired to be.",
    },
  ];

  return (
    <Box bg="#242424" minH="90vh" p={8}>
      <Text color="white" fontSize="3xl" fontWeight="bold" mb={6}>
        Benefits of Manifesting
      </Text>
    <HStack>
        {benefits.map((benefit, index) => (
          <BenefitBox key={index} {...benefit} />
        ))}
    </HStack>
    </Box>
  );
};

export default BenefitsPage;