import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_PRODUCER_SERVICE } from '../common/constants';

describe('ProducerController', () => {
  let controller: ProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([{ name: KAFKA_PRODUCER_SERVICE }])],
      controllers: [ProducerController],
      providers: [],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
