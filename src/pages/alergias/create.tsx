import Router from 'next/router';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import NextLink from 'next/link'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useCreateAlergia } from "@/services/hooks/useAlergias";

type CreateAlergiaFormData = {
    nome: string;
};

const createAlergiaFormSchema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório')
})

export default function CreateAlergia() {
    const { register, handleSubmit, formState } = useForm<CreateAlergiaFormData>({
        resolver: yupResolver(createAlergiaFormSchema)
    })


    const handleCreateAlergia: SubmitHandler<CreateAlergiaFormData> = async (values) => {
        //await new Promise(resolve => setTimeout(resolve, 500));
        await useCreateAlergia(values)
        Router.push('/alergias');
    }

    return (


        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.100"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateAlergia)}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Cadastrar Alergia</Heading>
                    </Flex>

                    <Divider my="6" borderColor="gray.400" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                maxW='480px'
                                label="Nome da Alergia"
                                error={formState.errors.nome}
                                {...register("nome")}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">

                            <Button as={NextLink} href={"/alergias"} outline="green">Cancelar</Button>

                            <Button
                                type="submit"
                                colorScheme="green"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}