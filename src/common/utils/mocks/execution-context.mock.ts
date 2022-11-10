import { mockedArgumentsHost } from './arguments-host.mock';

export const mockedExecutionContext = {
  ...mockedArgumentsHost,
  getClass: jest.fn(),
  getHandler: jest.fn(),
};
