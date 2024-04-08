export interface FormVersion {
  order: {
    title: string;
    titleDescription: string;
  };
  consultation: {
    title: string;
    titleDescription: string;
  };
  sendMessage: {
    title: string;
    titleDescription?: string;
  };
}
