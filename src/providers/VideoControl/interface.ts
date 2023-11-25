export interface IUseVideoControlContext {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  isPaused: boolean;
  state: () => HTMLVideoElement | undefined;
  play: () => void;
  pause: () => void;
}

export interface IVideoControlContext {
  children: React.ReactNode;
}
