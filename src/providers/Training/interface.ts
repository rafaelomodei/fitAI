export interface ITraining {
  id: number;
  name: string;
  description: string;
  icon: string;
  gif: string;
}

export interface IUseTrainingContext {
  trainingSelected?: ITraining;
  setTrainingSelected: React.Dispatch<
    React.SetStateAction<ITraining | undefined>
  >;
}

export interface ITrainingContext {
  children: React.ReactNode;
}
