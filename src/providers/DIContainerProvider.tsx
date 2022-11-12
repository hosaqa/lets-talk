import React, { createContext } from 'react';
import { container } from '../di/container';

export const ContainerContext = createContext<typeof container>(container);

export const DIContainerProvider = ({ children }: { children: React.ReactNode }) => (
  <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
);
