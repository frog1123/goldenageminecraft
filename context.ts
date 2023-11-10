import { createContext, Dispatch, SetStateAction } from "react";
import { CurrentUserType } from "./types";

export interface ContextData {
  currentUser: CurrentUserType | null;
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
    currentUser: null,
    deletedThread: {
      id: null
    }
  },
  setValue: () => {}
});
