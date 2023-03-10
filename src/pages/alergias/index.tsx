import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { AlertDelete } from "@/components/Alerts/AlertDelete";
import { deleteAlergia, useAlergias } from "@/services/hooks/useAlergias";
import { useState } from "react";

type ErrorMessage = {
    message: string;
};

export default function Alergias() {

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { data, isLoading, isFetching, error, refetch }  = useAlergias()

    const handleDeleteAlergia = async (id: number) => {
        await deleteAlergia(id).catch(error => setErrorMessage({ message: error.response.data.detail }));
        refetch();
      };


    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.100" p="8">
                    
                    <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal">Alergias</Heading>
                        <ButtonGroup>
                            <Button
                                as={NextLink}
                                href="/alergias/create"
                                size="sm"
                                fontSize="sm"
                                colorScheme="green"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Adicionar
                            </Button>
                        </ButtonGroup>
                    </Flex>
                    <Divider my="6" borderColor="gray.400" />
                    {errorMessage.message !== "" && (
                        <Alert status='error'  >
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Ocorreu um erro</AlertTitle>
                                <AlertDescription>
                                    {errorMessage.message}
                                </AlertDescription>
                            </Box>
                            <CloseButton
                                alignSelf='flex-end'
                                position='absolute'
                                right={1}
                                top={1}
                                onClick={() => setErrorMessage({ message: "" })}
                            />
                        </Alert>
                    )}
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>

                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados.</Text>
                        </Flex>

                    ) : (
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th textAlign='center'>Excluir</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data!.alergias.map(alergia => {
                                    return (
                                        <Tr key={alergia.id}>

                                            <Td>
                                                {alergia.nome}
                                            </Td>
                                            
                                            
                                            <Td textAlign='center'>
                                                <AlertDelete idDelete={alergia.id!!} onDelete={() => handleDeleteAlergia(alergia.id!!)}>
                                                    <Text fontWeight="bold">Deseja excluir a alergia: {alergia.nome}?</Text>
                                                </AlertDelete>
                                            </Td>

                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    )}



                </Box>
            </Flex>
        </Box>
    )
}