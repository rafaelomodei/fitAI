export interface ITraining {
  id: number;
  name: string;
  description: string;
  icon: string;
  gif: string;
}

export interface IUseTrainingContext {
  trainingSelected?: ITraining;
  isStartedTraining: boolean;
  setIsStartedTraining: React.Dispatch<React.SetStateAction<boolean>>;
  setTrainingSelected: React.Dispatch<
    React.SetStateAction<ITraining | undefined>
  >;
}

export interface ITrainingContext {
  children: React.ReactNode;
}
