export interface IonResultsProps {
  results: any;
  video: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
  canvasCtx: CanvasRenderingContext2D | null;
  showSegmentation: boolean;
}

export type IModelComplexity = 0 | 2 | 1 | undefined;
