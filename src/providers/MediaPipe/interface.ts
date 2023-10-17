import { IModelComplexity } from '../../hooks/useMediaPipe/interface';

export interface ITraining {
  id: number;
  name: string;
  description: string;
  icon: string;
  gif: string;
}

export interface IMediaPipeState {
  selfieMode: boolean;
  showDrawLines: boolean;
  showSegmentation: boolean;
  modelComplexity: IModelComplexity;
  minTrackingConfidence: number;
  minPoseDetectConfidence: number;
}

export interface IProviderMediaPipeContext extends IMediaPipeState {
  setSelfieMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDrawLines: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSegmentation: React.Dispatch<React.SetStateAction<boolean>>;
  setModelComplexity: React.Dispatch<React.SetStateAction<IModelComplexity>>;
  setMinPoseDetectConfidence: React.Dispatch<React.SetStateAction<number>>;
  setMinTrackingConfidence: React.Dispatch<React.SetStateAction<number>>;
}

export interface IMediaPipeContext {
  children: React.ReactNode;
}
