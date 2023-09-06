import { Box, Flex, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { formatDiagnosticsWithColorAndContext } from 'typescript';
import { ICON_SVG } from '../../../assets/svg';
import useDevices from '../../../hooks/useDevicesHook';
import useMenu from '../../../hooks/useMenu';
import { useTrainingStore } from '../../../providers/Training';
import { ITraining } from '../../../providers/Training/interface';
import { Button } from './styles';

interface IItemTraining {
  isOpenMenu: boolean;
  training?: ITraining;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setItemSelected: React.Dispatch<React.SetStateAction<ITraining | undefined>>;
}

const ItemTraining = ({
  isOpenMenu,
  training,
  setIsOpenMenu,
  setItemSelected,
}: IItemTraining) => {
  const { trainingSelected } = useTrainingStore();
  const { isDesktop } = useDevices();

  return (
    <Button
      h={16}
      size='lg'
      isOpenMenu={isOpenMenu}
      justifyContent='space-between'
      isActive={training?.id === trainingSelected?.id}
      onClick={(event) => {
        console.info('event: ', event);
        setIsOpenMenu(false);
        setItemSelected(training ?? undefined);
      }}
    >
      <Image src={training?.icon} alt='Bicep' mr={4} />

      {(isDesktop || isOpenMenu) && (
        <Flex w='100%' justifyContent='space-between' alignItems='center'>
          {training?.name}
          <Box w='24px' h='24px'>
            <Image src={ICON_SVG.Arrow} alt='Bicep' ml={4} />
          </Box>
        </Flex>
      )}
    </Button>
  );
};

export { ItemTraining };
