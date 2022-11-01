export interface ErrorValidationMessageInterface {
  property: string;
  constraints: string[];
}

export interface ErrorMessageInterface {
  error?: string;
  message?: string | ErrorValidationMessageInterface[];
  detail?: string;
  help?: string;
}
