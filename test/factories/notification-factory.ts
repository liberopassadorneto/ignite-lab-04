import {
  Notification,
  NotificationProps,
} from '@app/entities/notification/notification.entity';
import { Content } from '@app/entities/notification/content';

type OverrideProps = Partial<NotificationProps>;

export function makeNotification(override: OverrideProps = {}): Notification {
  return new Notification({
    recipientId: 'recipient-id-example',
    content: new Content('Example content'),
    category: 'example-category',
    ...override,
  });
}
