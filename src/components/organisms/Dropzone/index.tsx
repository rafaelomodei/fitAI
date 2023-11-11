import { useEffect } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { EStatusUploadFile } from './interface';
import { Error } from './states/Error';
import { Loading } from './states/Loading';
import { Reject } from './states/Reject';
import { Success } from './states/Success';
import { Upload } from './states/Upload';
import { DropFile } from './style';

const stepsUploadFile = {
  UPLOAD: <Upload />,
  UPLOAD_LOADING: <Upload isDragActive />,
  SUCCESS: <Success />,
  ERROR: <Error />,
  DRAG_REJECT: <Reject />,
  LOADING: <Loading />,
};

interface IDropzone {
  statusUploadFile: EStatusUploadFile;
  setStatusUploadFile: React.Dispatch<React.SetStateAction<EStatusUploadFile>>;
}

const Dropzone = (props: IDropzone) => {
  const { statusUploadFile, setStatusUploadFile } = props;

  const acceptFormatFile: Accept = {
    'video/mp4': ['.mp4'],
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
    acceptedFiles,
  } = useDropzone({ accept: acceptFormatFile });

  const handleStepUploadFile = () => {
    if (isDragReject) return EStatusUploadFile.DRAG_REJECT;
    if (isDragActive) return EStatusUploadFile.UPLOAD_LOADING;
    if (fileRejections.length) return EStatusUploadFile.ERROR;
    if (acceptedFiles.length) return EStatusUploadFile.SUCCESS;

    return statusUploadFile;
  };

  useEffect(
    () => setStatusUploadFile(handleStepUploadFile()),
    [isDragReject, isDragActive, fileRejections, acceptedFiles]
  );

  return (
    <>
      <DropFile {...getRootProps()} statusUploadFile={handleStepUploadFile()}>
        <input {...getInputProps()} />

        {stepsUploadFile[handleStepUploadFile()]}
      </DropFile>
    </>
  );
};

export { Dropzone };
