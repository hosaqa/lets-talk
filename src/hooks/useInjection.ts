import { useContext } from 'react';
import { interfaces } from 'inversify';

import { ContainerContext } from '../providers/DIContainerProvider';

export const useInjection = <T>(identifier: interfaces.ServiceIdentifier<T>) => {
  const container = useContext(ContainerContext);

  return container.get<T>(identifier);
};