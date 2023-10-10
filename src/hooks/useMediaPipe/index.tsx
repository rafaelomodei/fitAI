import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS, Results } from '@mediapipe/pose';
import { useEffect, useRef } from 'react';

interface IConfig {
  showDrawLines: boolean;
  showSegmentation: boolean;
  numPose: number;
  minPoseDetectConfidence: number;
  minPosePresenceConfidence: number;
  minTrackingConfidence: number;
}
interface IRunMediaPipe {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  // showSegmentation: boolean;
  // config: IConfig;
}

interface IUseMediaPipeProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  // showSegmentation: boolean;
  // config: IConfig;
}

const useMediaPipe = (props: IUseMediaPipeProps) => {
  const { videoRef, canvasRef } = props;

  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current)
      canvasCtxRef.current = canvasRef.current.getContext('2d');
  }, [canvasRef]);

  const onResults = (results: Results) => {
    if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
      return;

    if (!results.poseLandmarks || !results.poseWorldLandmarks) return;

    const width = videoRef.current.width;
    const height = videoRef.current.height;
    const canvasCtx = canvasCtxRef.current;
    const showSegmentation = false;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, width, height);
    canvasCtx.drawImage(results.segmentationMask, 0, 0, width, height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-out';
    canvasCtx.fillStyle = showSegmentation ? '#70e96a82' : '#0055FF00';
    canvasCtx?.fillRect(0, 0, width, height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.image, 0, 0, width, height);

    canvasCtx.globalCompositeOperation = 'source-over';

    drawConnectors(canvasCtx!, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#e2e2e2',
      lineWidth: 4,
    });

    drawLandmarks(canvasCtx!, results.poseLandmarks, {
      color: '#7876f3',
      lineWidth: 2,
    });
    canvasCtx.restore();
  };

  const runMediaPipe = () => {
    try {
      if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
        return;

      const videoElement = videoRef.current;

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

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: videoElement!.width,
        height: videoElement!.height,
      });

      pose.close();
      camera.start();
    } catch {
      console.info('error');
    }
  };

  return { runMediaPipe };
};

export default useMediaPipe;
