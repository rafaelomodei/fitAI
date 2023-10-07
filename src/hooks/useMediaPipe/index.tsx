import { Camera } from '@mediapipe/camera_utils';
import { Pose } from '@mediapipe/pose';
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from '@mediapipe/tasks-vision';
import { useEffect, useRef } from 'react';
import { useMediaPipeStore } from '../../providers/MediaPipe';
import { onResults } from './utils';

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

  let lastVideoTime = -1;
  let poseLandmarker: PoseLandmarker | undefined = undefined;
  let drawingUtils: DrawingUtils | undefined = undefined;

  async function predictWebcam() {
    if (!videoRef.current || !canvasRef.current || !canvasCtxRef.current)
      return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const canvasCtx = canvasCtxRef.current;

    if (!drawingUtils) drawingUtils = new DrawingUtils(canvasCtx);

    canvas.style.height = `${video.height}`;
    video.style.height = `${video.height}`;
    canvas.style.width = `${video.width}`;
    video.style.width = `${video.width}`;
    // Now let's start detecting the stream.

    await poseLandmarker?.setOptions({ runningMode: 'VIDEO' });

    if (!poseLandmarker) return;

    let startTimeMs = performance.now();

    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;

      poseLandmarker?.detectForVideo(video, startTimeMs, (result) => {
        // canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        for (const landmark of result.landmarks) {
          drawingUtils?.drawLandmarks(landmark, {
            radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          });
          drawingUtils?.drawConnectors(
            landmark,
            PoseLandmarker.POSE_CONNECTIONS
          );
        }

        canvasCtx.restore();
      });
    }

    video.play();

    window.requestAnimationFrame(predictWebcam);
  }

  const runMediaPipe = async () => {
    try {
     

      const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

      if (!hasGetUserMedia())
        return console.warn('getUserMedia() is not supported by your browser');

      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );

      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numPoses: 2,
      });

      if (!poseLandmarker) {
        console.log('Wait! poseLandmaker not loaded yet.');
        return;
      }

      // getUsermedia parameters.
      const constraints = {
        video: true,
      };
      if (!videoRef.current) return;
      const video = videoRef.current;

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
      });

      // try {
      //   const mediaStream = await navigator.mediaDevices.getUserMedia({
      //     video: true,
      //   });
      //   video.srcObject = mediaStream;
      //   video.addEventListener(
      //     'loadeddata',
      //     async () =>
      //       await predictWebcam(
      //         video,
      //         canvas,
      //         canvasCtx,
      //         poseLandmarker,
      //         drawingUtils
      //       )
      //   );
      // } catch (e) {
      //   console.error(e);
      // }
      // video.onloadedmetadata = async function (event) {
      //   try {
      //     await video.play();
      //   } catch (e) {
      //     console.error(e);
      //   }
      // };

      // const pose = new Pose({
      //   locateFile: (file) => {
      //     return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      //   },
      // });

      // console.info('runMediaPipe::showDrawLines: ', config.showDrawLines);
      // console.info(
      //   'runMediaPipe::minTrackingConfidence: ',
      //   config.minTrackingConfidence
      // );
      // console.info(
      //   'runMediaPipe::minPoseDetectConfidence: ',
      //   config.minPoseDetectConfidence
      // );
      // console.info(
      //   'runMediaPipe::minPosePresenceConfidence: ',
      //   config.minPosePresenceConfidence
      // );

      // pose.setOptions({
      //   modelComplexity: 1,
      //   smoothLandmarks: false,
      //   enableSegmentation: true,
      //   smoothSegmentation: true,
      //   minDetectionConfidence: config.minPoseDetectConfidence,
      //   minTrackingConfidence: config.minTrackingConfidence,
      // });

      // pose.onResults((results: any) =>
      //   onResults({
      //     results,
      //     video: video,
      //     canvas: canvas,
      //     canvasCtx: canvasCtx,
      //     showSegmentation: showSegmentation,
      //   })
      // );

      // const camera = new Camera(video, {
      //   onFrame: async () => {
      //     await pose.send({ image: video });
      //   },
      //   width: video!.width * 2.7,
      //   height: video!.height,
      // });

      // camera.start();
    } catch {
      console.info('error');
    }
  };

  return { runMediaPipe };
};

export default useMediaPipe;
