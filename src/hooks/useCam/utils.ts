import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { IonResultsProps } from './interfaces';

const onResults = (props: IonResultsProps) => {
  const { results, video, canvas, canvasCtx } = props;
  // if (!results.poseLandmarks) {
  //   grid.updateLandmarks([]);
  //   return;
  // }
  if (canvasCtx && video && canvas) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, video.width, video.height);
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      video.width,
      video.height
    );

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = '#1756D300';
    canvasCtx?.fillRect(0, 0, video.width, video.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.image, 0, 0, video.width, video.height);

    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx!, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx!, results.poseLandmarks, {
      color: '#FF0000',
      lineWidth: 2,
    });
    canvasCtx.restore();

    // grid.updateLandmarks(results.poseWorldLandmarks);
  }
};

export { onResults };
