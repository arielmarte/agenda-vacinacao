import NextLink from "next/link";
import { useRouter } from 'next/router';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { deleteUsuario, useUsuarios } from "@/services/hooks/useUsuarios";
import { ModalInfo } from "@/components/ModalInfo";
import { AlertDelete } from "@/components/Alerts/AlertDelete";
import { useState } from "react";
import { BsCalendar2 } from "react-icons/bs";

type ErrorMessage = {
    message: string;
};

export default function Usuarios() {

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { data, isLoading, isFetching, error, refetch } = useUsuarios()

    const handleDeleteUsuario = async (id: number) => {
        await deleteUsuario(id).catch(error => setErrorMessage({ message: error.response.data.detail }));
        refetch();
    };

    const router = useRouter();
    function handleRedirect(id: number, nome: string) {
        router.push({
            pathname: '/usuarios/agendaUsuario',
            query: { id: id , nome: nome },
        });
    }
    //const { id } = router.query;

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.100" p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuarios</Heading>
                        <ButtonGroup>
                            <Button
                                as={NextLink}
                                href="/usuarios/create"
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
                                    <Th>Data de Nascimento</Th>
                                    <Th>Sexo</Th>
                                    <Th textAlign='center'>Endereço</Th>
                                    <Th textAlign='center'>Alergias</Th>
                                    <Th textAlign='center'>Agendamentos</Th>
                                    <Th textAlign='center'>Excluir</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data!.usuarios.map(usuario => {
                                    return (
                                        <Tr key={usuario.id}>

                                            <Td>
                                                {usuario.nome}
                                            </Td>
                                            <Td>
                                                {new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(usuario.dataNascimento)
                                                )}
                                            </Td>
                                            <Td>
                                                <Text>{usuario.sexo}</Text>
                                            </Td>
                                            <Td textAlign='center'>
                                                <ModalInfo title={"Endereço de " + usuario.nome}>
                                                    <Text>{"Logradouro: " + usuario.logradouro}</Text>
                                                    <Text>{"Numero: " + usuario.numeroLogradouro}</Text>
                                                    <Text>{"Setor: " + usuario.setor}</Text>
                                                    <Text>{"Cidade: " + usuario.cidade}</Text>
                                                    <Text>{"UF: " + usuario.uf}</Text>
                                                </ModalInfo>
                                            </Td>

                                            <Td textAlign='center'>
                                                {!usuario.alergias ? (
                                                    <Icon as={RiInformationLine} fontSize="20" color="gray.300" />
                                                ) : (
                                                    <ModalInfo title={"Alergias de " + usuario.nome}>
                                                        {usuario.alergias
                                                            .map(alergia => {
                                                                return <Text key={alergia.id}>{alergia.nome}</Text>;
                                                            })
                                                        }
                                                    </ModalInfo>
                                                )}
                                            </Td>

                                            <Td textAlign='center'>
                                                <Button onClick={() => handleRedirect(usuario.id!, usuario.nome!)} colorScheme="green">
                                                    <Icon color='white' as={BsCalendar2} fontSize="20" />
                                                </Button>
                                            </Td>


                                            <Td textAlign='center'>
                                                <AlertDelete idDelete={usuario.id!!} onDelete={() => handleDeleteUsuario(usuario.id!!)}>
                                                    <Text fontWeight="bold">Deseja excluir a usuario: {usuario.nome}?</Text>
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