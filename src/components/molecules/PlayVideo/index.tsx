import { LegacyRef } from 'react';
import { Canvas, Video } from './style';

interface IPlayVideo {
  videoFile: File;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export const PlayVideo = (props: IPlayVideo) => {
  const { videoFile, videoRef, canvasRef } = props;

  const videoUrl = URL.createObjectURL(videoFile);

  return (
    <>
      <Video autoPlay controls ref={videoRef}>
        <source style={{zIndex: 1}} src={videoUrl} type={videoFile.type} />
      </Video>
      <Canvas
        ref={canvasRef as LegacyRef<HTMLCanvasElement>}
        className='output_canvas'
        width={640}
        height={360}
      />
    </>
  );
};
