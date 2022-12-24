import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountNotificationsByRecipientUseCase } from '@app/use-cases/count-notifications-by-recipient/count-notifications-by-recipient';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Notifications By RecipientId', () => {
  it('should be able to count notifications by recipientId', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const countNotificationsByRecipientUseCase =
      new CountNotificationsByRecipientUseCase(inMemoryNotificationsRepository);

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

    const { count } = await countNotificationsByRecipientUseCase.execute({
      recipientId: 'recipient-01',
    });

    expect(count).toEqual(2);
  });
});
