import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import NextLink from 'next/link'
import Router from 'next/router';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { useUfs } from "@/services/hooks/useUF";
import { useCreateAgenda } from "@/services/hooks/useAgendas";
import { MultiSelectUsuario } from "@/components/Form/MultiSelectUsuario";
import { MultiSelectVacina } from "@/components/Form/MultiSelectVacina";
import { useState } from "react";
import { Textarea } from "@/components/Form/Textarea";

type ErrorMessage = {
    message: string;
};

type CreateAgendaFormData = {
    data: string;
    hora: string;
    idUsuario: number;
    idVacina: number;
    observacoes: string;
};

const createAgendaFormSchema = yup.object().shape({

    data: yup.string().required("Campo obrigatório"),
    hora: yup.string().required("Campo obrigatório"),
    idUsuario: yup.number().transform((value) => (isNaN(value) ? undefined : value)).required("Campo obrigatório"),
    idVacina: yup.number().transform((value) => (isNaN(value) ? undefined : value)).required("Campo obrigatório"),
});

export default function CreateAgenda() {
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { register, handleSubmit, formState } = useForm<CreateAgendaFormData>({
        resolver: yupResolver(createAgendaFormSchema)
    })

    const { data, isLoading, isFetching, error, refetch } = useUfs()

    const handleCreateAgenda: SubmitHandler<CreateAgendaFormData> = async (values) => {
        await useCreateAgenda(values).then(data => Router.push('/agendas')).catch(error => setErrorMessage({ message: error.response.data.detail }));
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
                    onSubmit={handleSubmit(handleCreateAgenda)}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Cadastrar Agenda</Heading>
                    </Flex>

                    <Divider my="6" borderColor="gray.400" />

                    

                    <VStack spacing="8">

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

                        
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            
                            <Input
                                label="Data do Agendamento"
                                type="Date"
                                {...register("data")}
                                error={formState.errors.data}
                            />

                            <Input
                                label="Hora do Agendamento"
                                type="time"
                                {...register("hora")}
                                error={formState.errors.hora}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <MultiSelectUsuario
                            label="Usuário"
                            {...register("idUsuario")}
                            error={formState.errors.idUsuario}/>

                            <MultiSelectVacina
                            label="Vacina"
                            {...register("idVacina")}
                            error={formState.errors.idVacina}/>
                           


                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                        <Textarea
                                label="Observações"

                                {...register("observacoes")}
                                error={formState.errors.observacoes}
                            />
                            </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">

                            <Button as={NextLink} href={"/agendas"} outline="green">Cancelar</Button>

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