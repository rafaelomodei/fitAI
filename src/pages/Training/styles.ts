import { styled } from 'styled-components';

export const Canvas = styled.canvas`
  transform: scaleX(-1);
  position: absolute;
  object-fit: cover;
  height: 100vh;
  width: 100%;
`;

export const Video = styled.video`
  background-color: pink;
  transform: scaleX(-1);
  position: absolute;
  object-fit: cover;
  height: 100vh;
  width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;
