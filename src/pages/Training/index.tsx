import {
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/windowDimesionHook';
import { Canvas, Footer, Header, Video } from './styles';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import useCam from '../../hooks/useCam';
import SideBar from '../../components/organisms/SideBar';

const Training = () => {
  const [startTraining, setStartTraining] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { canvasRef, videoRef, startCam, stopCam } = useCam();
  const btnOpenMenuRef = useRef<HTMLButtonElement>(null);

  const { width, height } = useWindowDimensions();

  // useEffect(() => {
  //   startCam();
  // }, []);

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
        <SideBar isOpen={isOpen} onClose={onClose} />
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
          <IconButton
            variant='solid'
            aria-label='Fechar'
            size='sm'
            boxShadow='lg'
            ref={btnOpenMenuRef as LegacyRef<HTMLButtonElement>}
            onClick={onOpen}
            icon={<HamburgerIcon />}
          />
        </Header>

        <Footer>
          {startTraining ? (
            <IconButton
              isRound={true}
              variant='solid'
              aria-label='Contador'
              size='lg'
              width={16}
              height={16}
              fontSize='xx-large'
              fontWeight='bold'
              boxShadow='xl'
              icon={<Center>{counter}</Center>}
            />
          ) : (
            <Button size='lg' onClick={() => setStartTraining(true)}>
              Iniciar treino
            </Button>
          )}
        </Footer>
      </Flex>
    </>
  );
};

export { Training };
