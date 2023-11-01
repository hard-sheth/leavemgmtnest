// import { PartialType } from '@nestjs/mapped-types';
// import { CreateLeaveDto } from './create-leave.dto';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateLeaveDto {
  //  extends PartialType(CreateLeaveDto)
  @IsNotEmpty()
  LeaveId: string;
  @IsOptional()
  LeaveType?: string;
  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  AppliedDate: Date;
  @IsEmail({}, { each: true })
  NotifyPersons: [string];
  @IsString()
  @IsOptional()
  Reason: string;
  @IsString()
  @IsOptional()
  EmployId: string;
}

export class FilterLeaveDto {
  LeaveId?: string;
  LeaveType?: string;
  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  AppliedDate: Date;
  @IsEmail({}, { each: true })
  NotifyPersons: [string];
  @IsString()
  @IsOptional()
  Reason: string;
  @IsString()
  @IsOptional()
  EmployId: string;
}
