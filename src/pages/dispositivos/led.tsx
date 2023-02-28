import { Header } from "@/components/Header";
import { Box, Divider, Flex, Heading, Spinner, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton, Icon, Switch, VStack, Stack } from "@chakra-ui/react";
import { useDado, useLed } from "@/services/hooks/useDispositivos";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../../util/String"
import { BsLightbulb, BsLightbulbFill, BsLightbulbOff } from "react-icons/bs";
import { useSessao } from "@/services/hooks/useUsuarios";

type ErrorMessage = {
    message: string;
};

export default function Dispositivos() {


    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: "" });
    const router = useRouter();
    const { auth } = useAuthProvider();
    const localizacao = String(router.query.localizacao);
    const nomeDispositivo = String(router.query.nomeDispositivo);
    const tipoDispositivo = Number(router.query.tipoDispositivo);
    const estado = router.query.estado === "true";

    const { data: dataDado, isLoading, isFetching, error, refetch } = useDado(localizacao, nomeDispositivo, tipoDispositivo, auth);
    const { data: dataSessao, isLoading: isLoadingSessao, isFetching: isFetchingSessao, error: errorSessao, refetch: refetchSessao } = useSessao(auth)

    console.log(estado)
    const [isChecked, setIsChecked] = useState(estado);

    useEffect(() => {
        setIsChecked(Boolean(dataDado?.estado === isChecked ? isChecked : dataDado?.estado));
    }, [dataDado]);


    useEffect(() => {
        if(!dataDado){
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
                case "home":
                  router.push('/dispositivos');
                  break;
        
              }
        }); 
      }, [isFetching]);


    async function handleToggle(checked: boolean) {
        console.log(checked ? 'true' : 'false')
        setIsChecked(checked)
        const data = await useLed({ localizacao: localizacao, nomeDispositivo: nomeDispositivo, tipoDispositivo: tipoDispositivo, estado: checked }, auth)
        refetch();
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Box flex="1" borderRadius={8} p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="xl" fontWeight="normal">
                            <Icon as={BsLightbulbFill} fontSize="32px" mr="2" />



                            <strong>{capitalizeFirstLetter(nomeDispositivo)}</strong> - {capitalizeFirstLetter(localizacao)}</Heading>
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
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados.</Text>
                        </Flex>
                    ) : (

                        <Box p={["6", "8"]} m={["2", "3"]} bg="gray.100" borderRadius={8} width="220px" minHeight="240px">
                            <VStack alignItems="center" spacing={3}>
                            
                            {dataDado?.estado ? (
                                    <Icon as={BsLightbulb} fontSize="56px" mb="4" />
                                ) : (
                                    <Icon as={BsLightbulbOff} fontSize="56px" mb="4" />
                                )}
                                
                                
                                    

                                <Switch size='lg' isChecked={isChecked} colorScheme='green' onChange={(e) => handleToggle(e.target.checked)} />
                                <Heading size="md" fontWeight="normal">{dataDado?.estado === true ? 'Ligado' : 'Desligado'}
                                </Heading>
                            </VStack>

                        </Box>

                    )}
                </Box>
            </Flex>
        </Box>
    )
}