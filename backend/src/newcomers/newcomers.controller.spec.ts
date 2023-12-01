import { Test, TestingModule } from '@nestjs/testing';
import { NewcomersController } from './newcomers.controller';

describe('NewcomersController', () => {
  let controller: NewcomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewcomersController],
    }).compile();

    controller = module.get<NewcomersController>(NewcomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
