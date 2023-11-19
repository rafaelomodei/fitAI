import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ButtonProps } from '@chakra-ui/react';

interface IButtonBack extends ButtonProps {
  onClick: () => void;
}

export const ButtonBack = (props: IButtonBack) => {
  const { onClick } = props;
  return (
    <Button
      {...props}
      variant='link'
      w='min-content'
      color='primary'
      onClick={onClick}
    >
      <ArrowBackIcon mr={2} /> Voltar
    </Button>
  );
};
