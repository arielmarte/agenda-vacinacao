import { Header } from "@/components/Header";
import { Box, Divider, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton, Button, FormControl, FormLabel, theme, Icon } from "@chakra-ui/react";
import { useDados, useDado } from "@/services/hooks/useDispositivos";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../../util/String"
import { convertToDatetimeStr } from "../../util/Date"
import { transformDataToSeries } from "../../util/Grafico"
import { converterTemperatura, converterUmidade } from "../../util/Number"

import { SingleDatepicker, SingleDatepickerProps } from "chakra-dayzed-datepicker";
import Chart from "@/components/Chart";
import { BsThermometerHalf, BsDroplet } from "react-icons/bs";
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

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showAll, setShowAll] = useState(false);
    const { data, isLoading, isFetching, error, refetch } = useDados(localizacao, nomeDispositivo, date ? date : null, tipoDispositivo, auth);
    const { data: dataDado } = useDado(localizacao, nomeDispositivo, tipoDispositivo, auth);
    const { data: dataSessao, isLoading: isLoadingSessao, isFetching: isFetchingSessao, error: errorSessao, refetch: refetchSessao } = useSessao(auth)

    useEffect(() => {
        refetch();
    }, [date, refetch])


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
                case "atuador":
                    router.push({
                      pathname: '/dispositivos/led',
                      query: {localizacao: dataSessaoLocal.auth.funcionalidade.split("|")[1], nomeDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[2], tipoDispositivo: dataSessaoLocal.auth.funcionalidade.split("|")[3], estado: false},
                    });
                    break;
                case "home":
                  router.push('/dispositivos');
                  break;
        
              }
        }); 
      }, [isFetching]);



    const options = {
        
        colors: tipoDispositivo === 2 ? [theme.colors.red[500]] : [theme.colors.blue[500]],
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            foreColor: theme.colors.gray[500],
        },
        grid: {
            show: true,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {

            axisBorder: {
                color: theme.colors.gray[600]
            },
            axisTicks: {
                color: theme.colors.gray[600]
            },
            tickAmount: Math.ceil(data ? data!.length % 50 : 0)
        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
        },
    };

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Box flex="1" borderRadius={8} p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="xl" fontWeight="normal">
                        {tipoDispositivo === 2 ? (
          <Icon as={BsThermometerHalf} fontSize="32px" mr="2"/>
        ) : (
          <Icon as={BsDroplet} fontSize="32px" mr="2"/>
        )}
                            
                            
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
                        <>
                            <Box p={8}>
                                <Heading size="lg" fontWeight="normal"> {tipoDispositivo === 2 ? `Temperatura Atual: ${(converterTemperatura(dataDado!.valor))}` : `Umidade Atual: ${(converterUmidade(dataDado!.valor))}`}
                                </Heading>
                            </Box>
                            <Box p={8}>
                                <FormControl>
                                    <FormLabel>Selecione uma data:</FormLabel>
                                    <SingleDatepicker
                                        name="date-input"
                                        date={date}
                                        onDateChange={setDate}
                                        maxDate={new Date()}
                                        configs={{
                                            dateFormat: 'dd/MM/yyyy',
                                            monthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                                            dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                                        }}
                                    />
                                    <Button mt={4} onClick={() => setDate(undefined)}>Limpar</Button>
                                </FormControl>
                            </Box>

                            <Chart options={options} series={transformDataToSeries(data!.slice(0, 30))} type={"area"} />

                            <Table colorScheme="Green">
                                <Thead>
                                    <Tr>
                                        <Th>Data e Hora</Th>
                                        <Th textAlign='center'>Leitura</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data && data.slice(0, showAll ? data.length : 30)
                                        .map((leitura, index) => {
                                            return (
                                                <Tr key={index}>

                                                    <Td>
                                                        {convertToDatetimeStr(leitura.dataHoraLeitura)}
                                                    </Td>


                                                    <Td textAlign='center'>

                                                        {tipoDispositivo === 2 ? (
                                                            converterTemperatura(leitura.valor)
                                                        ) : (
                                                            converterUmidade(leitura.valor)
                                                        )}
                                                    </Td>

                                                </Tr>
                                            )
                                        })}
                                </Tbody>
                            </Table>
                            {!showAll && (
                                <Box textAlign='center'>
                                    <Button mt="4" onClick={() => setShowAll(true)}>
                                        Ver Todos
                                    </Button>
                                </Box>
                            )}
                        </>)}
                </Box>
            </Flex>
        </Box>
    )
}