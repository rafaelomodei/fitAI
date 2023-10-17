import {
  Box,
  Divider,
  Flex,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useMediaPipeStore } from '../../../../providers/MediaPipe';

export const ContentMediaPipe = () => {
  const {
    selfieMode,
    showSegmentation,
    showDrawLines,
    setSelfieMode,
    setShowSegmentation,
    setShowDrawLines,
    setMinTrackingConfidence,
    setMinPoseDetectConfidence,
  } = useMediaPipeStore();

  return (
    <Flex flexDirection='column' gap={8}>
      <Flex mt={4} justifyContent='space-between'>
        <Text fontWeight='bold' display='flex' alignItems='center' mr={4}>
          Inverter câmera
        </Text>
        <Switch
          id='selfieMode'
          colorScheme='telegram'
          isChecked={selfieMode}
          onChange={() => setSelfieMode(!selfieMode)}
        />
      </Flex>

      <Flex mt={4} justifyContent='space-between'>
        <Text fontWeight='bold' display='flex' alignItems='center' mr={4}>
          Desenhar linhas
        </Text>
        <Switch
          id='seguimentação'
          colorScheme='telegram'
          isChecked={showDrawLines}
          onChange={() => setShowDrawLines(!showDrawLines)}
        />
      </Flex>

      <Flex justifyContent='space-between'>
        <Text fontWeight='bold' display='flex' alignItems='center' mr={4}>
          Segmentação
        </Text>
        <Switch
          id='seguimentação'
          isChecked={showSegmentation}
          onChange={() => setShowSegmentation(!showSegmentation)}
        />
      </Flex>

      <Divider />

      <Flex>
        <Text fontWeight='bold' display='flex' alignItems='center' mr={4}>
          Modelo
        </Text>
        <Select placeholder='(lite) Pose landmarker' w='100%' disabled={true}>
          <option value='lite'>(lite) Pose landmarker</option>
        </Select>
      </Flex>

      <Flex flexDirection='column'>
        <Flex flexDirection='column' mt={10}>
          <Text fontWeight='bold' display='flex' alignItems='center' mb={2}>
            Confiança na detecção dos pontos
          </Text>
          <Flex>
            <Text>1%</Text>
            <Slider
              aria-label='slider'
              defaultValue={0.5}
              min={0}
              max={1}
              step={0.1}
              mx={4}
              onChange={(value: number) => setMinPoseDetectConfidence(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>99%</Text>
          </Flex>
        </Flex>

        <Flex flexDirection='column' mt={10}>
          <Text fontWeight='bold' display='flex' alignItems='center' mb={2}>
            Confiança de rastreamento
          </Text>
          <Flex>
            <Text>1%</Text>
            <Slider
              aria-label='slider'
              defaultValue={0.5}
              min={0}
              max={1}
              step={0.1}
              mx={4}
              onChange={(value: number) => setMinTrackingConfidence(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>99%</Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h={8} />
    </Flex>
  );
};
