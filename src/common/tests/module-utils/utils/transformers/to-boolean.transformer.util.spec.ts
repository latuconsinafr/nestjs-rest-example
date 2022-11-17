import { UnprocessableEntityException } from '../../../../exceptions/unprocessable-entity.exception';
import { toBoolean } from '../../../../module-utils/utils/transformers/to-boolean.transformer.util';

describe('when toBoolean is called', () => {
  describe('and the incoming value could be parsed into boolean', () => {
    it('should return the boolean value', () => {
      expect(toBoolean('true')).toBe(true);
    });
  });

  describe('and the incoming value could not be parsed into boolean', () => {
    it('should throw error', () => {
      expect(() => toBoolean('asdx')).toThrow(UnprocessableEntityException);
    });
  });
});
