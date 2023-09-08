export interface IUseCamOut {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
  startCam: () => void;
  stopCam: () => void;
}

export interface IonResultsProps {
  results: any;
  video: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
  canvasCtx: CanvasRenderingContext2D | null;
}
