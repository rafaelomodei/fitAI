import { Center, Flex, Heading, IconButton } from '@chakra-ui/react';
import { LegacyRef, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/windowDimesionHook';
import { Canvas, Footer, Header, Video } from './styles';
import { CloseIcon } from '@chakra-ui/icons';
import useCam from '../../hooks/useCam';

const Training = () => {
  const navigate = useNavigate();
  const { canvasRef, videoRef, startCam, stopCam } = useCam();

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    startCam();
  }, []);

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
            onClick={() => {
              stopCam();
              navigate('/home');
            }}
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
