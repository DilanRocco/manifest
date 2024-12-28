import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack
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
      top: index * containerRef.current.clientHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Flex h="100vh">
      <VStack
        w="200px"
        bg="gray.100"
        gap={0}
        align="stretch"
      >
        {sections.map((section, index) => (
          <Button
            key={section.id}
            onClick={() => scrollToSection(index)}
            variant="ghost"
            justifyContent="flex-start"
            h="auto"
            py={4}
            borderRadius={0}
            borderLeft="4px solid"
            borderLeftColor={activeSection === index ? 'blue.500' : 'transparent'}
            bg={activeSection === index ? 'white' : 'transparent'}
            _hover={{
              bg: activeSection === index ? 'white' : 'gray.200'
            }}
          >
            {section.title}
          </Button>
        ))}
      </VStack>

      <Box
        ref={containerRef}
        flex="1"
        overflowY="auto"
        css={{
          '&': {
            scrollSnapType: 'y mandatory',
          },
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none'
        }}
      >
        {sections.map((section) => (
          <Box
            key={section.id}
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            css={{
              scrollSnapAlign: 'start'
            }}
          >
            {section.element}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default VerticalScrollNav;