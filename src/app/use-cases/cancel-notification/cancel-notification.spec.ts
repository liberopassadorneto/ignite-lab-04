import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotificationUseCase } from './cancel-notification';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/notification/content';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('Example content'),
      category: 'example-category',
    });

    await inMemoryNotificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    await expect(
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
