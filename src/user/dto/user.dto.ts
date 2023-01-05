import { Task } from "src/task/entities/task.entity";

export class UserDto {
    emailId : string;
    password : string;
    role : string;
    tasks : Task[];
    tasksAssignedByMe : Task[];
    tasksCreatedByMe : Task[];
}