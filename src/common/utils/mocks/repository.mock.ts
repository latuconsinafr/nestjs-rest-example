export const mockedSelect = jest.fn().mockReturnThis();
export const mockedInnerJoinAndSelect = jest.fn().mockReturnThis();
export const mockedLeftJoin = jest.fn().mockReturnThis();
export const mockedSkip = jest.fn().mockReturnThis();
export const mockedTake = jest.fn().mockReturnThis();
export const mockedOrderBy = jest.fn().mockReturnThis();
export const mockedWhere = jest.fn().mockReturnThis();
export const mockedAndWhere = jest.fn().mockReturnThis();
export const mockedGetManyAndCount = jest.fn();
export const mockedGetRawMany = jest.fn();
export const mockedGetMany = jest.fn();

export const mockedRepository = {
  find: jest.fn(),
  findAndCount: jest.fn(),
  findBy: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
