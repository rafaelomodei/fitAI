import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, Results } from '@mediapipe/pose';

interface IDrawing {
  showSegmentation: boolean;
  showDrawLines: boolean;
  width: number;
  height: number;
  canvasCtx: CanvasRenderingContext2D;
  results: Results;
}

const drawing = (props: IDrawing) => {
  const { width, height, canvasCtx, results, showSegmentation, showDrawLines } =
    props;

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.drawImage(results.segmentationMask, 0, 0, width, height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-out';
  canvasCtx.fillStyle = showSegmentation ? '#ffbd6061' : '#0055FF00';
  canvasCtx?.fillRect(0, 0, width, height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(results.image, 0, 0, width, height);

  canvasCtx.globalCompositeOperation = 'source-over';

  if (showDrawLines)
    drawConnectors(canvasCtx!, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#C0CEFF',
      lineWidth: 4,
    });

  if (showDrawLines)
    drawLandmarks(canvasCtx!, results.poseLandmarks, {
      color: '#6083FF',
      lineWidth: 4,
      radius: 6,
      fillColor: '#78ff60f9',
    });
  canvasCtx.restore();
};

export { drawing };
