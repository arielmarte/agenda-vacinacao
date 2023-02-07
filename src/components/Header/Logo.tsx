import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      color="blackAlpha.800"
    >
      Vacina
      <Text as="span" ml="1" color="green.800">Ai!</Text>
    </Text>
  );
}