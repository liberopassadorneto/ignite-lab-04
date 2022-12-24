import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotificationUseCase } from '@app/use-cases/send-notification/send-notification';
import { DatabaseModule } from '../database/database.module';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification/unread-notification';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification/read-notification';
import { GetNotificationsByRecipientUseCase } from '@app/use-cases/get-notifications-by-recipient/get-notifications-by-recipient';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification/cancel-notification';
import { CountNotificationsByRecipientUseCase } from '@app/use-cases/count-notifications-by-recipient/count-notifications-by-recipient';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountNotificationsByRecipientUseCase,
    GetNotificationsByRecipientUseCase,
  ],
})
export class HttpModule {}
