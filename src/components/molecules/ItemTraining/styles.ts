import { Button as ButtonCK } from '@chakra-ui/react';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { BREAKPOINT_MOBILE_CSS } from '../../../utils/constants';

interface IButton {
  isActive?: boolean;
  isOpenMenu?: boolean;
}

export const Button = styled(ButtonCK)<IButton>`
  && {
    width: 240px;
    background-color: ${({ isActive }) =>
      isActive ? `${theme.colors.primary} !important` : 'white'};

    color: ${({ isActive }) => (isActive ? 'white' : '')};

    &:hover {
      background-color: ${({ isActive }) =>
        isActive ? `${theme.colors.primary90} !important` : ''};
    }

    img {
      filter: ${({ isActive }) =>
        isActive
          ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);'
          : ''};
    }

    @media screen and (max-width: 1024px) and (min-width: ${BREAKPOINT_MOBILE_CSS}) {
      width: ${({ isOpenMenu }) => (isOpenMenu ? '240px' : '76px')};
    }

    @media screen and (max-width: ${BREAKPOINT_MOBILE_CSS}) {
      width: ${({ isOpenMenu }) => (isOpenMenu ? '100%' : '76px')};
    }
  }
`;
