import { Camera } from '@mediapipe/camera_utils';
import { LandmarkGrid } from '@mediapipe/control_utils_3d';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';

interface IScriptCam {
  videoElement?: HTMLVideoElement;
  canvasElement?: HTMLCanvasElement;
  width: number;
  height: number;
  stop?: boolean;
}

const scriptCam = (props: IScriptCam) => {
  const { videoElement, canvasElement, width, height, stop } = props;
  const canvasCtx = canvasElement?.getContext('2d');
  // const landmarkContainer = document.getElementsByClassName(
  //   'landmark-grid-container'
  // )[0] as HTMLElement;

  // const grid = new LandmarkGrid(landmarkContainer);

  console.info('videoElement::width: ', videoElement?.width);
  console.info('videoElement::height: ', videoElement?.height);

  function onResults(results: any) {
    // if (!results.poseLandmarks) {
    //   grid.updateLandmarks([]);
    //   return;
    // }

    if (canvasCtx) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.drawImage(results.segmentationMask, 0, 0, width, height);

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = '#1756D300';
      canvasCtx?.fillRect(0, 0, width, height);

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, width, height);

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
  }

  const pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
  });
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  pose.onResults(onResults);

  const camera = new Camera(videoElement!, {
    onFrame: async () => {
      await pose.send({ image: videoElement! });
    },
    width: videoElement!.width * 2.7,
    height: videoElement!.height,
  });
  camera.start();
  if (stop) camera.stop();
};

export { scriptCam };
