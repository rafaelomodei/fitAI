import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBack } from '../../components/molecules/ButtonBack';
import { PlayVideo } from '../../components/molecules/PlayVideo';
import { LoadingAnalytics } from '../../components/organisms/LoadingAnalytics';
import useMediaPipe from '../../hooks/useMediaPipe';
import { useTrainingStore } from '../../providers/Training';
import { Container, ContainerInfo } from './style';

const AnalyzeTraining = () => {
  const [start, setStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { hasDetected, isLoadingMediaPipe, runMediaPipe } = useMediaPipe({
    videoRef,
    canvasRef,
  });

  const navigate = useNavigate();
  const { trainingSelected } = useTrainingStore();

  const { state } = useLocation();
  const videoFile: File | null = state.file as File;

  const loadingAnalytics = (
    <Flex>
      <LoadingAnalytics />
    </Flex>
  );

  setTimeout(() => setStart(true), 300);

  useEffect(() => {
    if (canvasRef.current)
      canvasCtxRef.current = canvasRef.current.getContext('2d');

    if (
      videoRef.current &&
      canvasRef.current &&
      canvasCtxRef.current &&
      start
    ) {
      runMediaPipe();
    }
  }, [start]);

  return isLoading ? (
    loadingAnalytics
  ) : (
    <Flex w='100%' p={8} flexDirection='column'>
      <ButtonBack onClick={() => navigate(-1)} mb={4} />
      <Container mt={4}>
        {videoFile && (
          <PlayVideo
            videoRef={videoRef}
            canvasRef={canvasRef}
            videoFile={videoFile}
          />
        )}
        <ContainerInfo>
          <Heading size='lg'>Analise de treino</Heading>

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
          {/* <Flex>
            <Text fontWeight='600'>Postura corporal: </Text>
            <Text ml={2}> Ótima</Text>
          </Flex> */}
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
