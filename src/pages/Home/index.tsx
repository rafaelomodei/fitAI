import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ListTraining } from '../../components/organisms/ListTraining';
import { TRAININGS } from '../../providers/Training/constants';
import { ContentTraining } from '../../components/organisms/ContentTraining';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import useDevices from '../../hooks/useDevicesHook';
import { useEffect, useState } from 'react';
import useMenu from '../../hooks/useMenu';
import { useTrainingStore } from '../../providers/Training';

const Home = () => {
  const { isOpenMenu, setIsOpenMenu } = useMenu();
  const { trainingSelected } = useTrainingStore();
  const { isMobile } = useDevices();

  useEffect(() => {
    console.info('Home:isOpenMenu: ', isOpenMenu);
  }, [isOpenMenu]);

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
        {!isOpenMenu && <ContentTraining />}
      </Flex>
    </Flex>
  );
};

export { Home };
