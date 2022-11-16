import { UnprocessableEntityException } from '../../../exceptions/http.exceptions';
import { toNumber } from '../../transformers/to-number.transformer';

describe('when toNumber is called', () => {
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
