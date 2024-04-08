export interface ModalInfo {
  isOpen: boolean;
  onClose: () => void;
  text?: {
    title: string;
    description: string;
  };
}
