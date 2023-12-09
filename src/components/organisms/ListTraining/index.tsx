import { Flex } from '@chakra-ui/react';
import { ItemTraining } from '../../molecules/ItemTraining';
import { ITraining } from '../../../providers/Training/interface';
import { useTrainingStore } from '../../../providers/Training';

interface IListTraining {
  isOpenMenu: boolean;
  trainings: ITraining[];
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListTraining = ({
  isOpenMenu,
  trainings,
  setIsOpenMenu,
}: IListTraining) => {
  const { setTrainingSelected } = useTrainingStore();

  return (
    <Flex flexDirection='column' gap={2}>
      {trainings.map((training) => (
        <ItemTraining
          key={training.id}
          isOpenMenu={isOpenMenu}
          training={training}
          setIsOpenMenu={setIsOpenMenu}
          setItemSelected={setTrainingSelected}
        />
      ))}
    </Flex>
  );
};

export { ListTraining };
