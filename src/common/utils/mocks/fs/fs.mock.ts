// * Fs cannot hard mocked in unit test, @see {@link https://github.com/ranisalt/node-argon2/issues/282}
// * Instead replace jest.mock('fs') with jest.spyOn inside tests
// export const mockedFs = {
//   existsSync: jest.fn(),
//   mkdirSync: jest.fn(),
//   createReadStream: jest.fn(),
// };
