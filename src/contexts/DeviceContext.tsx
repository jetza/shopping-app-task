/* @refresh reset */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type DeviceContextType = { isMobile: boolean };

const DeviceContext = createContext<DeviceContextType>({ isMobile: false });

function useDevice() {
  return useContext(DeviceContext);
}

function DeviceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 800 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <DeviceContext.Provider value={{ isMobile }}>{children}</DeviceContext.Provider>;
}

export { useDevice, DeviceProvider };
