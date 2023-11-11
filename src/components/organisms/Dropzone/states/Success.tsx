import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import { LORD_ICON } from '../../../../assets/lordIcon';
import { theme } from '../../../../theme';

const Success = () => {
  const optionsUploadFileIcon = {
    animationData: LORD_ICON.CheckSuccess,
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

      <Heading size='md' color={`${theme.colors.success}`} textAlign='center'>
        Upload efetuado com sucesso!
      </Heading>
      <Text fontSize='sm' textAlign='center' color='gray'>
        Clique em <strong>Iniciar analise do treino</strong>.
      </Text>
    </Flex>
  );
};

export { Success };
