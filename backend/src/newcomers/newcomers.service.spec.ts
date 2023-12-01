import { Test, TestingModule } from '@nestjs/testing';
import { NewcomersService } from './newcomers.service';

describe('NewcomersService', () => {
  let service: NewcomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewcomersService],
    }).compile();

    service = module.get<NewcomersService>(NewcomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
