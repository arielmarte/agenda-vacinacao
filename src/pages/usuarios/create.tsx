import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import NextLink from 'next/link'
import Router from 'next/router';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { Select } from "../../components/Form/Select";
import { MultiSelectUF } from "../../components/Form/MultiSelectUF";

import { useUfs } from "@/services/hooks/useUF";
import { MultiCheckboxAlergia } from "@/components/Form/MultiCheckboxAlergia";
import { useCreateUsuario } from "@/services/hooks/useUsuarios";

type CreateUsuarioFormData = {
    id?: number;
    nome: string;
    dataNascimento: string;
    sexo: string;
    logradouro: string;
    numero: number;
    setor: string;
    cidade: string;
    uf: string;
    idsAlergias: number;
};

const createUsuarioFormSchema = yup.object().shape({
    // titulo: yup.string().required('Título é obrigatório').max(60, 'Título deve ter no máximo 60 caracteres'),
    // descricao: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres'),
    // doses: yup.number().transform((value) => (isNaN(value) ? undefined : value)).required('Número de Doses é obrigatório').min(1, 'Dose deve ser no mínimo 1'),
    // intervalo: yup.number().when('doses', {
    //     is: (doses: number) => doses > 1,
    //     then: yup.number().typeError('Número de Doses é obrigatório').required('Necessário definir intervalo').min(1, 'Intervalo deve ser no mínimo 1'),
    //     otherwise: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable()
    // }),

    // periodicidade: yup.string().when('doses', {
    //     is: (doses: number) => doses > 1,
    //     then: yup.string().required('Necessário definir periodicidade').oneOf(['DIAS', 'SEMANAS', 'MESES', 'ANOS'], 'Necessário definir periodicidade'),
    //     otherwise: yup.string().notRequired(),
    // }),

});

export default function CreateUsuario() {
    const { register, handleSubmit, formState } = useForm<CreateUsuarioFormData>({
        resolver: yupResolver(createUsuarioFormSchema)
    })

    const { data, isLoading, isFetching, error, refetch } = useUfs()

    const handleCreateUsuario: SubmitHandler<CreateUsuarioFormData> = async (values) => {
        await useCreateUsuario(values)
        Router.push('/usuarios');
    }

    const options = [
        { value: 'option1', label: 'Opção 1' },
        { value: 'option2', label: 'Opção 2' },
        { value: 'option3', label: 'Opção 3' },
      ];


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
                    onSubmit={handleSubmit(handleCreateUsuario)}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Cadastrar Paciente</Heading>
                    </Flex>

                    <Divider my="6" borderColor="gray.400" />

                    <VStack spacing="8">

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Nome"
                                type="Text"
                                {...register("nome")}
                                error={formState.errors.nome}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Select
                                label="Sexo"
                                {...register("sexo")}
                                error={formState.errors.sexo}
                            >
                                <option value="" defaultChecked></option>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                            </Select>
                            <Input
                                label="Data de Nascimento"
                                type="Date"
                                {...register("dataNascimento")}
                                error={formState.errors.dataNascimento}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Logradouro"
                                type="Text"
                                {...register("logradouro")}
                                error={formState.errors.logradouro}
                            />
                            <Input
                                label="Numero"
                                type="Number"
                                {...register("numero")}
                                error={formState.errors.numero}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Setor"
                                type="setor"
                                {...register("setor")}
                                error={formState.errors.setor}
                            />
                            <Input
                                label="Cidade"
                                type="cidade"
                                {...register("cidade")}
                                error={formState.errors.cidade}
                            />
                            <MultiSelectUF
                                label="UF"
                                {...register("uf")}
                                error={formState.errors.uf}
                            />

                        </SimpleGrid>
                    </VStack>
                    <VStack spacing="8">
                    
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                        <MultiCheckboxAlergia
                        label="Alergias"
                        {...register("idsAlergias")}   
                        error={formState.errors.idsAlergias}
                        
                        />


                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">

                            <Button as={NextLink} href={"/usuarios"} outline="green">Cancelar</Button>

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