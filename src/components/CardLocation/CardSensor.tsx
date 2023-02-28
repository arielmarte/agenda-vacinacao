import { VStack, Icon, Box, Text, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsThermometerHalf, BsDroplet } from "react-icons/bs";
import {capitalizeFirstLetter} from "../../util/String"
import {converterTemperatura, converterUmidade} from "../../util/Number"

interface CardSensorProps extends BoxProps {
  sensor: "umidade" | "temperatura";
  nomeDispositivo: string;
  localizacao: string;
  tipoDispositivo: number;
  valor: string | undefined;
}

export default function CardSensor(props: CardSensorProps) {
  const { sensor, nomeDispositivo, valor, localizacao, tipoDispositivo, ...boxProps } = props;

  const router = useRouter();
  function handleClick(){
    router.push({
      pathname: '/dispositivos/sensor',
      query: {localizacao: localizacao, nomeDispositivo: nomeDispositivo, tipoDispositivo: tipoDispositivo},
    });
  }

  return (
    <Box cursor="pointer" onClick={handleClick} p={["6", "8"]} m={["2", "3"]} bg="gray.100" borderRadius={8} width="220px" minHeight="240px" {...boxProps}>
      <VStack alignItems="center">
        {sensor === "temperatura" ? (
          <Icon as={BsThermometerHalf} fontSize="56px" mb="4"/>
        ) : (
          <Icon as={BsDroplet} fontSize="56px" mb="4"/>
        )}
        <Text fontSize="lg" mb="1" align="center" fontWeight="bold">
          {capitalizeFirstLetter(nomeDispositivo)}
        </Text>
        <Text fontSize="md" mb="4" align="center">
        {sensor === "temperatura" ? (
            converterTemperatura(valor)
        ) : (
          converterUmidade(valor)
        )}
        
        </Text>
      </VStack>
    </Box>
  );
}
