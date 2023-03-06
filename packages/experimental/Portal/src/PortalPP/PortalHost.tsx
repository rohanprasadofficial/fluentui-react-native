import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import type { PortalManagerMethods } from './PortalManager';
import PortalManager from './PortalManager';

type Props = {
  children: React.ReactNode;
};

type Operation =
  | { type: 'mount'; key: number; children: React.ReactNode }
  | { type: 'update'; key: number; children: React.ReactNode }
  | { type: 'unmount'; key: number };

export type PortalMethods = {
  mount: (children: React.ReactNode) => number;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
};

export const PortalContext = React.createContext<PortalMethods | null>(null);

export const PortalHost = ({ children }: Props) => {
  let { current: nextKey } = React.useRef<number>(0);
  const { current: queue } = React.useRef<Operation[]>([]);
  let { current: manager } = React.useRef<PortalManagerMethods | null | undefined>();

  React.useEffect(() => {
    while (queue.length && manager) {
      const action = queue.pop();
      if (action) {
        // eslint-disable-next-line default-case
        switch (action.type) {
          case 'mount':
            manager.mount(action.key, action.children);
            break;
          case 'update':
            manager.update(action.key, action.children);
            break;
          case 'unmount':
            manager.unmount(action.key);
            break;
        }
      }
    }
  }, [manager, queue]);

  const setManager = (newManager: PortalManagerMethods | undefined | null) => {
    manager = newManager;
  };

  const mount = (children: React.ReactNode) => {
    const key = nextKey++;

    if (manager) {
      manager.mount(key, children);
    } else {
      queue.push({ type: 'mount', key, children });
    }

    return key;
  };

  const update = (key: number, children: React.ReactNode) => {
    if (manager) {
      manager.update(key, children);
    } else {
      const op: Operation = { type: 'mount', key, children };
      const index = queue.findIndex((o) => o.type === 'mount' || (o.type === 'update' && o.key === key));

      if (index > -1) {
        queue[index] = op;
      } else {
        queue.push(op);
      }
    }
  };

  const unmount = (key: number) => {
    if (manager) {
      manager.unmount(key);
    } else {
      queue.push({ type: 'unmount', key });
    }
  };

  return (
    <PortalContext.Provider
      value={{
        mount,
        update,
        unmount,
      }}
    >
      {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
      <View style={styles.container} collapsable={false} pointerEvents="box-none">
        {children}
      </View>
      <PortalManager ref={setManager} />
    </PortalContext.Provider>
  );
};

PortalHost.displayName = 'Portal.Host';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PortalHost;
