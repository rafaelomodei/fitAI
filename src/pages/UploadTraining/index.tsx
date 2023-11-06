import { ArrowBackIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDevices from '../../hooks/useDevicesHook';
import { useTrainingStore } from '../../providers/Training';
import { Error } from './Error';
import { Loading } from './Loading';
import { Card, Container } from './style';
import { Success } from './Success';
import { Upload } from './Upload';

enum EStatusUploadFile {
  UPLOAD = 'UPLOAD',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}
const stepsUploadFile = {
  UPLOAD: <Upload />,
  SUCCESS: <Success />,
  ERROR: <Error />,
  LOADING: <Loading />,
};

interface IUploadTraining {
  setAnalyzeTraining: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadTraining = (props: IUploadTraining) => {
  const { setAnalyzeTraining } = props;

  const [statusUploadFile, setStatusUploadFile] = useState<EStatusUploadFile>(
    EStatusUploadFile.SUCCESS
  );

  const navigate = useNavigate();
  const { isMobile } = useDevices();
  const { trainingSelected } = useTrainingStore();

  const handleButton = () => {
    const isSuccess = statusUploadFile === EStatusUploadFile.SUCCESS;
    const isError = statusUploadFile === EStatusUploadFile.ERROR;

    if (isSuccess)
      return (
        <Button
          w={isMobile ? '100%' : 'min-content'}
          bg='primary'
          color='white'
          size='lg'
          mt={4}
          _hover={{ backgroundColor: 'primary90' }}
          onClick={() => navigate('/analise-treino')}
        >
          Iniciar analise do treino
        </Button>
      );
    if (isError)
      return (
        <Button
          w={isMobile ? '100%' : 'min-content'}
          bg='primary'
          color='white'
          size='lg'
          mt={4}
          _hover={{ backgroundColor: 'primary90' }}
          onClick={() => setStatusUploadFile(EStatusUploadFile.UPLOAD)}
        >
          Tentar novamente
        </Button>
      );
  };
  return (
    <Container>
      <Button
        variant='link'
        w='min-content'
        color='primary'
        onClick={() => setAnalyzeTraining(false)}
      >
        <ArrowBackIcon mr={2} /> Voltar
      </Button>
      <Flex w='100%' flexDirection='column'>
        <Heading size='md'>
          {`${trainingSelected?.name} -  Analise de treino`}
        </Heading>
        <Text pt={2}>
          Utilize nossa análise de vídeo com IA para aprimorar seu treinamento.
          Nossa tecnologia de ponta permite a análise em questão de segundos,
          garantindo resultados eficientes e personalizados para o seu
          progresso.
        </Text>
        <Text pt={4}>
          <WarningTwoIcon mr={2} mt={-1.4} color='#f2b866' />
          <strong>Observação:</strong> Certifique-se de que o vídeo enviado
          corresponde ao exercício de
          <strong>{` ${trainingSelected?.name} `}</strong>
          selecionado na barra lateral esquerda para análise precisa.
        </Text>
      </Flex>
      <Card p={4}>
        <CardBody display='flex' flexDirection='column' alignItems='center'>
          {stepsUploadFile[statusUploadFile]}
        </CardBody>
      </Card>
      {handleButton()}
      <Box h={4} />
    </Container>
  );
};

export { UploadTraining };
