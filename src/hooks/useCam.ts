import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';

type IStateCam = 'STOP' | 'START';

interface IUseCamOut {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
  startCam: () => void;
  stopCam: () => void;
}

interface IUseCamProps {
  videoElement: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
  width: number;
  height: number;
}

function useCam(): IUseCamOut {
  const [stateCam, setStateCam] = useState<IStateCam>('STOP');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const stopCam = () => setStateCam('STOP');
  const startCam = () => {
    setStateCam('START');

    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }
    if (videoRef.current && canvasRef.current) run(videoRef.current);
  };

  const run = (videoElement: HTMLVideoElement) => {
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
      width: videoElement!.width * 2.7,
      height: videoElement!.height,
    });
    camera.start();

    if (stateCam === 'STOP') camera.stop();
  };

  const onResults = (results: any) => {
    // if (!results.poseLandmarks) {
    //   grid.updateLandmarks([]);
    //   return;
    // }
    const canvasCtx = canvasCtxRef.current;
    if (canvasCtx && videoRef.current && canvasRef.current) {
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = '#1756D300';
      canvasCtx?.fillRect(
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );

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

  return { canvasRef, videoRef, startCam, stopCam };
}

export default useCam;
