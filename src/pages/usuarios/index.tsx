import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { deleteUsuario, useUsuarios } from "@/services/hooks/useUsuarios";
import { ModalInfo } from "@/components/ModalInfo";
import { AlertDelete } from "@/components/AlertDelete";


export default function Usuarios() {

    const { data, isLoading, isFetching, error, refetch } = useUsuarios()

    const handleDeleteUsuario = async (id: number) => {
        await deleteUsuario(id);
        refetch();
    };


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
                                                    <Text>{"Numero: " + usuario.numero}</Text>
                                                    <Text>{"Setor: " + usuario.setor}</Text>
                                                    <Text>{"Cidade: " + usuario.cidade}</Text>
                                                    <Text>{"UF: " + usuario.uf}</Text>
                                                </ModalInfo>
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