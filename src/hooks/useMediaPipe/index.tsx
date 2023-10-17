import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS, Results } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';
import { useMediaPipeStore } from '../../providers/MediaPipe';

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

  const [hasDetected, setHasDetected] = useState<boolean>(true);

  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const {
    selfieMode,
    showDrawLines,
    showSegmentation,
    modelComplexity,
    minTrackingConfidence,
    minPoseDetectConfidence,
  } = useMediaPipeStore();

  useEffect(() => {
    if (canvasRef.current)
      canvasCtxRef.current = canvasRef.current.getContext('2d');
  }, [canvasRef]);

  const onResults = (results: Results) => {
    if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
      return;

    if (!results.poseLandmarks || !results.poseWorldLandmarks) {
      setHasDetected(false);
      return;
    }
    setHasDetected(true);

    const width = videoRef.current.width;
    const height = videoRef.current.height;
    const canvasCtx = canvasCtxRef.current;

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
        fillColor: '#78ff60f9'
      });
    canvasCtx.restore();
  };

  const runMediaPipe = () => {
    try {
      if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
        return;

      const video = videoRef.current;

      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      pose.setOptions({
        modelComplexity: modelComplexity,
        smoothLandmarks: showDrawLines,
        enableSegmentation: true,
        smoothSegmentation: showSegmentation,
        minDetectionConfidence: minPoseDetectConfidence,
        minTrackingConfidence: minTrackingConfidence,
        selfieMode: selfieMode,
      });

      pose.onResults(onResults);

      const camera = new Camera(video, {
        onFrame: async () => {
          await pose.send({ image: video });
        },
        width: video!.width,
        height: video!.height,
      });

      pose.close();
      camera.start();
    } catch {
      console.info('error');
    }
  };

  return { hasDetected, runMediaPipe };
};

export default useMediaPipe;
