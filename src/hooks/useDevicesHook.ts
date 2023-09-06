import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from '../utils/constants';
import useWindowDimensions from './windowDimesionHook';

interface IUseDevices {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useDevices(): IUseDevices {
  const { width } = useWindowDimensions();
  const isMobile = width <= BREAKPOINT_MOBILE;
  const isTablet = width > BREAKPOINT_MOBILE && width <= BREAKPOINT_TABLET;
  const isDesktop = width > BREAKPOINT_TABLET;

  return { isMobile, isTablet, isDesktop };
}

export default useDevices;
