export function getKafkaOptions(kafkaInfo) {
  if (kafkaInfo.kafkaApiKey && kafkaInfo.kafkaApiSecret) {
    return {
      client: {
        brokers: [kafkaInfo.brokerUrl],
        ssl: false,
        sasl: getSasl(kafkaInfo),
      },
      consumer: {
        groupId: 'kafka_tutorial',
        allowAutoTopicCreation: true,
      },
      producer: {
        allowAutoTopicCreation: true,
        transactionTimeout: 3000,
      },
    };
  } else {
    return {
      client: {
        brokers: [kafkaInfo.brokerUrl],
      },
      consumer: {
        allowAutoTopicCreation: true,
      },
      producer: {
        allowAutoTopicCreation: true,
        transactionTimeout: 3000,
      },
    };
  }
}

function getSasl(kafkaInfo) {
  if (kafkaInfo.kafkaApiKey && kafkaInfo.kafkaApiSecret) {
    return {
      username: kafkaInfo.kafkaApiKey,
      password: kafkaInfo.kafkaApiSecret,
      mechanism: 'plain',
    };
  }
  return {
    mechanism: 'plain',
  };
}
