import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import { LORD_ICON } from '../../assets/lordIcon';

const Upload = () => {
  const optionsUploadFileIcon = {
    animationData: LORD_ICON.UploadFile,
    loop: false,
    autoplay: true,
  };

  const { View, play, stop } = useLottie(optionsUploadFileIcon);

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Box
        w={16}
        onMouseEnter={() => {
          play();
          setTimeout(() => {
            stop();
          }, 1000);
        }}
      >
        {View}
      </Box>
      <Box h={10}/>
      <Heading size='md' color='primary' textAlign='center'>
        Importe seu vídeo
      </Heading>
      <Text fontSize='sm' textAlign='center' color='gray'>
        <strong>Arraste</strong> ou<strong> clique aqui</strong> para fazer o
        upload
      </Text>
    </Flex>
  );
};

export { Upload };
