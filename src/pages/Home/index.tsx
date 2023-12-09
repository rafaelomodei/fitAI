import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { ListTraining } from '../../components/organisms/ListTraining';
import { TRAININGS } from '../../providers/Training/constants';
import { ContentTraining } from '../../components/organisms/ContentTraining';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import useDevices from '../../hooks/useDevicesHook';
import { useState } from 'react';
import useMenu from '../../hooks/useMenu';
import { useTrainingStore } from '../../providers/Training';
import { UploadTraining } from '../UploadTraining';

const Home = () => {
  const [analyzeTraining, setAnalyzeTraining] = useState<boolean>(false);

  const { isOpenMenu, setIsOpenMenu } = useMenu();
  const { trainingSelected } = useTrainingStore();
  const { isMobile } = useDevices();

  return (
    <Flex w='100%' h='100vh' p={8} flexDirection='column'>
      <Flex justifyContent='space-between'>
        <Box mb={8}>
          <Heading>FitAi</Heading>
          {isOpenMenu && <Heading size='sm'>Selecione o treino </Heading>}
        </Box>
        {isMobile && trainingSelected && (
          <Button onClick={() => setIsOpenMenu(!isOpenMenu)}>
            {isOpenMenu ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        )}
      </Flex>

      <Flex>
        {(!isMobile || isOpenMenu) && (
          <Flex w={!isOpenMenu ? '' : '100%'} flexDirection='column'>
            <ListTraining
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
              trainings={TRAININGS}
            />
          </Flex>
        )}
        {analyzeTraining ? (
          <UploadTraining setAnalyzeTraining={setAnalyzeTraining} />
        ) : (
          !isOpenMenu && (
            <ContentTraining setAnalyzeTraining={setAnalyzeTraining} />
          )
        )}
      </Flex>
    </Flex>
  );
};

export { Home };
