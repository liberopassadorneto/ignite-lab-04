import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const sendNotification = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'Example content',
      category: 'example-category',
    });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
