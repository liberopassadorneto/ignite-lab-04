import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
