import { ClientKafka } from '@nestjs/microservices';
import { getKafkaOptions } from './kafka.options';

export async function getkafkaProviderConfigurations(kafkaInfo) {
  return {
    customClass: ClientKafka,
    options: await getKafkaOptions(kafkaInfo),
  };
}
