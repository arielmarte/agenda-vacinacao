

import { Header } from "@/components/Header";
import { Box, Divider, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useDispositivos } from "@/services/hooks/useDispositivos";
import { useSessao } from "@/services/hooks/useUsuarios";
import { useEffect, useState } from "react";
import CardLocation from "@/components/CardLocation";
import {useAuth, useAuthProvider} from "@/contexts/AuthContext";
import { useRouter } from "next/router";

type ErrorMessage = {
    message: string;
};

export default function Dispositivos() {

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });

    const { auth} = useAuthProvider();

    const { data, isLoading, isFetching, error, refetch } = useDispositivos(auth)
    const { data: dataSessao, isLoading: isLoadingSessao, isFetching: isFetchingSessao, error: errorSessao, refetch: refetchSessao } = useSessao(auth)


    const [funcionalidade, setFuncionalidade] = useState<string>("home");

    const router = useRouter();

    useEffect(() => {
        refetch();
      }, [router.asPath,refetch ]);

    useEffect(() => {
        if(!data){
            return;
        }
        
        refetchSessao().then(({data: dataSessaoLocal}) => {
       
            if(!dataSessaoLocal){
                return;
            }
    
            console.log('dataSessao: '+ dataSessaoLocal.auth.funcionalidade)
            console.log('auth: '+ auth?.funcionalidade)
            switch(dataSessaoLocal.auth.funcionalidade.split("|")[0]) {
                case "sensor":
                  router.push({
                    pathname: '/dispositivos/sensor',
                    query: {localizacao: dataSessaoLocal.auth.funcionalidade.split("|")[1], nomeDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[2], tipoDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[3]},
                  });
                  break;
                case "atuador":
                  router.push({
                    pathname: '/dispositivos/led',
                    query: {localizacao: dataSessaoLocal.auth.funcionalidade.split("|")[1], nomeDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[2], tipoDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[3], estado: false},
                  });
                  break;
        
              }
        }); 
      }, [isFetching]);

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Box flex="1" borderRadius={8}  p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="xl" fontWeight="normal">Dispositivos da Casa</Heading>
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
                    {isLoading || isFetching ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados.</Text>
                        </Flex>
                    ) : (
                        data?.map((localizacao) => (
                         
                          <CardLocation
                            key={localizacao.localizacao}
                            localizacao={localizacao.localizacao}
                            dispositivos={localizacao.dispositivos}
                          />
                          
                        ))
                     )} 
                </Box>
            </Flex>
        </Box>
    )
}