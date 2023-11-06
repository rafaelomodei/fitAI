import { Center, Flex, Heading, Text } from '@chakra-ui/react';

export const AlertNotHasDetected = () => {
  return (
    <Flex h='100vh' w='100%' position='absolute' bg='#ffffff97'>
      <Center w='100%' flexDirection='column'>
        <Heading textAlign='center'>
          Não foi possivel detectar nenhuma posição
        </Heading>
        <Text>
          Por favor, ajuste a iluminação ou sua posição para uma detecção mais
          precisa.
        </Text>
      </Center>
    </Flex>
  );
};
