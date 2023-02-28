import { VStack, Icon, Box, Text, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";
import {capitalizeFirstLetter} from "../../util/String"

interface CardLedProps extends BoxProps {
  status: boolean | undefined;
  localizacao: string;
  tipoDispositivo: number;
  nomeDispositivo: string;
}

export default function CardLed(props: CardLedProps) {
  const { status, nomeDispositivo, localizacao, tipoDispositivo, ...boxProps } = props;

  const router = useRouter();
  function handleClick(){
    router.push({
      pathname: '/dispositivos/led',
      query: {localizacao: localizacao, nomeDispositivo: nomeDispositivo, tipoDispositivo: tipoDispositivo, estado: status},
    });
  }
  

  return (
    <Box cursor="pointer" onClick={handleClick} p={["6", "8"]} m={["2", "3"]} bg="gray.100" borderRadius={8} width="220px" minHeight="240px" {...boxProps}>
      <VStack alignItems="center">
        {status ? (
          <Icon as={BsLightbulb} fontSize="56px" mb="4"/>
        ) : (
          <Icon as={BsLightbulbOff} fontSize="56px" mb="4"/>
        )}
        <Text fontSize="lg" mb="1" align="center" fontWeight="bold">
          {capitalizeFirstLetter(nomeDispositivo)}
        </Text>
        <Text fontSize="md" mb="4" align="center">
          {status ? "Ligado" : "Desligado"}
        </Text>
      </VStack>
    </Box>
  );
}
