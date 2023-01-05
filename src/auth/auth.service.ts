import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LoginDto } from './auth.dto/login.dto';
import { LoginResponse } from './auth.dto/login.response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private userService : UserService,
        private configService : ConfigService
        ) {}

        private logger = new Logger('AuthService')

    public async login(loginDto:LoginDto) {
        console.log("With in login at authservie");
        const email = loginDto.email;
        const user = await this.userService.findUserByEmail(email);
        console.log("UserDEtails",user.emailId);
        const {password,...result} = user;
        const payload = {
            email : user.emailId,
            sub: user.id,
            role: user.role
        }
        const accessToken = await this.jwtService.sign(payload,{ secret:'7AnEd5epXmdaJfUrokkQ', expiresIn:'24h'})
        return {
            accessToken : accessToken,
            result
        };
    }

    public async validateToken(token : string) {
        try{
            token = token.trim();
            const claims = this.jwtService.verify(token,{
                secret:'7AnEd5epXmdaJfUrokkQ'
            })
            const user = await this.userService.findUserByEmail(claims.email);
            if(!user) {
                return {
                    status: 401,
                    userId: null,
                    email: null,
                    role: null,
                    error: ['Unauthorized']
                };
            }
            else{
                return {
                    status: 200,
                    userId: user.id,
                    email: user.emailId,
                    role: user.role,
                    error: null
                };
            }
        }
        catch (TokenExpiredError) {
            return {
                status: 401,
                userId: null,
                email: null,
                role: null,
                error: ['Unauthorized']
            };
        }
    }
}
