/**
 * Defines the custom error validation message interface.
 */
export interface ErrorValidationMessageInterface {
  property: string;
  constraints: string[];
}

/**
 * Defines the error message interface.
 */
export interface ErrorMessageInterface {
  error?: string;
  message?: string | ErrorValidationMessageInterface[];
  detail?: string;
  help?: string;
}
