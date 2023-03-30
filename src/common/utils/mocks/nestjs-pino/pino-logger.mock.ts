export const mockedPinoLogger = {
  setContext: jest.fn(),

  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
