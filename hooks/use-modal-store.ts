import { create } from "zustand";

export type ModalType = "share-thread" | "sign-out-conf" | "sign-in-req" | "delete-thread-conf" | "share-reply";

interface ModalData {
  shareThread?: { threadId: string };
  shareReply?: { threadId: string; replyId: string };
  deleteThreadConf?: { threadId: string; redirectToHome: boolean };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
