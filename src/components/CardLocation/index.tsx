import { Box, Flex, Heading } from "@chakra-ui/react";
import CardLed from "./CardLed";
import CardSensor from "./CardSensor";
import {capitalizeFirstLetter} from "../../util/String"

type Dispositivo = {
  nomeDispositivo: string;
  tipoDispositivo: number;
  estado?: boolean | undefined;
  valor?: string | undefined;
  dataHoraLeitura?: string;
};

export default function CardLocation({ localizacao, dispositivos }: { localizacao: string; dispositivos: Dispositivo[] }) {
  function getCardComponent(tipoDispositivo: number, nomeDispositivo: string, valor: string | undefined, estado: boolean | undefined ) {
    switch (tipoDispositivo) {
      case 1:
        return <CardLed nomeDispositivo={nomeDispositivo} localizacao={localizacao} tipoDispositivo={tipoDispositivo} status={estado} />;
      case 2:
      case 3:
        return <CardSensor sensor={tipoDispositivo === 2 ? "temperatura" : "umidade"} nomeDispositivo={nomeDispositivo} valor={valor} localizacao={localizacao} tipoDispositivo={tipoDispositivo}/>;
      default:
        return null;
    }
  }

  return (
    <Box>
      <Heading size="lg" fontWeight="bold" textAlign="center">
        {capitalizeFirstLetter(localizacao)}
      </Heading>
      <Flex flexWrap="wrap" p="8" justifyContent="center">
        {dispositivos.map(({ nomeDispositivo, tipoDispositivo, estado, valor }) => (
          <Box key={`${localizacao}|${nomeDispositivo}`} m="4">
            {getCardComponent(tipoDispositivo, nomeDispositivo, valor, estado)}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
