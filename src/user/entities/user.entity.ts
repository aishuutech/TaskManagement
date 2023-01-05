import { Task } from "src/task/entities/task.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false,unique:true})
    emailId : string;

    @Column({nullable : false,unique : false})
    password : string;

    @Column({nullable : false,unique : false})
    role : string;

    @OneToMany(()=>Task, task=> task.assignor,{cascade : false,nullable : true})
    @JoinColumn()
    tasks : Task[];

    @OneToMany(()=> Task,task => task.assignee,{cascade : false,nullable : true})
    @JoinColumn()
    tasksAssignedByMe : Task[];

    @OneToMany(()=>Task,task=>task.createdBy,{cascade:false,nullable:true})
    @JoinColumn()
    tasksCreatedByMe : Task[];
}