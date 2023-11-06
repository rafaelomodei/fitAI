import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import { LORD_ICON } from '../../assets/lordIcon';

const Error = () => {
  const optionsUploadFileIcon = {
    animationData: LORD_ICON.Error,
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
      <Box h={10} />
      <Heading size='md' color='error70' textAlign='center'>
        Error ao efetuar o upload!
      </Heading>
      <Text fontSize='sm' textAlign='center' color='gray'>
        Clique em <strong>Tentar novamente</strong>.
      </Text>
    </Flex>
  );
};

export { Error };
