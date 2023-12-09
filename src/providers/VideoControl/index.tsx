import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IUseVideoControlContext, IVideoControlContext } from './interface';

export const VideoControlContext = createContext({} as IUseVideoControlContext);
export const useVideoControlStore = () => useContext(VideoControlContext);

export const VideoControlProvider = ({ children }: IVideoControlContext) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(true);

  const play = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
  };

  const pause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  const getVideoState = (): HTMLVideoElement | undefined => {
    if (!videoRef.current) return;

    return videoRef.current;
  };

  useEffect(() => {}, [isPaused]);

  // useEffect(() => {
  //     'VideoControlProvider::useEffect::paused: ',
  //     videoRef.current?.paused
  //   );
  //   if (!videoRef.current) return;
  //   setIsPaused(Boolean(videoRef.current?.paused));
  // }, [videoRef?.current]);

  return (
    <VideoControlContext.Provider
      value={{
        videoRef,
        isPaused,
        state: getVideoState,
        play,
        pause,
      }}
    >
      {children}
    </VideoControlContext.Provider>
  );
};
