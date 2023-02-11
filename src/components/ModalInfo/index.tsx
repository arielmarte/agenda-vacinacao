import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Icon, Tooltip } from "@chakra-ui/react"
import React, { FormEvent, ReactNode } from "react"
import { RiInformationLine } from "react-icons/ri";

interface ModalInfoProps {
  title: string;
  children: ReactNode;
}

export function ModalInfo({title, children}: ModalInfoProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
      <Tooltip label="Mais Informações" placement="top">
        <Button onClick={onOpen}><Icon as={RiInformationLine} fontSize="20" /></Button>
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='green' mr={3}  onClick={onClose}>
                Concluído
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }