import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useDevices from '../../../hooks/useDevicesHook';
import { useTrainingStore } from '../../../providers/Training';

const ContentTraining = () => {
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
        <Button
          w='100%'
          bg='primary'
          color='white'
          size='lg'
          mt={16}
          mb={9}
          _hover={{ backgroundColor: 'primary90' }}
          onClick={() => navigate('/training')}
        >
          Iniciar
        </Button>
      </Flex>
    </Flex>
  );
};

export { ContentTraining };
