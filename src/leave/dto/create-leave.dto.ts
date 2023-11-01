import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class CreateLeaveDto {
  @IsNotEmpty()
  @IsString()
  LeaveType: string;
  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  AppliedDate: Date;
  @IsEmail({}, { each: true })
  NotifyPersons: [string];
  @IsString()
  @IsNotEmpty()
  Reason: string;
  @IsString()
  @IsNotEmpty()
  EmployId: string;
}
