import { Flex, Button, Stack, SimpleGrid, Heading, Alert, AlertIcon, Box, AlertDescription, AlertTitle, CloseButton } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'
import { Logo } from '@/components/Header/Logo';
import { useLogin } from "@/services/hooks/useUsuarios";
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import Router from 'next/router';

type SignInFormData = {
  usuario: string;
  senha: string;
};

type ErrorMessage = {
  message: string;
};

const signInFormSchema = yup.object().shape({
  usuario: yup.string().required('Usuário obrigatório'),
  senha: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

  const { setAuth } = useAuth();


  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      const data = await useLogin(values);
      setAuth(data.auth);
      switch(data.auth.funcionalidade.split("|")[0]) {
        case "home":
          Router.push('/dispositivos');
          break;
        case "sensor":
          Router.push({
            pathname: '/dispositivos/sensor',
            query: {localizacao: data.auth.funcionalidade.split("|")[1], nomeDispositivo: data.auth.funcionalidade.split("|")[2], tipoDispositivo: data.auth.funcionalidade.split("|")[3]},
          });
          break;
        case "atuador":
          Router.push({
            pathname: '/dispositivos/led',
            query: {localizacao: data.auth.funcionalidade.split("|")[1], nomeDispositivo: data.auth.funcionalidade.split("|")[2], tipoDispositivo: data.auth.funcionalidade.split("|")[3], estado: false},
          });
          break;

      }
      
    } catch (error: any) {
      console.log('error');
      setErrorMessage({ message: error.response?.data.detail });
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      
    >
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" >
        <Stack spacing="4" align="center" h="100%" justifyContent="center">
          <Logo/>
        </Stack>
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.100"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          
          <Stack spacing="4">
            <Heading size='lg' pb="1rem">Login</Heading>
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
            <Input 
              type="text" 
              label="Usuario" 
              error={formState.errors.usuario}
              {...register('usuario')}
            />
            <Input 
              type="password" 
              label="Senha" 
              error={formState.errors.senha}
              {...register('senha')}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="green"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </SimpleGrid>
    </Flex>
  )
}
