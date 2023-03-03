import type { PortalProps } from './Portal.types';

export const usePortal = (props: PortalProps): PortalProps => {
  const { text = 'Default text', ...rest } = props;
  // write your code here

  return {
    text,
    ...rest,
  };
};
