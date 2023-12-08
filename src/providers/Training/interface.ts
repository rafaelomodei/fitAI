interface ILandmark {
  a: number;
  b: number;
  c: number;
}

interface IPose {
  landmark: ILandmark;
  angle: number;
}
export interface ITraining {
  id: number;
  name: string;
  description: string;
  icon: string;
  gif: string;
  repeat: number;
  pose: IPose;
}

export interface IUseTrainingContext {
  trainingSelected?: ITraining;
  isStartedTraining: boolean;
  setIsStartedTraining: React.Dispatch<React.SetStateAction<boolean>>;
  setTrainingSelected: React.Dispatch<
    React.SetStateAction<ITraining | undefined>
  >;
  updateRepeat: () => void;
  countRepeat: (value: number) => void;
}

export interface ITrainingContext {
  children: React.ReactNode;
}
