import React from 'react';
import { HStack, useDisclosure, Box } from '@chakra-ui/react';
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';

interface DefaultModalProps {
  modalName: string;
  children: React.ReactNode;
  trigger: React.ReactNode; 
}

const DefaultModal: React.FC<DefaultModalProps> = ({ modalName, children, trigger }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{trigger}</div>

      <Modal isOpen={open} onClose={onClose} isCentered size="sm">
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent
          bg="black"
          mx="auto"
          p="20px"
          maxW="90%"
          minW="300px"
          shadow="xl"
          borderRadius="5px"
        >
          <HStack justify="space-between" align="center" w="100%">
            <ModalHeader fontWeight="bold" fontSize="x-large">
              {modalName}
            </ModalHeader>
            <ModalCloseButton cursor="pointer" size="sm" />
          </HStack>
          <Box
            maxHeight="90vh" 
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray',
                borderRadius: '4px',
              },
            }}
          >
            {children}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DefaultModal;