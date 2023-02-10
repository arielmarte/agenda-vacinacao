import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel, Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps, CheckboxGroup, Stack } from "@chakra-ui/react";

interface CheckboxOption {
  id: string;
  name: string;
}

interface CheckboxProps {
  name: string;
  options: CheckboxOption[];
  error?: FieldError;
  label?: string;
}

const CheckboxBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps>
  = ({ name, label, options, error = null, ...rest }, ref) => {
    return (

      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

        <CheckboxGroup
        colorScheme='green'
        
        
        >
          <Stack direction='row'>

          {options.map(({ id, name }, index) => (
            <ChakraCheckbox key={id} value={id}
            name={name}
            id={name}
            size="lg"
            ref={ref}
            {...rest}
            >{name}</ChakraCheckbox>
          ))}
          
          </Stack>
        </CheckboxGroup>

        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>

    );
  }

export const Checkbox = forwardRef(CheckboxBase);


        // <FormControl isInvalid={!!error}>
      //   { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

      // <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
      //                           <Stack spacing={[1, 5]} direction={['column', 'row']}>
      //                               <Checkbox value='naruto'>Naruto</Checkbox>
      //                               <Checkbox value='sasuke'>Sasuke</Checkbox>
      //                               </Stack>
      //                               </CheckboxGroup>





      // {/* <FormControl isInvalid={!!error}>
      //   {options.map(({ id, label, isChecked }, index) => (
      //     <FormControl key={index} isInvalid={!!error}>
      //       <FormLabel htmlFor={`${name}-${id}`}>{label}</FormLabel>

      //       <ChakraCheckbox
      //         id={`${name}-${id}`}
      //         name={`${name}-${id}`}
      //         isChecked={isChecked}
      //         ref={ref}
      //         {...rest}
      //       />
      //     </FormControl>
      //   ))} */}

      //   { !!error && (
      //     <FormErrorMessage>
      //       {error.message}
      //     </FormErrorMessage>
      //   ) }
      // </FormControl>