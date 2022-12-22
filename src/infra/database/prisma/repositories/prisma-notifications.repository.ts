import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { PrismaNotificationMapper } from '@infra/database/prisma/mapper/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: rawNotification,
    });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
