import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  VStack,
  Container,
} from '@chakra-ui/react';
import Home from './home';
import Trends from './trends';
import GoalView from './goal-view';

const VerticalScrollNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'section1', title: 'Home', element: <Home /> },
    { id: 'section2', title: 'Trends', element: <Trends /> },
    { id: 'section3', title: 'Goals', element: <GoalView /> },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(currentSection);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * (containerRef.current.clientHeight || 0),
      behavior: 'smooth',
    });
  };

  return (
    <Container maxW="1400px" p={0} h="100vh">
      <Flex h="full">
        <Box position="relative">
          <Box position="fixed" h="100vh" display="flex" alignItems="center">
            <VStack gap={2} align="stretch" py={8}>
              {sections.map((section, index) => (
                <Box key={section.id} position="relative">
                  <Button
                    onClick={() => scrollToSection(index)}
                    variant="subtle"
                    display="flex"
                    alignItems="center"
                    position="relative"
                    px={4}
                    py={2}
                    color={activeSection === index ? "blue.500" : "gray.500"}
                    _hover={{
                      color: activeSection === index ? "blue.600" : "gray.600"
                    }}
                    transition="color 0.2s"
                  >
                    <Box
                      position="absolute"
                      left={0}
                      top="50%"
                      transform="translateY(-50%)"
                      h="2px"
                      bg="blue.500"
                      transition="all 0.3s"
                      w={activeSection === index ? "24px" : "0"}
                      opacity={activeSection === index ? 1 : 0}
                    />
                    <Box ml={8}>
                      {section.title}
                    </Box>
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>

        <Box
          ref={containerRef}
          flex="1"
          overflowY="auto"
          css={{
            '&': {
              scrollSnapType: 'y mandatory',
            },
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          {sections.map((section) => (
            <Flex
              key={section.id}
              h="100vh"
              alignItems="center"
              justifyContent="center"
              css={{
                scrollSnapAlign: 'start',
              }}
            >
              {section.element}
            </Flex>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};

export default VerticalScrollNav;