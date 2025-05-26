import { useContext } from 'react';
import { DeviceContext } from './DeviceContext';
import type { DeviceContextType } from './DeviceContext';

function useDevice(): DeviceContextType {
  return useContext(DeviceContext);
}

export default useDevice;
