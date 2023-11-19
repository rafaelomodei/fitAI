import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';

export const Container = styled(Flex)`
  flex-direction: row;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContainerInfo = styled(Flex)`
  flex-direction: column;
  margin-left: 32px;

  @media screen and (max-width: 1024px) {
    margin-top: 32px;
    margin-left: 0px;
  }
`;
