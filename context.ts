import { createContext, Dispatch, SetStateAction } from "react";
import { CurrentUserType } from "./types";

export interface ContextData {
  currentUser: CurrentUserType | null;
  deletedThread: {
    id: string | null;
  };
  mobileUserSettingsNavOpen: boolean;
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
    },
    mobileUserSettingsNavOpen: false
  },
  setValue: () => {}
});
