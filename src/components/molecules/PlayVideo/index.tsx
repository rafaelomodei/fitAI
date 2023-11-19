import { Video } from './style';

interface IPlayVideo {
  videoFile: File;
}

export const PlayVideo = (props: IPlayVideo) => {
  const { videoFile } = props;

  const videoUrl = URL.createObjectURL(videoFile);

  return (
    <Video controls>
      <source src={videoUrl} type={videoFile.type} />
    </Video>
  );
};
