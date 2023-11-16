import { create } from "zustand";

export type UserSettingsType = "my-account" | "customization" | "appearance" | "accessibility" | "whats-new" | "premium" | "danger";

interface UserSettingsData {}

interface UserSettingsStore {
  type: UserSettingsType | null;
  data: UserSettingsData;
  isOpen: boolean;
  onOpen: (type: UserSettingsType, data?: UserSettingsData) => void;
  onClose: () => void;
}

export const useUserSettings = create<UserSettingsStore>(set => ({
  type: "my-account", // default
  data: {},
  isOpen: true, // default
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
