import { Box, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { LoadingAnalytics } from '../../components/organisms/LoadingAnalytics';

const AnalyzeTraining = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return isLoading ? (
    <Flex>
      <LoadingAnalytics />
    </Flex>
  ) : (
    <Flex> conteúdo</Flex>
  );
};

export { AnalyzeTraining };
