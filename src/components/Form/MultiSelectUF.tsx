import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react";
import { useUfs } from "@/services/hooks/useUF";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
} 

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> 
  = ({ name, label, error = null, ...rest }, ref) => {
    const { data, isLoading, isFetching, refetch } = useUfs()

    if (!data) return null;

    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

        <ChakraSelect
          name={name}
          id={name}
          focusBorderColor="green.300"
          bgColor="white"
          variant="outline"
          borderColor="gray.300"
          _hover={{
            bgColor: 'white'
          }}
          size="lg"
          ref={ref}
          {...rest}
        >
          <option value="" defaultChecked></option>
            {data.ufs && data.ufs.map(uf => (
                                        <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                                    ))}
        </ChakraSelect>

        { !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        ) }
      </FormControl>
    );
  }

  export const MultiSelectUF = forwardRef(SelectBase);
