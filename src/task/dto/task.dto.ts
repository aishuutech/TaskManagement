import { User } from "src/user/entities/user.entity";
import { Status } from "../entities/task.entity";

export class TaskDto {
    description : string;
    dueDate : string;
    assignee : User;
    status : Status;
    assignor : User;
    createdBy : User;
}