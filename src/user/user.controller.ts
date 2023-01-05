import { Body, Controller, Get, Headers, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { get } from 'http';
import { AuthService } from 'src/auth/auth.service';


@Controller('user')
export class UserController {
    constructor(
        private userService : UserService,
        private authService : AuthService
    ) {}
    private logger = new Logger('UserController');


    @Post('create')
    async createUser(@Req() request:Request,@Body() userDto: UserDto): Promise<User> {
        console.log("With in CReate User",userDto)
        return await this.userService.create(userDto);
    }

    @Get('users')
    async getUsers(@Req() request : Request,@Headers('Authorization')autorization):Promise<User[]>{
        const token = autorization.replace('Bearer ','');
        const resp = await this.authService.validateToken(token);
        const respObject = JSON.parse(JSON.stringify(resp));
        this.logger.verbose(`User: ${respObject.email},${respObject.userId}`);
        if(respObject.status === 401) {
            throw new UnauthorizedException();
        }
        return await this.userService.findAll();
    }

    @Get(':id')
    async getUser(@Req() request : Request,@Param() id:string,@Headers('Authorization')autorization):Promise<User> {
        const token = autorization.replace('Bearer ','');
        const resp = await this.authService.validateToken(token);
        const respObject = JSON.parse(JSON.stringify(resp));
        this.logger.verbose(`User: ${respObject.email},${respObject.userId},${respObject.role}`);
        if(respObject.status === 401) {
            throw new UnauthorizedException();
        }
        const obj = JSON.parse(JSON.stringify(id));
        console.log("With in getUser at userController",obj.id);
        return await this.userService.findOne(obj.id)
    }
}
