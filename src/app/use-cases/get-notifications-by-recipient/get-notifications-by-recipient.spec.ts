import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetNotificationsByRecipientUseCase } from '@app/use-cases/get-notifications-by-recipient/get-notifications-by-recipient';

describe('Get Notifications By RecipientId', () => {
  it('should be able to get notifications by recipientId', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const getNotificationsByRecipientUseCase =
      new GetNotificationsByRecipientUseCase(inMemoryNotificationsRepository);

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-01',
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-01',
      }),
    );

    const { notifications } = await getNotificationsByRecipientUseCase.execute({
      recipientId: 'recipient-01',
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-01' }),
        expect.objectContaining({ recipientId: 'recipient-01' }),
      ]),
    );
  });
});
