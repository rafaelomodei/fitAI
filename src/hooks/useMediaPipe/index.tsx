import { Camera } from '@mediapipe/camera_utils';
import { Pose } from '@mediapipe/pose';
import { useEffect } from 'react';
import { useMediaPipeStore } from '../../providers/MediaPipe';
import { onResults } from './utils';

interface IRunMediaPipe {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  showSegmentation: boolean;
}

const useMediaPipe = () => {
  const {
    showDrawLines,
    minPoseDetectConfidence,
    minPosePresenceConfidence,
    minTrackingConfidence,
  } = useMediaPipeStore();

  const runMediaPipe = (props: IRunMediaPipe) => {
    const { video, canvas, canvasCtx, showSegmentation } = props;

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: false,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: minPoseDetectConfidence,
      minTrackingConfidence: minTrackingConfidence,
    });

    pose.onResults((results: any) =>
      onResults({
        results,
        video: video,
        canvas: canvas,
        canvasCtx: canvasCtx,
        showSegmentation: showSegmentation,
      })
    );

    const camera = new Camera(video, {
      onFrame: async () => {
        await pose.send({ image: video });
      },
      width: video!.width * 2.7,
      height: video!.height,
    });

    camera.start();
  };

  return { runMediaPipe };
};

export default useMediaPipe;
