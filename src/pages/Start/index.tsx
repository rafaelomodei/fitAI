import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PNG } from '../../assets/png';
import { Container } from './styles';

const Start = () => {
  const navigate = useNavigate();

  return (
    <Container backgroundImage={PNG.Background}>
      <Center flexDirection='column' gap={8}>
        <Center flexDirection='column'>
          <Heading fontSize={96}>FitAi</Heading>
          <Heading size='sm'>Seu personal trainer virtual</Heading>
        </Center>
        <Button size='lg' px={16} onClick={() => navigate('/inicio')}>
          Iniciar
        </Button>
      </Center>
    </Container>
  );
};

export { Start };
