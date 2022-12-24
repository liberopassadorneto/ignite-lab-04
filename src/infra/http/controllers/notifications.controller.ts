import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotificationUseCase } from '@app/use-cases/send-notification/send-notification';
import { NotificationViewModel } from '@infra/http/view-models/notification-view-model';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification/cancel-notification';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification/read-notification';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification/unread-notification';
import { GetNotificationsByRecipientUseCase } from '@app/use-cases/get-notifications-by-recipient/get-notifications-by-recipient';
import { CountNotificationsByRecipientUseCase } from '@app/use-cases/count-notifications-by-recipient/count-notifications-by-recipient';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countNotificationsByRecipientUseCase: CountNotificationsByRecipientUseCase,
    private getNotificationsByRecipientUseCase: GetNotificationsByRecipientUseCase,
  ) {}

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId,
    });
  }

  @Get('count/:recipientId')
  async countByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countNotificationsByRecipientUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get(':recipientId')
  async getByRecipientId(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getNotificationsByRecipientUseCase.execute({
        recipientId,
      });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotificationUseCase.execute({
      notificationId,
    });
  }

  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
