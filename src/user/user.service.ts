import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User> 
    ) {}
    
    public async create(userDto:UserDto):Promise<User> {
        const data = await this.userRepository.create(userDto);
        const user = await this.userRepository.save(data)
        return user;
    }

    public async findAll():Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    public async findOne(id:string):Promise<User> {
        console.log("With in userservice at findONe",id)
        const user = await this.userRepository.findOne({
            where:{
                id
            }
        });
        console.log(user);
        return user;
    }

    public async findUserByEmail(emailId:string):Promise<User> {
        const user = await this.userRepository.findOne({
            where:{
                emailId
            }
        });
        return user;
    }
}
