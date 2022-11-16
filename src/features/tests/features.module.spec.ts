import { Test } from '@nestjs/testing';
import { FeaturesModule } from '../features.module';

describe('FeaturesModule', () => {
  let featuresModule: FeaturesModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FeaturesModule],
    }).compile();

    featuresModule = moduleRef.get<FeaturesModule>(FeaturesModule);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(featuresModule).toBeDefined();
  });
});
