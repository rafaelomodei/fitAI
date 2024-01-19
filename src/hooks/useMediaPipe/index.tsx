import { Camera } from '@mediapipe/camera_utils';
import { Pose, Results } from '@mediapipe/pose';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaPipeStore } from '../../providers/MediaPipe';
import { useTrainingStore } from '../../providers/Training';
import {
  angleBetweenVectors,
  distanceDBetweenTheTwoStraightLines,
} from '../../utils/vector';
import { drawing } from './utils';

// interface IConfig {
//   showDrawLines: boolean;
//   showSegmentation: boolean;
//   numPose: number;
//   minPoseDetectConfidence: number;
//   minPosePresenceConfidence: number;
//   minTrackingConfidence: number;
// }

// interface IRunMediaPipe {
//   video: HTMLVideoElement;
//   canvas: HTMLCanvasElement;
//   canvasCtx: CanvasRenderingContext2D;
//   // showSegmentation: boolean;
//   // config: IConfig;
// }

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

  const { trainingSelected, isStartedTraining, countRepeat } =
    useTrainingStore();

  const location = useLocation();

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
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !canvasCtxRef.current ||
      !trainingSelected
    )
      return;

    if (!results.poseLandmarks || !results.poseWorldLandmarks) {
      setHasDetected(false);
      return;
    }

    setHasDetected(true);
    setIsLoadingMediaPipe(false);

    const vectorA = {
      x: results.poseLandmarks[trainingSelected.pose.landmark.a].x,
      y: results.poseLandmarks[trainingSelected.pose.landmark.a].y,
      z: results.poseLandmarks[trainingSelected.pose.landmark.a].z,
    };

    const vectorB = {
      x: results.poseLandmarks[trainingSelected.pose.landmark.b].x,
      y: results.poseLandmarks[trainingSelected.pose.landmark.b].y,
      z: results.poseLandmarks[trainingSelected.pose.landmark.b].z,
    };

    const vectorC = {
      x: results.poseLandmarks[trainingSelected.pose.landmark.c].x,
      y: results.poseLandmarks[trainingSelected.pose.landmark.c].y,
      z: results.poseLandmarks[trainingSelected.pose.landmark.c].z,
    };

    const angle = angleBetweenVectors({ vectorA, vectorB, vectorC });
    const d = distanceDBetweenTheTwoStraightLines(vectorA, vectorC);

    const D = d * Math.sin(angle);
    const magnitudeD = Math.sqrt(D);
    countRepeat(magnitudeD);

    // const distance = euclideanDistance({ vectorA, vectorB, vectorC });

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

  const runCamMediaPipe = () => {
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

     console.info('location: ', location.pathname)

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
    } catch {}
  };

  const runMediaPipe = () => {
    try {
      if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
        return;

      const video = videoRef.current;
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

      const animation = async () => {
        canvasCtxRef.current?.clearRect(0, 0, 640, 360);
        await pose?.send({ image: video });

        pose?.onResults(onResults);
        requestAnimationFrame(animation);
      };
      pose?.close();

      animation();
    } catch {}
  };

  return { hasDetected, isLoadingMediaPipe, runMediaPipe, runCamMediaPipe };
};

export default useMediaPipe;
