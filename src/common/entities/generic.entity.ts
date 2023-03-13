import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Defines abstract class for generic entity of T.
 *
 * @usageNotes
 * The generic entity contains attribute:
 * - `createdAt`: The creation time of entity
 * - `updatedAt`: The last updation time of entity
 */
export abstract class GenericEntity<T> {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The constructor.
   *
   * @param partial The partial object of T
   */
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
