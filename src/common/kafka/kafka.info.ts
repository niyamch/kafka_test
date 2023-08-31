import { ConfigService } from '@nestjs/config';
import { BROKER_URL } from '../constants';

export function getKafkaInfo(configService: ConfigService, awsSecrets) {
  if (awsSecrets) {
    return {
      brokerUrl: JSON.parse(awsSecrets.SecretString).BROKER_URL,
      kafkaApiKey: JSON.parse(awsSecrets.SecretString).KAFKA_API_KEY,
      kafkaApiSecret: JSON.parse(awsSecrets.SecretString).KAFKA_API_SECRET,
    };
  }

  return {
    brokerUrl: configService.get<string>(BROKER_URL),
  };
}
