export const mockedJson = jest.fn();

export const mockedStatus = jest.fn().mockImplementation(() => ({
  json: mockedJson,
}));

export const mockedGetResponse = jest.fn().mockImplementation(() => ({
  status: mockedStatus,
}));

export const mockedGetRequest = jest.fn();

export const mockedGetNext = jest.fn();

export const mockedSwitchToHttp = jest.fn().mockImplementation(() => ({
  getRequest: mockedGetRequest,
  getResponse: mockedGetResponse,
  getNext: mockedGetNext,
}));

export const mockedArgumentsHost = {
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: mockedSwitchToHttp,
  switchToWs: jest.fn(),
  getType: jest.fn(),
};
