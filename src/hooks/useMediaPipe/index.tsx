import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS, Results } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';
import { useMediaPipeStore } from '../../providers/MediaPipe';
import { useTrainingStore } from '../../providers/Training';
import {
  angleBetweenVectors,
  distanceDBetweenTheTwoStraightLines,
  euclideanDistance,
} from '../../utils/vector';
import { drawing } from './utils';

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

  const [hasDetected, setHasDetected] = useState<boolean>(false);
  const [isLoadingMediaPipe, setIsLoadingMediaPipe] = useState<boolean>(true);

  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  let pose: Pose | undefined = undefined;

  const { isStartedTraining } = useTrainingStore();

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
    setIsLoadingMediaPipe(false);

    // console.info('poseLandmarks: ', results.poseLandmarks);
    // console.info('poseWorldLandmarks: ', results.poseWorldLandmarks);

    const vectorA = {
      x: results.poseLandmarks[12].x,
      y: results.poseLandmarks[12].y,
      z: results.poseLandmarks[12].z,
    };

    const vectorB = {
      x: results.poseLandmarks[14].x,
      y: results.poseLandmarks[14].y,
      z: results.poseLandmarks[14].z,
    };

    const vectorC = {
      x: results.poseLandmarks[16].x,
      y: results.poseLandmarks[16].y,
      z: results.poseLandmarks[16].z,
    };

    // console.info('vectorA: ', vectorA);
    // console.info('vectorB: ', vectorB);

    const angle = angleBetweenVectors({ vectorA, vectorB, vectorC });
    const d = distanceDBetweenTheTwoStraightLines(vectorA, vectorC);

    const D = d * Math.sin(angle);
    const magnitudeD = Math.sqrt(D);
    console.info('magnitudeD: ', magnitudeD);

    // console.info('angle: ', (angle * 180) / Math.PI);

    // const distance = euclideanDistance({ vectorA, vectorB, vectorC });

    // console.info('distance: ', distance);

    const width = videoRef.current.width;
    const height = videoRef.current.height;
    const canvasCtx = canvasCtxRef.current;

    drawing({
      showSegmentation,
      showDrawLines,
      width,
      height,
      canvasCtx,
      results,
    });
  };

  const runMediaPipe = () => {
    try {
      if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
        return;

      const video = videoRef.current;

      const camera = new Camera(video, {
        onFrame: async () => {
          await pose?.send({ image: video });
        },
        width: video!.width,
        height: video!.height,
      });

      camera.start();

      if (!isStartedTraining) return;

      pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      pose?.setOptions({
        modelComplexity: modelComplexity,
        smoothLandmarks: showDrawLines,
        enableSegmentation: true,
        smoothSegmentation: showSegmentation,
        minDetectionConfidence: minPoseDetectConfidence,
        minTrackingConfidence: minTrackingConfidence,
        selfieMode: selfieMode,
      });

      pose?.onResults(onResults);

      // const camera = new Camera(video, {
      //   onFrame: async () => {
      //     await pose.send({ image: video });
      //   },
      //   width: video!.width,
      //   height: video!.height,
      // });

      pose?.close();
      camera.start();
    } catch {
      console.info('error');
    }
  };

  return { hasDetected, isLoadingMediaPipe, runMediaPipe };
};

export default useMediaPipe;
