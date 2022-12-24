import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification/unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unNotification = new UnreadNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    await expect(
      unNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
