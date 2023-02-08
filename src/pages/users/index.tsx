import NextLink from "next/link";
import { ButtonGroup, Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { ModalForm } from "@/components/ModalForm";

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  //console.log(teste)


  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.100" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários
            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

          <ButtonGroup>
            <Button
              as={NextLink}
              href="/users/create"
              size="sm"
              fontSize="sm"
              colorScheme="green"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>

            <Button
              as={NextLink}
              href="/users/create"
              size="sm"
              fontSize="sm"
              colorScheme="red"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Excluir
            </Button>
            <ModalForm buttonName={"teste"} title={"meuTeste"}>
              <input type="text" placeholder="Nome" />
            </ModalForm>
            </ButtonGroup>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
             <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="green" borderColor='green'/>
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  {data!.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="green" borderColor='green'/>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.600">{user.email}</Text>
                          </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td> }
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
          )}
        </Box>
      </Flex>
    </Box>
  );
}