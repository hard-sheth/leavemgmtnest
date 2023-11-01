import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Leave } from './entities/leave.entity';
import mongoose, { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { FilterLeaveDto, UpdateLeaveDto } from './dto/update-leave.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<Leave>,
    private mailSend: MailService,
  ) {}
  async create(createLeaveDto: CreateLeaveDto) {
    try {
      const createNewLeave = new this.leaveModel(createLeaveDto);
      const saveLeave = await createNewLeave.save();
      // await this.mailSend.sendEmail();
      return { data: saveLeave };
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong Happened To Save Leave');
    }
  }
  async update(updateLeave: UpdateLeaveDto) {
    try {
      console.log(updateLeave);
      const findLeave = await this.leaveModel.find(
        {
          _id: new mongoose.Types.ObjectId(updateLeave.LeaveId),
        },
        { _id: 1 },
      );
      if (findLeave && findLeave.length === 0) {
        return new RpcException({
          code: 404,
          message: `Sorry! This Leave Not Found`,
        });
      }
      const updateLeaveObj = {};
      for (const [key, val] of Object.entries(updateLeave)) {
        if (key !== 'LeaveId' && key !== 'EmployId') {
          updateLeaveObj[key] = val;
        }
      }
      const updateFoundLeave = await this.leaveModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(updateLeave.LeaveId),
        },
        { $set: { ...updateLeaveObj } },
        { upsert: true, returnOriginal: false },
      );
      return { data: updateFoundLeave };
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong Happened To Save Leave');
    }
  }
  async findOne(leaveId: string) {
    try {
      const findLeave = await this.leaveModel.find(
        {
          _id: new mongoose.Types.ObjectId(leaveId),
        },
        { _id: 1 },
      );
      if (findLeave && findLeave.length === 0) {
        return new RpcException({
          code: 404,
          message: `Sorry! This Leave Not Found`,
        });
      }
      return { data: findLeave };
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong Happened To Save Leave');
    }
  }
  async findAll(leaveId: string) {
    try {
      const findLeave = await this.leaveModel.find(
        {
          _id: new mongoose.Types.ObjectId(leaveId),
        },
        { _id: 1 },
      );
      if (findLeave && findLeave.length === 0) {
        return new RpcException({
          code: 404,
          message: `Sorry! This Leave Not Found`,
        });
      }
      return { data: findLeave };
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong Happened To Save Leave');
    }
  }
  async findWithFilter(leaveFilter: FilterLeaveDto) {
    try {
      const fiterLeaveObj = {};
      for (const [key, val] of Object.entries(leaveFilter)) {
        if (key === 'LeaveId') {
          fiterLeaveObj['_id'] = new mongoose.Types.ObjectId(val);
        } else if (key === 'EmployId') {
          fiterLeaveObj['EmployId'] = new mongoose.Types.ObjectId(val);
        } else {
          fiterLeaveObj[key] = val;
        }
      }
      const findLeave = await this.leaveModel.find(
        {
          // ...leave
        },
        { createdAt: 0, updatedAt: 0, PublishedDate: 0 },
      );
      if (findLeave && findLeave.length === 0) {
        return new RpcException({
          code: 404,
          message: `Sorry! This Leave Not Found`,
        });
      }
      return { data: findLeave };
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong Happened To Save Leave');
    }
  }
}
