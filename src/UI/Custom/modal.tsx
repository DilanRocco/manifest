import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DefaultModalProps {
  modalName: string;
  children: ReactNode;
  trigger: ReactNode; // The button or element that opens the modal
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
          w="60%"
          p="20px"
          maxW="600px"
          minW="300px"
          shadow="xl"
          borderRadius="5px"
        >
          <ModalHeader>{modalName}</ModalHeader>
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DefaultModal;