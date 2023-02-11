import { Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      color="blackAlpha.800"
      as={NextLink}
          href="/"
    >
      Vacina
      <Text as="span" ml="1" color="green.800">Ai!</Text>
    </Text>
  );
}