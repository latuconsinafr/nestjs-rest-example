/**
 * Defines the base shape of validation error response type.
 *
 * @usageNotes
 * The Base Validation Error Response contains attribute:
 * - `property`: The property which is fail to validate
 * - `constraints`: The constraint(s) of property which is fail to validate
 */
export interface ValidationErrors {
  property: string;
  constraints: string[] | ValidationErrors[];
}
