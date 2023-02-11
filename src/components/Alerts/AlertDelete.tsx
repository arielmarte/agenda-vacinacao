import { Text, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, Icon, Tooltip } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { RiDeleteBin7Line } from "react-icons/ri";

interface AlertDeleteProps {
  idDelete: number | string;
  children: ReactNode;
  onDelete: (id: number | string) => void;
}

export function AlertDelete({idDelete, children, onDelete}: AlertDeleteProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null)

    const handleDelete = () => {
      onClose()
      onDelete(idDelete)
    }

    return (
      <>
      <Tooltip label="Excluir" placement="top">
        <Button onClick={onOpen}>
      
        <Icon color='red' as={RiDeleteBin7Line} fontSize="20" />
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
                Confirmação de Exclusão
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {children}
                
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
