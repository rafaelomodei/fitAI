import styled from 'styled-components';

export const Video = styled.video`
  width: 640px;
  height: 360px;
  border-radius: 16px;

  /* z-index: 20; */
`;

export const Canvas = styled.canvas`
  /* transform: scaleX(-1); */
  position: absolute;
  object-fit: cover;
  background-color: orange;
  /* height: 100vh; */
  /* width: 100%; */
`;
