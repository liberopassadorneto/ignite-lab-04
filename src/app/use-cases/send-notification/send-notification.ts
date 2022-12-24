import { Content } from '../../entities/notification/content';
import { Notification } from '../../entities/notification/notification.entity';
import { NotificationsRepository } from '../../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';

interface SendNotificationsRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    category,
  }: SendNotificationsRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
