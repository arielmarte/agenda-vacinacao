import NextLink from "next/link";
import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, ButtonGroup, Checkbox, Divider, Flex, Heading, HStack, Icon, Link, SimpleGrid, Spinner, Table, Tbody, Td, Th, Thead, Tr, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiDeleteBin7Line, RiInformationLine } from "react-icons/ri";
import { useUsers } from "@/services/hooks/useUsers";

export default function Alergias() {

    const { data, isLoading, isFetching, error } = useUsers()


    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.100" p="8">
                    <Heading size="lg" fontWeight="normal">Alergias</Heading>
                    <Flex mb="8" justify="flex-end" align="center">
                        <ButtonGroup>
                            <Button
                                as={NextLink}
                                href="/users/create"
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
                                    <Th>Descrição</Th>
                                    <Th>Detalhes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data!.users.map(user => {
                                    return (
                                        <Tr key={user.id}>

                                            <Td>
                                                {user.createdAt}
                                            </Td>
                                            <Td>
                                                <Text fontSize="sm" color="gray.600">{user.email}</Text>  
                                            </Td>
                                            <Td>
                                                <Button
                                                as={NextLink}
                                                href={`/users/edit/${user.id}`}
                                                // colorScheme="green"
                                                leftIcon={<Icon as={RiInformationLine} fontSize="20" />}
                                                >

                                                </Button>
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