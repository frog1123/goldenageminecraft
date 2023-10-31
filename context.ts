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

const MyContext = createContext<ContextType | undefined>(undefined);

export default MyContext;
