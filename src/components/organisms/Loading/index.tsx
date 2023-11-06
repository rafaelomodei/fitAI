import { Center, Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex h='100vh' w='100%' position='absolute' bg='#ffffff97'>
      <Center w='100%' flexDirection='column'>
        <Spinner size='xl'/>
      </Center>
    </Flex>
  );
};
