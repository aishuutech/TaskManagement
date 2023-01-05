import { Body, Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { Request,Response } from 'express';
import { LoginDto } from './auth.dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ) {}

    private logger = new Logger('AuthController');

    @Post('login')
    async login(@Req() request: Request,@Body() loginDto:LoginDto) {
        console.log("With in auth controller")
        const res = await this.authService.login(loginDto);
        console.log(res)
        return res;
    }

}
