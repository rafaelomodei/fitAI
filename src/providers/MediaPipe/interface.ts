export interface ITraining {
  id: number;
  name: string;
  description: string;
  icon: string;
  gif: string;
}

export interface IUseMediaPipeContext {
  showDrawLines: boolean;
  showSegmentation: boolean;
  numPose: number;
  minPoseDetectConfidence: number;
  minPosePresenceConfidence: number;
  minTrackingConfidence: number;
  setShowDrawLines: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSegmentation: React.Dispatch<React.SetStateAction<boolean>>;
  setNumPose: React.Dispatch<React.SetStateAction<number>>;
  setMinPoseDetectConfidence: React.Dispatch<React.SetStateAction<number>>;
  setMinPosePresenceConfidence: React.Dispatch<React.SetStateAction<number>>;
  setMinTrackingConfidence: React.Dispatch<React.SetStateAction<number>>;
}

export interface IMediaPipeContext {
  children: React.ReactNode;
}
