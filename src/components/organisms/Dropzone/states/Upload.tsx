import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import { LORD_ICON } from '../../../../assets/lordIcon';

interface IUpload {
  isDragActive?: boolean;
}

const Upload = ({ isDragActive }: IUpload) => {
  const optionsUploadFileIcon = {
    animationData: LORD_ICON.UploadFile,
    loop: Boolean(isDragActive),
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

      {isDragActive ? (
        <Heading size='md' color='primary' textAlign='center'>
          Solte o aquivo aqui para fazer o upload
        </Heading>
      ) : (
        <Heading size='md' textAlign='center'>
          Importe seu vídeo
        </Heading>
      )}
      {!isDragActive && (
        <Text fontSize='sm' textAlign='center' color='gray'>
          <strong>Arraste</strong> ou<strong> clique aqui</strong> para fazer o
          upload
        </Text>
      )}
    </Flex>
  );
};

export { Upload };
