import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel, Checkbox, CheckboxProps, Stack } from "@chakra-ui/react";

import { useUfs } from "@/services/hooks/useUF";
import { useAlergias } from "@/services/hooks/useAlergias";
import { number } from "yup";

interface SelectProps extends CheckboxProps {
  name: string;
  label?: string;
  error?: FieldError;
} 


const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> 
  = ({ name, label, error = null, ...rest }, ref) => {
    const { data, isLoading, isFetching, refetch } = useAlergias()
    if (!data) return null;

    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <Stack spacing={5} direction='column'>
        {data.alergias && data.alergias.map(alergia => (
          <Checkbox
            name={name}
            id={`${name}[${alergia.id}]`}
            value={alergia.id}
            key={alergia.id}
            {...rest}
            ref={ref}
            type="checkbox"
            colorScheme="green"
          >
            {alergia.nome}
          </Checkbox>
        ))}
        </Stack>
        { !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        ) }
      </FormControl>
    );
  }

  export const MultiCheckboxAlergia = forwardRef(SelectBase);
