import { createContext, useContext, useState } from 'react';
import { IMediaPipeContext, IUseMediaPipeContext } from './interface';

export const MediaPipeContext = createContext({} as IUseMediaPipeContext);
export const useMediaPipeStore = () => useContext(MediaPipeContext);

export const MediaPipeProvider = ({ children }: IMediaPipeContext) => {
  const [showDrawLines, setShowDrawLines] = useState<boolean>(false);
  const [showSegmentation, setShowSegmentation] = useState<boolean>(false);
  const [numPose, setNumPose] = useState<number>(1);
  const [minPoseDetectConfidence, setMinPoseDetectConfidence] =
    useState<number>(0.5);
  const [minPosePresenceConfidence, setMinPosePresenceConfidence] =
    useState<number>(0.5);
  const [minTrackingConfidence, setMinTrackingConfidence] =
    useState<number>(0.5);

  const providerValue: IUseMediaPipeContext = {
    showDrawLines,
    showSegmentation,
    numPose,
    minPoseDetectConfidence,
    minPosePresenceConfidence,
    minTrackingConfidence,
    setShowDrawLines,
    setShowSegmentation,
    setNumPose,
    setMinPoseDetectConfidence,
    setMinPosePresenceConfidence,
    setMinTrackingConfidence,
  };

  return (
    <MediaPipeContext.Provider value={providerValue}>
      {children}
    </MediaPipeContext.Provider>
  );
};
