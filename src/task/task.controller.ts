import { Body, Controller, Get, Header, Headers, Logger, Param, Patch, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { request, Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AssignTaskDto } from './dto/assignTask.Dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService : TaskService,
        private readonly authService : AuthService,
     ) {}
      private logger = new Logger('TaskController');
      
     @Post('create')
     async createTask(@Req()request : Request,@Headers('Authorization')authorization,@Body()taskDto:TaskDto): Promise<Task> {
      console.log("With in create at TaskController");
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
        return await this.taskService.create(taskDto,respObject.userId);
     }

     @Post('createTasks')
     async createTasks(@Req() request:Request,@Headers('Authorization')authorization,@Body()taskDto:TaskDto[]):Promise<Task[]> {
      console.log("With in create at TaskController");
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
      return await this.taskService.createTasks(taskDto,respObject.userId);
     }

     @Get('tasks')
     async tasks(@Req() request : Request,@Headers('Authorization') authorization) : Promise<Task[]> {
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
        return await this.taskService.getAll();
     }
     
     @Get(':id')
     async task(@Req() request:Request,@Headers('Authorization')authorization,@Param() id : string):Promise<Task> {
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
        const obj = JSON.parse(JSON.stringify(id));
        return await this.taskService.findOne(obj.id);
     }

     @Patch(':id')
     async updateTask(@Req()request:Request,@Headers('Authorization')authorization,@Param()id:string,@Body() updateTaskDto: UpdateTaskDto):Promise<Task> {
      console.log("With in update controller")
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
         const obj = JSON.parse(JSON.stringify(id));
        return await this.taskService.update(obj.id,updateTaskDto);
     }

     @Post('assignTask')
     async assignTask(@Req() request:Request,@Headers('Authorization')authorization,@Body()body:AssignTaskDto) {
      const token = authorization.replace('Bearer ','');
      const resp = await this.authService.validateToken(token);
      const respObject = JSON.parse(JSON.stringify(resp));
      this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
      if(respObject.status === 401) {
          throw new UnauthorizedException();
      }
      const assigneeId = String(respObject.userId);
      const assignorId = body.assignorId;
      const taskId = body.taskId;
        return await this.taskService.assignTask(assigneeId,assignorId,taskId);
     }

}
