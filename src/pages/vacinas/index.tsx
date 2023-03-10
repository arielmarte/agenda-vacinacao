

import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { deleteVacina, useVacinas } from "@/services/hooks/useVacinas";
import { ModalInfo } from "@/components/ModalInfo";
import { AlertDelete } from "@/components/Alerts/AlertDelete";
import { useState } from "react";

type ErrorMessage = {
    message: string;
};

export default function Vacinas() {

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { data, isLoading, isFetching, error, refetch } = useVacinas()

    const handleDeleteVacina = async (id: number) => {
        await deleteVacina(id).catch(error => setErrorMessage({ message: error.response.data.detail }));
        refetch();
    };


    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.100" p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Vacinas</Heading>
                        <ButtonGroup>
                            <Button
                                as={NextLink}
                                href="/vacinas/create"
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
                                    <Th>T??tulo</Th>
                                    <Th>Doses</Th>
                                    <Th>Intervalo</Th>
                                    <Th textAlign='center'>Descri????o</Th>
                                    <Th textAlign='center'>Excluir</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data!.vacinas.map(vacina => {
                                    return (
                                        <Tr key={vacina.id}>

                                            <Td>
                                                {vacina.titulo}
                                            </Td>
                                            <Td>
                                                {vacina.doses}
                                            </Td>
                                            <Td>
                                                <Text>{vacina.intervalo} {vacina.periodicidade}</Text>
                                            </Td>
                                            <Td textAlign='center'>
                                                <ModalInfo title={vacina.titulo}>
                                                    <Text>{vacina.descricao}</Text>
                                                </ModalInfo>
                                            </Td>
                                            <Td textAlign='center'>
                                                <AlertDelete idDelete={vacina.id!!} onDelete={() => handleDeleteVacina(vacina.id!!)}>
                                                    <Text fontWeight="bold">Deseja excluir a vacina: {vacina.titulo}?</Text>
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