import { localFileUploadConfig } from '../../file-upload/local-file-upload.config';
import * as fs from 'fs';
import { mockedFs } from '../../../common/utils/mocks/fs/fs.mock';

describe(`when ${localFileUploadConfig.name} is registered`, () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => localFileUploadConfig()).toThrow(Error);
  });

  it('should call the mkdirSync fs method when the upload directory does not exist', () => {
    const env = {
      LOCAL_FILE_UPLOAD_DEST: './uploads',
    };

    process.env.LOCAL_FILE_UPLOAD_DEST = env.LOCAL_FILE_UPLOAD_DEST;

    mockedFs.existsSync.mockReturnValueOnce(false);
    (fs.existsSync as jest.Mock) = mockedFs.existsSync;
    (fs.mkdirSync as jest.Mock) = mockedFs.mkdirSync;

    localFileUploadConfig();

    expect(mockedFs.mkdirSync).toBeCalledTimes(1);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      LOCAL_FILE_UPLOAD_DEST: './uploads',
    };

    const parsedEnv = {
      dest: './uploads',
    };

    process.env.LOCAL_FILE_UPLOAD_DEST = env.LOCAL_FILE_UPLOAD_DEST;

    expect(localFileUploadConfig()).toMatchObject(parsedEnv);
  });
});
