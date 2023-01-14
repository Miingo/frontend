import { createContext } from 'react';
import { state } from '../state';
import { useSnapshot } from 'valtio';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const snap = useSnapshot(state);
  const me = snap.users[0];

  return (
    <userContext.Provider value={{ user: me }}>{children}</userContext.Provider>
  );
};
