import { ElementType } from "react";
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import {RxExit} from "react-icons/rx"
import { useAuth } from "@/contexts/AuthContext";

export function ExitNav(){

  const { setAuth } = useAuth();

  function handleExit(){
      setAuth(null);
  };
  
    return(<>

    <ChakraLink display="flex" onClick={handleExit}>
        <Icon as={RxExit} fontSize="20" />
        <Text ml="4" fontWeight="medium">Logout</Text>
      </ChakraLink>
    </>);
}