import { createContext, Dispatch, SetStateAction } from "react";

export interface ContextData {
  currentUser: {
    clerkId: string | null;
    id: string | null;
  };
  deletedThread: {
    id: string | null;
  };
}

type ContextType = {
  value: ContextData;
  setValue: Dispatch<SetStateAction<ContextData>>;
};

export const Context = createContext<ContextType>({
  value: {
    currentUser: {
      clerkId: null,
      id: null
    },
    deletedThread: {
      id: null
    }
  },
  setValue: () => {}
});
