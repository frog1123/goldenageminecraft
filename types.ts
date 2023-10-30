import { Thread, User } from '@prisma/client';

export type ThreadType = Thread & {
  author: UserWithoutEmail;
} & { tags: { id: string; name: string }[] };

export type UserWithoutEmail = Omit<User, 'email'>;

export type UserThreadType = Thread & { tags: { id: string; name: string }[] };

export type ModalType = 'share-thread' | 'sign-out-conf';

export interface ModalData {
  thread?: Thread;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
