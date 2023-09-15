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

const ContentGoogle = () => {
  const {
    showDrawLines,
    showSegmentation,
    setNumPose,
    setShowDrawLines,
    setShowSegmentation,
    setMinTrackingConfidence,
    setMinPoseDetectConfidence,
    setMinPosePresenceConfidence,
  } = useMediaPipeStore();

  return (
    <Flex flexDirection='column' gap={8}>
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
        <Select placeholder='Selecione o modelo' w='100%'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>

      <Flex flexDirection='column'>
        <Text fontWeight='bold' display='flex' alignItems='center' mb={2}>
          Número de pontos
        </Text>
        <Flex>
          <Text>1</Text>
          <Slider
            aria-label='slider'
            defaultValue={1}
            min={1}
            max={5}
            step={1}
            mx={4}
            onChange={(value: number) => setNumPose(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>5</Text>
        </Flex>

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
            Confiança nos pontos visíveis
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
              onChange={(value: number) => setMinPosePresenceConfidence(value)}
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

export default ContentGoogle;
