import { Switch as SwitchCK } from '@chakra-ui/react';
import { styled } from 'styled-components';

export const Switch = styled(SwitchCK)`
  && {
    [data-checked]:first-child {
      background-color: pink !important;
    }
  }
`;
