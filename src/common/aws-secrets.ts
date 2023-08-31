import { ConfigService } from '@nestjs/config';
import { SecretsManager } from 'aws-sdk';
import { AWS_REGION, AWS_SECRET_NAME, NODE_ENV } from './constants';

export async function getAwsSecretsIfNecessary(configService: ConfigService) {
  if (configService.get<string>(NODE_ENV) == 'production') {
    return await getAwsSecrets({
      region: configService.get<string>(AWS_REGION),
      secretName: configService.get<string>(AWS_SECRET_NAME),
    });
  }

  return;
}

async function getAwsSecrets(options) {
  const { region, secretName } = options;

  const client = new SecretsManager({ region });
  const data = await client.getSecretValue({ SecretId: secretName }).promise();

  return data;
}
