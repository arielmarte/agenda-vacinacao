import { Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, Icon, Tooltip } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { MdCancelPresentation } from "react-icons/md";

interface AlertCancelarProps {
  idCancelar: number | string;
  children: ReactNode;
  onCancelar: (id: number | string) => void;
}

export function AlertCancelar({idCancelar, children, onCancelar}: AlertCancelarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)

    const handleCancelar = () => {
      onClose()
      onCancelar(idCancelar)
    }

    return (
      <>
      <Tooltip label="Cancelar" placement="top">
        <Button onClick={onOpen}>
      
        <Icon color='orange.500' as={MdCancelPresentation} fontSize="20" />
        </Button>
        </Tooltip>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Confirmação de Cancelamento
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {children}
                
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Voltar
                </Button>
                <Button colorScheme='orange' onClick={handleCancelar} ml={3}>
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
