import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getkafkaConsumerConfigurations } from './common/kafka/kafka.consumer.config';
import { getAwsSecretsIfNecessary } from './common/aws-secrets';
import { ConfigService } from '@nestjs/config';
import { getKafkaInfo } from './common/kafka/kafka.info';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const awsSecret = await getAwsSecretsIfNecessary(configService);

  const kafkaInfo = getKafkaInfo(configService, awsSecret);

  const kafkaMicroserviceOptions =
    await getkafkaConsumerConfigurations(kafkaInfo);

  await app.connectMicroservice(kafkaMicroserviceOptions);
  await app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
