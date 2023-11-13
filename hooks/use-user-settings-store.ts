import { create } from "zustand";

export type UserSettingsType = "my-account" | "customization" | "appearance" | "accessibility";

interface UserSettingsData {}

interface UserSettingsStore {
  type: UserSettingsType | null;
  data: UserSettingsData;
  isOpen: boolean;
  onOpen: (type: UserSettingsType, data?: UserSettingsData) => void;
  onClose: () => void;
}

export const useUserSettings = create<UserSettingsStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
