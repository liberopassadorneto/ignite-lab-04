import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { Injectable } from '@nestjs/common';

interface CountNotificationsByRecipientRequest {
  recipientId: string;
}

interface CountNotificationsByRecipientResponse {
  count: number;
}

@Injectable()
export class CountNotificationsByRecipientUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: CountNotificationsByRecipientRequest): Promise<CountNotificationsByRecipientResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
