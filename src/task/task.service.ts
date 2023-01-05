import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Status, Task } from './entities/task.entity';

@Injectable()
export class TaskService {
    constructor(
    @InjectRepository(Task) private taskRepository : Repository<Task>,
    private readonly userServie : UserService
    ) {}

    public async create(taskDto : TaskDto, userId:string) : Promise<Task> {
        const user = await this.userServie.findOne(userId);
        const data = await this.taskRepository.create(taskDto);
        data.createdBy = user;
        const task = await this.taskRepository.save(data);
        return task;
    }

    public async getAll() : Promise<Task[]> {
        const tasks = await this.taskRepository.find();
        return tasks;
    }

    public async findOne(id:string):Promise<Task> {
        console.log("With in userservice at findONe",id)
        const task = await this.taskRepository.findOne({
            where : {
                id
            }
        });
        return task;
    }

    public async update(id:string,updateTaskDto : UpdateTaskDto) : Promise<Task> {
        console.log("With in update at taskService",id,updateTaskDto)
        updateTaskDto.id = id;
        const task = await this.taskRepository.preload({
            id:updateTaskDto.id,
            ...updateTaskDto
        });

        if(!task) {
            throw new NotFoundException(`Task ${updateTaskDto.id} is not found`);
        }

        return await this.taskRepository.save(task);
    }

    public async assignTask(assigneeId : string,assignorId : string,id : string)  {
        const assignee = await this.userServie.findOne(assigneeId);
        const assignor = await this.userServie.findOne(assignorId);
        const task = await this.taskRepository.update({id}, {
            assignee : assignee,
            assignor : assignor,
            status : Status.ASSIGNED,
        });

        return task;
    }

    public async createTasks(taskDto:TaskDto[],userId : string):Promise<Task[]> {
        const user = await this.userServie.findOne(userId);
        await taskDto.forEach(async (task) => {
            task.createdBy=user;
        })
        const data = await this.taskRepository.create(taskDto);
        const tasks = await this.taskRepository.save(data);
        return tasks;
    }
}