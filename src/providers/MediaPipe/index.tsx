import { createContext, useContext, useState } from 'react';
import { IModelComplexity } from '../../hooks/useMediaPipe/interface';
import { SESSION_STORAGE_MEDIA_PIPE } from './constants';
import {
  IMediaPipeContext,
  IMediaPipeState,
  IProviderMediaPipeContext,
} from './interface';

export const MediaPipeContext = createContext({} as IProviderMediaPipeContext);
export const useMediaPipeStore = () => useContext(MediaPipeContext);

export const MediaPipeProvider = ({ children }: IMediaPipeContext) => {
  const [selfieMode, setSelfieMode] = useState<boolean>(false);
  const [showDrawLines, setShowDrawLines] = useState<boolean>(true);
  const [showSegmentation, setShowSegmentation] = useState<boolean>(false);
  const [modelComplexity, setModelComplexity] = useState<IModelComplexity>(1);
  const [minPoseDetectConfidence, setMinPoseDetectConfidence] =
    useState<number>(0.5);
  const [minTrackingConfidence, setMinTrackingConfidence] =
    useState<number>(0.5);

  const sessionStorageItem = sessionStorage.getItem(SESSION_STORAGE_MEDIA_PIPE);
  const sessionData = JSON.parse(
    sessionStorageItem as string
  ) as IMediaPipeState;

  const providerValue: IProviderMediaPipeContext = {
    selfieMode,
    showDrawLines,
    showSegmentation,
    modelComplexity,
    minTrackingConfidence,
    minPoseDetectConfidence,
    setSelfieMode,
    setShowDrawLines,
    setShowSegmentation,
    setModelComplexity,
    setMinPoseDetectConfidence,
    setMinTrackingConfidence,
  };

  return (
    <MediaPipeContext.Provider value={providerValue}>
      {children}
    </MediaPipeContext.Provider>
  );
};
