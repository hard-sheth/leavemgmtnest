import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './entities/leave.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema }]),
    MailModule,
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
