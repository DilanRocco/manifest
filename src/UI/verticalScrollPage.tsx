import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
  Tabs
} from '@chakra-ui/react';
import Home from './home';
import Trends from './trends';
import GoalView from './goal-view';

const ResponsiveNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    { id: 'section1', title: 'Home', element: <Home /> },
    { id: 'section2', title: 'Trends', element: <Trends /> },
    { id: 'section3', title: 'Goals', element: <GoalView /> },
  ];

  useEffect(() => {
    if (isMobile) return;
    
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
  }, [isMobile]);

  const scrollToSection = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * (containerRef.current.clientHeight || 0),
      behavior: 'smooth',
    });
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <Box h="100vh">
      <Tabs.Root
          variant="enclosed"
          value={sections[activeSection].title}
          onValueChange={(value) => {
            const index = sections.findIndex(section => section.title === value.value);
            setActiveSection(index);
          }}
          display="flex"
          flexDirection="column"
          h="full"
      >
        <Tabs.List
          position="fixed"
          top="0"
          width="100%"
          zIndex={1000}
          justifyContent="stretch"
        >
          {sections.map((section) => (
            <Tabs.Trigger
              value={section.title}
              key={section.id}
              flex="1"
              py={4}
              _selected={{
                color: "blue.500",
                borderTop: "2px solid",
                borderTopColor: "blue.500"
              }}
            >
              {section.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box flex="1" overflowY="auto" pt="56px">
            {sections.map((section) => (
              <Tabs.Content background='none'value={section.title} key={section.id} px={4} h="full">
                {section.element}
              </Tabs.Content>
            ))}
        </Box>

        
      </Tabs.Root>
    </Box>
  );
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
                    variant="ghost"
                    display="flex"
                    alignItems="center"
                    position="relative"
                    px={4}
                    py={2}
                    fontSize={'2xl'}
                    color={activeSection === index ? "white" : "gray.500"}
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
                      bg="white"
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

export default ResponsiveNav;