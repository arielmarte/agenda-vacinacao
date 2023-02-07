import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";



import NextLink from 'next/link'


interface ActiveLinkProps extends ChakraLinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ 
  children, 
  shouldMatchExactHref = false, 
  ...rest 
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref && 
    (asPath.startsWith(String(rest.href)) || 
     asPath.startsWith(String(rest.as)))) {
       isActive = true;
     }

  return (
    <>
    </>


    // <ChakraLink as={NextLink} href={String(rest.href)} {...rest}>
    //   {cloneElement(children, { 
    //     color: isActive ? 'pink.400' : 'gray.50'
    //   })}
    // </ChakraLink>
  )
}

