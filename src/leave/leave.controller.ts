import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { PROTO_SERVICES } from 'src/common/constant';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller()
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @GrpcMethod(PROTO_SERVICES.serviceName, 'CreateLeave')
  create(createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }
  @GrpcMethod(PROTO_SERVICES.serviceName, 'UpdateLeave')
  update(updateLeave: UpdateLeaveDto) {
    return this.leaveService.update(updateLeave);
  }
  @GrpcMethod(PROTO_SERVICES.serviceName, 'FetchSingleLeave')
  findOne(leaveId: string) {
    return this.leaveService.findOne(leaveId);
  }
  @GrpcMethod(PROTO_SERVICES.serviceName, 'FetchAllLeave')
  findAll(leaveId: string) {
    return this.leaveService.findOne(leaveId);
  }
  @GrpcMethod(PROTO_SERVICES.serviceName, 'FilterLeave')
  filterLeave(fitlerPara) {
    return this.leaveService.findWithFilter(fitlerPara);
  }
}
