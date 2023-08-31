import { Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_PRODUCER_SERVICE } from '../common/constants';

@Controller('producer')
export class ProducerController {
  constructor(
    @Inject(KAFKA_PRODUCER_SERVICE) private clientKafka: ClientKafka,
  ) {}

  @Post()
  async send() {
    this.clientKafka.emit('Niya_test', {
      key: '18',
      value: 'testing',
    });
  }
}
