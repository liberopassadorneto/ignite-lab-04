import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { MessagingModule } from '@infra/messaging/messaging.module';

@Module({
  imports: [DatabaseModule, HttpModule, MessagingModule],
})
export class AppModule {}
