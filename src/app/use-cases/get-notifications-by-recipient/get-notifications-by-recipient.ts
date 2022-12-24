import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification/notification.entity';

interface GetNotificationsByRecipientRequest {
  recipientId: string;
}

interface GetNotificationsByRecipientResponse {
  notifications: Notification[];
}

@Injectable()
export class GetNotificationsByRecipientUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: GetNotificationsByRecipientRequest): Promise<GetNotificationsByRecipientResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
