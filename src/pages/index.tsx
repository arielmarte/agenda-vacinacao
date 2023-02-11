import NextLink from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, HStack, VStack } from "@chakra-ui/react";
import { RiAddLine, RiInformationLine } from "react-icons/ri";
import { deleteUsuario, useUsuarios } from "@/services/hooks/useUsuarios";
import { ModalInfo } from "@/components/ModalInfo";
import { AlertDelete } from "@/components/Alerts/AlertDelete";


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

                    <Flex mb="8" justify="center" align="center">
                        <Heading size="lg" fontWeight="normal">Projeto Web - Agenda de Vacinação</Heading>

                    </Flex>
                    <Divider my="6" borderColor="gray.400" />
                    <Flex justify="center">
                    <VStack spacing="4">
                            <Text>
                                Projeto desenvolvido como trabalho final da disciplina de Software para Persistência de Dados, no semestre 2022/2 do curso de Engenharia de Software da Universidade Federal de Goiás, por:
                                <br />  • <strong>Ariel Marte Araújo Silva (201900264)</strong>
                                <br />  • <strong>Marco Feitosa Araújo (201905542)</strong>
                                <br/>
                            </Text>
                            <Heading size="md" fontWeight="normal">Descrição do Projeto</Heading>
                            <Text>
                                <br/>Aplicação para agendamento de vacinas, com back-end em Java Spring Boot e front-end em React.
                                A aplicação permite cadastro, consulta e remoção de usuários, alergias, vacinas e agendamentos. Há opções de listagem completa para todas as tabelas, agendas com opção de listagem por <strong>Canceladas</strong> ou <strong>Realizadas</strong>, listagem de agendas por dia, agendamentos por usuário, e a opção de “dar baixa” em uma agenda (definindo-a como <strong>Canceladas</strong> ou <strong>Realizadas</strong>).
                            </Text>
                    </VStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}