import styled from 'styled-components';
import { EStatusUploadFile } from './interface';
import { theme } from '../../../theme';
import { BORDER_COLOR } from './constant';

interface IDropFile {
  statusUploadFile: EStatusUploadFile;
}

export const DropFile = styled.div<IDropFile>`
  && {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 190px;

    background-color: ${({ statusUploadFile }) => {
      if (statusUploadFile === EStatusUploadFile.UPLOAD_LOADING)
        return `${theme.colors.primary10}`;
    }};

    box-shadow: none;
    border: 1px dashed
      ${({ statusUploadFile }) => BORDER_COLOR[statusUploadFile]};
    border-radius: 8px;
  }
`;
