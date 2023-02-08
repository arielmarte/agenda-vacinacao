import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react"
import React, { FormEvent, ReactNode } from "react"

interface ModalFormProps {
  buttonName: string;
  title: string;
  children: ReactNode;
  cleanForm: () => void;
  onSubmit: () => void;

  
}

export function ModalForm({title, children, buttonName, cleanForm, onSubmit}: ModalFormProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleClose = () => {
      cleanForm();
      onClose();
    }

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      onSubmit();
    }
  
    return (
      <>
        <Button onClick={onOpen}>{buttonName}</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit" onClick={handleSubmit}>
                Salvar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }