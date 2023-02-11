import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { AlertDelete } from "@/components/Alerts/AlertDelete";
import { deleteAgenda, useAgendas, atualizarSituacaoAgenda, useAgendasSituacao } from "@/services/hooks/useAgendas";
import { ModalInfo } from "@/components/ModalInfo";
import { AlertCancelar } from "@/components/Alerts/AlertCancelar";
import { AlertRealizar } from "@/components/Alerts/AlertRealizar";
import { useState } from "react";

type ErrorMessage = {
    message: string;
};

export default function Agendas() {

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { data, isLoading, isFetching, error, refetch } = useAgendasSituacao("CANCELADO")

    const handleDeleteAgenda = async (id: number) => {
        await deleteAgenda(id).catch(error => setErrorMessage({ message: error.response.data.detail }));
        refetch();
    };

    

    const handleAtualizarSituacaoAgenda = async (id: number, situacao: string) => {
        await atualizarSituacaoAgenda(id, situacao).catch(error => setErrorMessage({ message: error.response.data.detail }));;
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
                                                <Text>{agenda.usuario!.nome}</Text>

                                                <ModalInfo title={"Dados do Paciente"}>
                                                    <Box>
                                                        <Text fontWeight='bold'>{"Dados Pessoais"}</Text>
                                                        <Text>{"Nome: " + agenda.usuario!.nome}</Text>
                                                        <Text>{"Data de Nascimento: " + new Intl.DateTimeFormat('pt-BR').format(new Date(agenda.usuario!.dataNascimento!))}</Text>
                                                        <Text>{"Sexo: " + agenda.usuario!.sexo}</Text>
                                                        <Text>{"Alergia: " + agenda.usuario!.alergia}</Text>

                                                    </Box>
                                                    <Divider my="3" borderColor="gray.400" />
                                                    <Box>
                                                        <Text fontWeight='bold' whiteSpace="pre-line">{"Endereço"}</Text>
                                                        <Text>{"Logradouro: " + agenda.usuario!.logradouro}</Text>
                                                        <Text>{"Numero: " + agenda.usuario!.numeroLogradouro}</Text>
                                                        <Text>{"Setor: " + agenda.usuario!.setor}</Text>
                                                        <Text>{"Cidade: " + agenda.usuario!.cidade}</Text>
                                                        <Text>{"UF: " + agenda.usuario!.uf}</Text>
                                                    </Box>
                                                </ModalInfo>

                                            </Td>

                                            <Td>
                                                <Text fontWeight='bold'>{agenda.vacina!.titulo}</Text>
                                                <Text>{agenda.vacina!.doses === 1 ? "Dose ÚNICA" :
                                                    "Dose: " + agenda.numeroDose + " de " + agenda.vacina!.doses}
                                                </Text>


                                                <ModalInfo title={"Dados da Vacina"}>
                                                    <Box>
                                                        <Text>{agenda.vacina!.doses === 1 ? "Dose ÚNICA" :
                                                            "Dose do agendamento: " + agenda.numeroDose + " de " + agenda.vacina!.doses}
                                                        </Text>
                                                        <Divider my="3" borderColor="gray.400" />
                                                        <Text fontWeight='bold'>{"Aplicação"}</Text>
                                                        <Text>{"Título: " + agenda.vacina!.titulo}</Text>
                                                        <Text>{"Doses Totais: " + agenda.vacina!.doses}</Text>
                                                        <Text>{"Intervalo: " + agenda.vacina!.intervalo} {agenda.vacina!.periodicidade}</Text>
                                                        <Text>{"Descrição: " + agenda.vacina!.descricao}</Text>
                                                    </Box>

                                                </ModalInfo>
                                            </Td>



                                            <Td>
                                                <Text fontWeight='bold' color={agenda.situacao === "AGENDADO" ? "blue.500" : (agenda.situacao === "CANCELADO" ? "orange.500" : "green.500")}>
                                                    {agenda.situacao}
                                                </Text>
                                                    
                                                <Text size="8px" >{agenda.situacao !== "AGENDADO" ? new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(agenda.dataSituacao!) ): ""
                                                }</Text>


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
                                                    <Text fontWeight="bold">Deseja excluir o agendamento do dia: {new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(agenda.data))} - {agenda.hora}?</Text>
                                                    <Text>Todos os agendamentos vinculados serão excluídos!</Text>
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