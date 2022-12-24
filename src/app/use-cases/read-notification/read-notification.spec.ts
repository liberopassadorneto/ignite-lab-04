import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from '@app/use-cases/errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification/read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const readNotification = new ReadNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const readNotification = new ReadNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    await expect(
      readNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
