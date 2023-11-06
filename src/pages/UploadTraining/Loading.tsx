import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import { LORD_ICON } from '../../assets/lordIcon';

const Loading = () => {
  const optionsUploadFileIcon = {
    animationData: LORD_ICON.UploadFile,
    loop: true,
  };

  const { View } = useLottie(optionsUploadFileIcon);

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Box w={16}>{View}</Box>
      <Heading size='md' color='primary' textAlign='center' my={2}>
        73%
      </Heading>
      <Heading size='md' color='primary' textAlign='center'>
        O arquivo de vídeo está sendo carregado...
      </Heading>
      <Text fontSize='sm' textAlign='center' color='gray'>
        <strong> Por favor aguarde! </strong>
      </Text>
    </Flex>
  );
};

export { Loading };
