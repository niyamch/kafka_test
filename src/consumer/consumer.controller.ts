import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  @EventPattern(`users`)
  async consume(
    @Payload() data: Record<string, any>,
    @Ctx() context: KafkaContext,
  ) {
    console.log(data);
    console.log(context);
  }
}
