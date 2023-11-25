import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IUseVideoControlContext, IVideoControlContext } from './interface';

export const VideoControlContext = createContext({} as IUseVideoControlContext);
export const useVideoControlStore = () => useContext(VideoControlContext);

export const VideoControlProvider = ({ children }: IVideoControlContext) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(true);

  const play = () => {
    console.info('useVideoControl::Play::inicio::videoRef', videoRef);
    if (!videoRef.current) return;
    console.info('useVideoControl::Play::fim');
    videoRef.current.play();
  };

  const pause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  const getVideoState = (): HTMLVideoElement | undefined => {
    console.info('getVideoState: ', videoRef?.current);
    if (!videoRef.current) return;

    return videoRef.current;
  };

  useEffect(() => {
    console.info('VideoControlProvider::useEffect::isPaused: ', isPaused);
  }, [isPaused]);

  // useEffect(() => {
  //   console.info(
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
