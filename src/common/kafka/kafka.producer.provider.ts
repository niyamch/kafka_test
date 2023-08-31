import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getkafkaProviderConfigurations } from './kafka.producer.config';
import { getAwsSecretsIfNecessary } from '../aws-secrets';
import { getKafkaInfo } from './kafka.info';
import { KAFKA_PRODUCER_SERVICE } from '../constants';

export const KafkaProducerProvider = {
  provide: KAFKA_PRODUCER_SERVICE,
  useFactory: async (configService: ConfigService) => {
    const awsSecret = await getAwsSecretsIfNecessary(configService);

    const kafkaInfo = getKafkaInfo(configService, awsSecret);

    return ClientProxyFactory.create(
      await getkafkaProviderConfigurations(kafkaInfo),
    );
  },

  inject: [ConfigService],
};
