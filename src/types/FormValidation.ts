export interface FormValidation {
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}
