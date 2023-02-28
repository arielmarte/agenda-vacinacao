
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Logo } from './Logo';
import { ExitNav } from './ExitNav';

export function Header() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >

      <Logo />
      <Flex align="center" ml="auto">
        <ExitNav />
      </Flex>
    </Flex>

  );
}