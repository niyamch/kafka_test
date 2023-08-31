import { Transport } from '@nestjs/microservices';
import { getKafkaOptions } from './kafka.options';

export async function getkafkaConsumerConfigurations(kafkaInfo) {
  return {
    transport: Transport.KAFKA,
    options: await getKafkaOptions(kafkaInfo),
  };
}
