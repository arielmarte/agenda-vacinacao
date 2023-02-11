import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { AlertDelete } from "@/components/Alerts/AlertDelete";
import { deleteAgenda, useAgendas } from "@/services/hooks/useAgendas";
import { ModalInfo } from "@/components/ModalInfo";

export default function Agendas() {

    const { data, isLoading, isFetching, error, refetch } = useAgendas()

    const handleDeleteAgenda = async (id: number) => {
        await deleteAgenda(id);
        refetch();
    };


    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.100" p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Agendas</Heading>
                        <ButtonGroup>
                            <Button
                                as={NextLink}
                                href="/agendas/create"
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
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Data & Hora</Th>
                                    <Th>Usuário</Th>
                                    <Th>Vacina</Th>
                                    <Th>Situação</Th>
                                    <Th textAlign='center'>Observações</Th>
                                    <Th textAlign='center'>Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data!.agendas.map(agenda => {
                                    return (
                                        <Tr key={agenda.id}>
                                            <Td>
                                                <Text fontWeight='bold' >{new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(agenda.data)
                                                )}</Text>
                                                <Text> {agenda.hora}</Text>
                                            </Td>

                                            <Td>
                                                <Text>{agenda.usuario.nome}</Text>

                                                <ModalInfo title={"Dados do Paciente"}>
                                                    <Box>
                                                        <Text fontWeight='bold'>{"Dados Pessoais"}</Text>
                                                        <Text>{"Nome: " + agenda.usuario.nome}</Text>
                                                        <Text>{"Data de Nascimento: " + new Intl.DateTimeFormat('pt-BR').format(new Date(agenda.usuario.dataNascimento))}</Text>
                                                        <Text>{"Sexo: " + agenda.usuario.sexo}</Text>
                                                        <Text>{"Alergia: " + agenda.usuario.alergia}</Text>

                                                    </Box>
                                                    <Divider my="3" borderColor="gray.400" />
                                                    <Box>
                                                        <Text fontWeight='bold' whiteSpace="pre-line">{"Endereço"}</Text>
                                                        <Text>{"Logradouro: " + agenda.usuario.logradouro}</Text>
                                                        <Text>{"Numero: " + agenda.usuario.numeroLogradouro}</Text>
                                                        <Text>{"Setor: " + agenda.usuario.setor}</Text>
                                                        <Text>{"Cidade: " + agenda.usuario.cidade}</Text>
                                                        <Text>{"UF: " + agenda.usuario.uf}</Text>
                                                    </Box>
                                                </ModalInfo>

                                            </Td>

                                            <Td>
                                                <Text fontWeight='bold'>{agenda.vacina.titulo}</Text>
                                                <Text>{agenda.vacina.doses === 1 ? "Dose ÚNICA" :
                                                    "Dose: " + agenda.numeroDose + " de " + agenda.vacina.doses}
                                                </Text>


                                                <ModalInfo title={"Dados da Vacina"}>
                                                    <Box>
                                                        <Text>{agenda.vacina.doses === 1 ? "Dose ÚNICA" :
                                                            "Dose do agendamento: " + agenda.numeroDose + " de " + agenda.vacina.doses}
                                                        </Text>
                                                        <Divider my="3" borderColor="gray.400" />
                                                        <Text fontWeight='bold'>{"Aplicação"}</Text>
                                                        <Text>{"Título: " + agenda.vacina.titulo}</Text>
                                                        <Text>{"Doses Totais: " + agenda.vacina.doses}</Text>
                                                        <Text>{"Intervalo: " + agenda.vacina.intervalo} {agenda.vacina.periodicidade}</Text>
                                                        <Text>{"Descrição: " + agenda.vacina.descricao}</Text>
                                                    </Box>

                                                </ModalInfo>
                                            </Td>



                                            <Td>
                                                <Text fontWeight='bold' color={agenda.situacao === "AGENDADO" ? "blue.500" : (agenda.situacao === "CANCELADO" ? "yellow.500" : "green.500")}>
                                                    {agenda.situacao}
                                                </Text>

                                                <Text size="8px" >{new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(agenda.dataSituacao)
                                                )}</Text>


                                            </Td>

                                            <Td textAlign='center'>
                                                {!agenda.observacoes ? <Icon as={RiInformationLine} fontSize="20" color="gray.300" /> :

                                                    <ModalInfo title={"Observações do Agendamento"}>
                                                        <Text>{agenda.observacoes}</Text>
                                                    </ModalInfo>


                                                }
                                            </Td>

                                            <Td textAlign='center'>
                                                <AlertDelete idDelete={agenda.id!!} onDelete={() => handleDeleteAgenda(agenda.id!!)}>
                                                    <Text fontWeight="bold">Deseja excluir o agendamento do dia: {agenda.data} - {agenda.hora}?</Text>
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