import { Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, Icon, Tooltip } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { MdDoneOutline } from "react-icons/md";

interface AlertRealizarProps {
  idRealizar: number | string;
  children: ReactNode;
  onRealizar: (id: number | string) => void;
}

export function AlertRealizar({idRealizar, children, onRealizar}: AlertRealizarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)

    const handleRealizar = () => {
      onClose()
      onRealizar(idRealizar)
    }

    return (
      <>
      <Tooltip label="Realizar" placement="top">
        <Button onClick={onOpen}>
      
        <Icon color='green' as={MdDoneOutline} fontSize="20" />
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
                Confirmação de Realização
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {children}
                
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='green' onClick={handleRealizar} ml={3}>
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
