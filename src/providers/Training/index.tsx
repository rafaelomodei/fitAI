import { createContext, useContext, useState } from 'react';
import useDevices from '../../hooks/useDevicesHook';
import { TRAININGS } from './constants';
import { ITraining, ITrainingContext, IUseTrainingContext } from './interface';

export const TrainingContext = createContext({} as IUseTrainingContext);
export const useTrainingStore = () => useContext(TrainingContext);

export const TrainingProvider = ({ children }: ITrainingContext) => {
  const [isStartedTraining, setIsStartedTraining] = useState<boolean>(false);
  // const [ninetyDegrees, setNinetyDegrees] = useState<number>(0);

  const { isMobile } = useDevices();

  const handleInitialState = (): ITraining | undefined => {
    return isMobile ? undefined : TRAININGS[0];
  };

  const [trainingSelected, setTrainingSelected] = useState<
    ITraining | undefined
  >(handleInitialState());

  const updateRepeat = () => {
    if (!trainingSelected) return;
    const { repeat } = trainingSelected;

    setTrainingSelected((training) => {
      if (!training) return;
      return {
        ...training,
        repeat: training?.repeat + 1,
      };
    });
  };

  let ninetyDegrees = 0;
  let alreadyDetected = false;
  const countRepeat = (value: number) => {
    if (!trainingSelected) return;

    if (ninetyDegrees === 2) {
      ninetyDegrees = 0;
      updateRepeat();
      return;
    }
    if (value < trainingSelected?.pose.angle && !alreadyDetected) {
      alreadyDetected = true;
      ninetyDegrees = ninetyDegrees + 1;
      return;
    }

    if (value > trainingSelected?.pose.angle) {
      alreadyDetected = false;
    }
  };

  return (
    <TrainingContext.Provider
      value={{
        trainingSelected,
        isStartedTraining,
        setIsStartedTraining,
        setTrainingSelected,
        updateRepeat,
        countRepeat,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
