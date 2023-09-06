import { useEffect, useMemo, useState } from 'react';
import useDevices from './useDevicesHook';

interface IUseMenu {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function useMenu(): IUseMenu {
  const { isMobile } = useDevices();

  const handleInitialState = (): boolean => {
    return isMobile ? true : false;
  };

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('isOpenMenu');
    return storedValue ? JSON.parse(storedValue) : handleInitialState();
  });

  useEffect(() => {
    if (!isMobile) setIsOpenMenu(false);
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem('isOpenMenu', JSON.stringify(isOpenMenu));
  }, [isOpenMenu]);

  return { isOpenMenu, setIsOpenMenu };
}

export default useMenu;
