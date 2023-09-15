export interface IUseCamOut {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasCtxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  startCam: () => void;
  stopCam: () => void;
}
