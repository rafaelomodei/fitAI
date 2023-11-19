import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBack } from '../../components/molecules/ButtonBack';
import { PlayVideo } from '../../components/molecules/PlayVideo';
import { LoadingAnalytics } from '../../components/organisms/LoadingAnalytics';
import { useTrainingStore } from '../../providers/Training';
import { Container, ContainerInfo } from './style';

const AnalyzeTraining = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { trainingSelected } = useTrainingStore();

  const { state } = useLocation();
  const videoFile: File | null = state.file as File;

  const loadingAnalytics = (
    <Flex>
      <LoadingAnalytics />
    </Flex>
  );

  return isLoading ? (
    loadingAnalytics
  ) : (
    <Flex w='100%' p={8} flexDirection='column'>
      <ButtonBack onClick={() => navigate(-1)} mb={4} />
      <Container mt={4}>
        {videoFile && <PlayVideo videoFile={videoFile} />}
        <ContainerInfo>
          <Heading size='lg'>Analise de treino</Heading>
          <Text>{`Assista o seu video de trainamento de ${trainingSelected?.name}`}</Text>
          <Heading size='md' mb={2} mt={8}>
            Informações gerais
          </Heading>
          <Flex>
            <Text fontWeight='600'>Treino: </Text>
            <Text ml={2}>{`${trainingSelected?.name}`}</Text>
          </Flex>
          <Heading mt={8} mb={2} size='md'>
            Feedbacks
          </Heading>
          <Flex>
            <Text fontWeight='600'>Postura corporal: </Text>
            <Text ml={2}> Ótima</Text>
          </Flex>
          <Flex>
            <Text fontWeight='600'>Repetições: </Text>
            <Text ml={2}> 20x</Text>
          </Flex>
        </ContainerInfo>
      </Container>
    </Flex>
  );
};

export { AnalyzeTraining };
