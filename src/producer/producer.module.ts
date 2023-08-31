import { Module } from '@nestjs/common';
import { KafkaProducerProvider } from '../common/kafka/kafka.producer.provider';
import { ProducerController } from './producer.controller';
import { ConfigService } from 'aws-sdk';

@Module({
  imports: [ConfigService],
  controllers: [ProducerController],
  providers: [KafkaProducerProvider],
})
export class ProducerModule {}
