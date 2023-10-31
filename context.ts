import { createContext, Dispatch, SetStateAction } from 'react';

export interface ContextData {
  user: {
    id: string | null;
  };
}

type ContextType = {
  data: ContextData;
  setData: Dispatch<SetStateAction<ContextData>>;
};

export const Context = createContext<ContextType | undefined>(undefined);
