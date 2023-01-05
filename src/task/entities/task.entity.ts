import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status { 
    UNASSIGNED = 'Unassigned',
    ASSIGNED = 'Assigned',
    TO_DO = 'ToDo',
    IN_PROGRESS = 'InProgrss',
    DONE = 'Done',
    CLOSED = 'Closed'
  }

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({nullable:true,unique:true})
    description : string;

    @Column({nullable:false,unique:false})
    dueDate : string;

    @ManyToOne(()=> User,(user)=> user.tasksAssignedByMe,{cascade:false,eager : true,nullable : true})
    @JoinColumn()
    assignee : User;

    @Column({
        name : 'status',
        type : "enum",
        enum : Status,
        default : Status.UNASSIGNED
    })
    status : Status;

    @ManyToOne(()=> User,(user) => user.tasks, {cascade : false,eager:true,nullable:true})
    @JoinColumn()
    assignor : User;

    @ManyToOne(()=>User, user=>user.tasksCreatedByMe,{cascade:false,eager:true,nullable:false})
    @JoinColumn()
    createdBy : User;
}