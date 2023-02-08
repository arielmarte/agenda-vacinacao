import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import NextLink from 'next/link'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
    titulo: string;
    descricao: string;
    doses: number;
    periodicidade: number;
    intervalo: number;
};

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
        resolver: yupResolver(createUserFormSchema)
    })


    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(values);
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
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Cadastrar Vacina</Heading>
                    </Flex>

                    <Divider my="6" borderColor="gray.400" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Título"
                                type="Text"
                                {...register("titulo")}
                                error={formState.errors.titulo}
                            />

                            <Input
                                label="Descrição"
                                type="Textarea"
                                {...register("descricao")}
                                error={formState.errors.descricao}
                            />

                            <Input
                                label="doses"
                                type="number"
                                {...register("doses")}
                                error={formState.errors.doses}
                            />

                            <Input
                                label="Periodicidade"

                                type="number"
                                {...register("periodicidade")}
                                error={formState.errors.periodicidade}
                            />

                            <Input
                                label="Intervalo"
                                type="number"
                                {...register("intervalo")}
                                error={formState.errors.intervalo}
                            />




                        </SimpleGrid>

                        {/* <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input

                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register("password")}
                            />
                            <Input

                                type="password"
                                label="Confirmação da senha"
                                error={formState.errors.password_confirmation}
                                {...register("password_confirmation")}
                            />
                        </SimpleGrid> */}
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">

                            <Button as={NextLink} href={"/vacinas"} outline="green">Cancelar</Button>

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