import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import NextLink from 'next/link'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useState } from "react";

import { Select } from "../../components/Form/Select";
import { Textarea } from "../../components/Form/Textarea";
import { useCreateVacina } from "@/services/hooks/useVacinas";
import Router from 'next/router';


type CreateVacinaFormData = {
    titulo: string;
    descricao: string;
    doses: number;
    periodicidade?: string;
    intervalo?: number;
};

const createVacinaFormSchema = yup.object().shape({
    titulo: yup.string().required('Título é obrigatório').max(60, 'Título deve ter no máximo 60 caracteres'),
    descricao: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres'),
    doses: yup.number().transform((value) => (isNaN(value) ? undefined : value)).required('Número de Doses é obrigatório').min(1, 'Dose deve ser no mínimo 1'),
    intervalo: yup.number().when('doses', {
        is: (doses: number) => doses > 1,
        then: yup.number().typeError('Número de Doses é obrigatório').required('Necessário definir intervalo').min(1, 'Intervalo deve ser no mínimo 1'),
        otherwise: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable()
    }),

    periodicidade: yup.string().when('doses', {
        is: (doses: number) => doses > 1,
        then: yup.string().required('Necessário definir periodicidade').oneOf(['DIAS', 'SEMANAS', 'MESES', 'ANOS'], 'Necessário definir periodicidade'),
        otherwise: yup.string().notRequired(),
    }),

});

export default function CreateVacina() {
    const { register, handleSubmit, formState } = useForm<CreateVacinaFormData>({
        resolver: yupResolver(createVacinaFormSchema)
    })

    const [doseField, setDoseField] = useState('');
    const [intervaloField, setIntervaloField] = useState('');
    const [periodicidadeField, setPeriodicidadeField] = useState('');

    const handleDoseFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDoseField(event.target.value);
        if (event.target.value <= '1') {
          setIntervaloField('');
          setPeriodicidadeField('');
        }
      };


    const handleCreateVacina: SubmitHandler<CreateVacinaFormData> = async (values) => {
        //console.log(values);
        await useCreateVacina(values)
        Router.push('/vacinas');
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
                    onSubmit={handleSubmit(handleCreateVacina)}
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

                            <Textarea
                                label="Descrição"

                                {...register("descricao")}
                                error={formState.errors.descricao}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Doses"
                                type="number"
                                {...register("doses")}
                                error={formState.errors.doses}
                                value={doseField}
                                 onChange={handleDoseFieldChange}
                            />

                            <Input
                                label="Intervalo"
                                type="number"
                                {...register("intervalo")}
                                error={formState.errors.intervalo}
                                value={intervaloField}
                                onChange={(event) => setIntervaloField(event.target.value)}
                                isDisabled={doseField <= '1'}
                            />

                            <Select
                                label="Periodicidade"
                                {...register("periodicidade")}
                                error={formState.errors.periodicidade}
                                value={periodicidadeField}
                                onChange={(event) => setPeriodicidadeField(event.target.value)}
                                isDisabled={doseField <= '1'}>
                                <option value="" defaultChecked></option>
                                <option value="DIAS">dia(s)</option>
                                <option value="SEMANAS">semana(s)</option>
                                <option value="MESES">mes(es)</option>
                                <option value="ANOS">ano(s)</option>
                            </Select>


                        </SimpleGrid>
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