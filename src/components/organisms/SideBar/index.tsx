import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { PNG } from '../../../assets/png';
import ContentGoogle from './mediaPipe';
import ContentOpenCV from './opencv';
import { DrawerContent } from './styles';

interface ISideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = (props: ISideBarProps) => {
  const { isOpen, onClose } = props;

  return (
    <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mt={2} />
        <DrawerHeader>Configurações</DrawerHeader>
        <DrawerBody>
          <Divider my={2} />
          <Tabs variant='unstyled' colorScheme='green'>
            <TabList gap={4}>
              <Tab
                _selected={{ bg: 'primary10', border: '2px solid #C0CEFF' }}
                borderRadius={8}
              >
                <Image src={PNG.GoogleLogo} h={8} />
              </Tab>
              <Tab
                _selected={{ bg: 'primary10', border: '2px solid #C0CEFF' }}
                borderRadius={8}
              >
                <Image src={PNG.OpenCVLogo} h={8} />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ContentGoogle />
              </TabPanel>
              <TabPanel>
                <ContentOpenCV />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
