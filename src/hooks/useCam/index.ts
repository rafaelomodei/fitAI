import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';
import { IUseCamOut } from './interfaces';
import { onResults } from '../useMediaPipe/utils';
import useMediaPipe from '../useMediaPipe';
import { useMediaPipeStore } from '../../providers/MediaPipe';

const useCam = (): IUseCamOut => {
  const [camera, setCamera] = useState<Camera | undefined>(undefined);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const startCam = () => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }

    if (videoRef.current && canvasRef.current && canvasCtxRef.current)
      return { canvasRef, videoRef, canvasCtxRef, startCam, stopCam };
  };

  const stopCam = () => camera?.stop();

  return { canvasRef, videoRef, canvasCtxRef, startCam, stopCam };
};

export default useCam;
