import { createContext, useContext, useState } from 'react';
import useDevices from '../../hooks/useDevicesHook';
import { TRAININGS } from './constants';
import { ITraining, ITrainingContext, IUseTrainingContext } from './interface';

export const TrainingContext = createContext({} as IUseTrainingContext);
export const useTrainingStore = () => useContext(TrainingContext);

export const TrainingProvider = ({ children }: ITrainingContext) => {
  const [isStartedTraining, setIsStartedTraining] = useState<boolean>(false);

  const { isMobile } = useDevices();

  const handleInitialState = (): ITraining | undefined => {
    return isMobile ? undefined : TRAININGS[0];
  };

  const [trainingSelected, setTrainingSelected] = useState<
    ITraining | undefined
  >(handleInitialState());

  return (
    <TrainingContext.Provider
      value={{
        trainingSelected,
        isStartedTraining,
        setIsStartedTraining,
        setTrainingSelected,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
