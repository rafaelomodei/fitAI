import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useDevices from '../../../hooks/useDevicesHook';
import { useTrainingStore } from '../../../providers/Training';

interface IContentTraining {
  setAnalyzeTraining: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentTraining = (props: IContentTraining) => {
  const { setAnalyzeTraining } = props;
  const { trainingSelected } = useTrainingStore();
  const { isMobile, isTablet, isDesktop } = useDevices();
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection={isDesktop ? 'row' : 'column-reverse'}
      width='100%'
      py={isMobile ? 16 : 0}
    >
      <Flex w='100%' flexDirection='column' px={isMobile ? 0 : 16}>
        <Heading size='md' mb={4}>
          {`${trainingSelected?.name} -  Informações`}
        </Heading>
        <Text textAlign='justify'>{trainingSelected?.description}</Text>
      </Flex>
      <Flex
        w={isDesktop ? 'max-content' : ''}
        flexDirection='column'
        alignItems='center'
        px={isTablet ? 16 : 0}
      >
        <Flex
          w='300px'
          h='175px'
          transform='scaleX(-1) scale(1.2)'
          backgroundPosition='center'
          backgroundSize='contain'
          backgroundRepeat='no-repeat'
          backgroundImage={trainingSelected?.gif}
        />
        <Flex flexDirection='column' w='100%' gap={4}>
          <Button
            w='100%'
            bg='primary'
            color='white'
            size='lg'
            mt={16}
            _hover={{ backgroundColor: 'primary90' }}
            onClick={() => navigate('/treino')}
          >
            Iniciar treino
          </Button>
          <Button
            w='100%'
            variant='outline'
            color='primary90'
            borderColor='primary90'
            size='lg'
            mb={9}
            onClick={() => setAnalyzeTraining(true)}
          >
            Analizar treino
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { ContentTraining };
