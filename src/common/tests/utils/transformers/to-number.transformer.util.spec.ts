import { UnprocessableEntityException } from '../../../exceptions/unprocessable-entity.exception';
import { toNumber } from '../../../utils/transformers/to-number.transformer.util';

describe(`when ${toNumber.name} is called`, () => {
  describe('and the incoming value could be parsed into number', () => {
    it('should return the number value', () => {
      expect(toNumber('200')).toBe(200);
    });
  });

  describe('and the incoming value could not be parsed into number', () => {
    it('should throw error', () => {
      expect(() => toNumber('asdx')).toThrow(UnprocessableEntityException);
    });
  });
});
