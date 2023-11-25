import { Flex } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa6';

interface IVideoControl {
  play: () => void;
  pause: () => void;
}

export const VideoControl = (props: IVideoControl) => {
  const { play, pause } = props;

  return (
    <Flex
      w='100%'
      position='relative'
      alignItems='center'
      h='min-content'
      p={2}
      gap={2}
      zIndex={10}
    >
      <FaPlay onClick={play} />
      <FaPause onClick={pause} />
    </Flex>
  );
};
