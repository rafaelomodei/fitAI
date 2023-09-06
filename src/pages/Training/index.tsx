import { Center, Flex, Heading, IconButton } from '@chakra-ui/react';
import { LegacyRef, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { scriptCam } from './script';
import useWindowDimensions from '../../hooks/windowDimesionHook';
import { Canvas, Footer, Header, Video } from './styles';
import { CloseIcon } from '@chakra-ui/icons';

const Training = () => {
  const navigate = useNavigate();

  const { width, height } = useWindowDimensions();
  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && canvasRef.current)
      scriptCam({
        videoElement: videoRef.current,
        canvasElement: canvasRef.current,
        width,
        height,
      });
  }, []);

  // useEffect(() => {
  //   console.info('videoRef: ', videoRef.current?.width);
  //   console.info('height: ', videoRef.current?.height);
  // }, [videoRef]);

  return (
    <>
      <Video
        ref={videoRef}
        className='input_video'
        width={width}
        height={height}
      ></Video>
      <Canvas
        ref={canvasRef as LegacyRef<HTMLCanvasElement>}
        className='output_canvas'
        width={width}
        height={height}
      ></Canvas>
      <Flex
        w='100%'
        h='calc(100vh - 20px)'
        p={16}
        position='absolute'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Header>
          <IconButton
            variant='solid'
            aria-label='Fechar'
            size='sm'
            boxShadow='lg'
            onClick={() => navigate('/home')}
            icon={<CloseIcon />}
          />
        </Header>
        <Footer>
          <IconButton
            isRound={true}
            variant='solid'
            aria-label='Contador'
            size='lg'
            width={20}
            height={20}
            fontSize='xx-large'
            fontWeight='bold'
            boxShadow='xl'
            icon={<Center>3</Center>}
          />
        </Footer>
      </Flex>
    </>
  );
};

export { Training };
