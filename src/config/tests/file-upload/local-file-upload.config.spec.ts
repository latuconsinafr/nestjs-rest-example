import { localFileUploadConfig } from '../../file-upload/local-file-upload.config';
import * as fs from 'fs';

describe('when localFileUploadConfig is registered', () => {
  const env = process.env;
  let existsSyncSpy: jest.SpyInstance<any>;
  let mkdirSyncSpy: jest.SpyInstance<any>;

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

    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');

    existsSyncSpy.mockReturnValueOnce(false);
    mkdirSyncSpy.mockImplementationOnce(() => jest.fn());

    localFileUploadConfig();

    expect(mkdirSyncSpy).toBeCalledTimes(1);
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
