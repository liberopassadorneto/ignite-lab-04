import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification/notification.entity';
import { PrismaNotificationMapper } from '@infra/database/prisma/mapper/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map((notification) => {
      return PrismaNotificationMapper.toDomain(notification);
    });

    // or

    // return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async create(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: rawNotification,
    });
  }

  async save(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: rawNotification.id,
      },
      data: rawNotification,
    });
  }
}
