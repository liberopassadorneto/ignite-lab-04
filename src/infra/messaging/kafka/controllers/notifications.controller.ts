import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices/decorators';
import { SendNotificationUseCase } from '@app/use-cases/send-notification/send-notification';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
