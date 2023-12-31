import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from '../../components/organisms/Dropzone';
import useDevices from '../../hooks/useDevicesHook';
import { useTrainingStore } from '../../providers/Training';
import { Container } from './style';
import { EStatusUploadFile } from '../../components/organisms/Dropzone/interface';
import { ButtonBack } from '../../components/molecules/ButtonBack';

interface IUploadTraining {
  setAnalyzeTraining: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadTraining = (props: IUploadTraining) => {
  const { setAnalyzeTraining } = props;

  const [file, setFile] = useState<File | null>(null);

  const [statusUploadFile, setStatusUploadFile] = useState<EStatusUploadFile>(
    EStatusUploadFile.UPLOAD
  );

  const navigate = useNavigate();
  const { isMobile } = useDevices();
  const { trainingSelected } = useTrainingStore();

  return (
    <Container>
      <ButtonBack onClick={() => setAnalyzeTraining(false)} />
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
      <Dropzone
        statusUploadFile={statusUploadFile}
        setStatusUploadFile={setStatusUploadFile}
        setFile={setFile}
      />
      {/* {stepsUploadFile[statusUploadFile]} */}

      {statusUploadFile === EStatusUploadFile.SUCCESS && (
        <Button
          w={isMobile ? '100%' : 'min-content'}
          bg='primary'
          color='white'
          size='lg'
          mt={4}
          _hover={{ backgroundColor: 'primary90' }}
          onClick={() =>
            navigate('/analise-treino', {
              state: { file: file },
            })
          }
        >
          Iniciar analise do treino
        </Button>
      )}
      <Box h={4} />
    </Container>
  );
};

export { UploadTraining };
