import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';
import { IUseCamOut } from './interfaces';
import { onResults } from './utils';

function useCam(): IUseCamOut {
  const [camera, setCamera] = useState<Camera | undefined>(undefined);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const startCam = () => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }
    if (videoRef.current && canvasRef.current) run(videoRef.current);
  };

  const stopCam = () => camera?.stop();

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

    pose.onResults((results: any) =>
      onResults({
        results,
        video: videoRef.current,
        canvas: canvasRef.current,
        canvasCtx: canvasCtxRef.current,
      })
    );

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width: videoElement!.width * 2.7,
      height: videoElement!.height,
    });

    camera.start();
    setCamera(camera);
  };

  return { canvasRef, videoRef, startCam, stopCam };
}

export default useCam;
