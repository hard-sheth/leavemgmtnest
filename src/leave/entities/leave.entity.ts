import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { LeaveStatus } from 'src/common/constant';

@Schema({ timestamps: true, versionKey: false })
export class Leave extends Document {
  @Prop({ type: String })
  LeaveType: string;

  @Prop({ type: Date })
  AppliedDate: Date;

  @Prop({ type: [String] })
  NotifyPersons: string[];

  @Prop({ type: String, enum: LeaveStatus, default: LeaveStatus.Pending })
  Status: string;

  @Prop({ type: String })
  Reason: string;

  @Prop({ type: Boolean })
  IsActive: boolean;

  @Prop({ type: Boolean })
  IsPublished: boolean;

  @Prop({ type: Boolean })
  IsDeleted: boolean;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'employes' })
  EmployId: string;

  @Prop({ type: Date, default: Date.now })
  PublishedDate: Date;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
