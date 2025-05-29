import { createContext } from 'react';

export type DeviceContextType = { isMobile: boolean };
export const DeviceContext = createContext<DeviceContextType>({ isMobile: false });
