import { Flex, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BiHomeSmile } from "react-icons/bi"


export function Logo() {
  const router = useRouter();
  return (
    <Flex>
    <Icon as={BiHomeSmile} fontSize="36" />
    <Text
      ml="4"
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      color="blackAlpha.800"
      cursor="pointer"
          onClick={()=>router.push('/dispositivos')}
    >
       My
      <Text as="span" ml="1" color="green.800">Home</Text>
    </Text>
    </Flex>
  );
}