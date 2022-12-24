import { Module } from '@nestjs/common';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { NotificationsController } from '@infra/messaging/kafka/controllers/notifications.controller';
import { SendNotificationUseCase } from '@app/use-cases/send-notification/send-notification';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotificationUseCase],
  controllers: [NotificationsController],
})
export class MessagingModule {}
