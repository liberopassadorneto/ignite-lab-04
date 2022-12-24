import { Notification } from './notification.entity';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a Notification', () => {
    const notification = new Notification({
      content: new Content('Example content'),
      category: 'example-category',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
