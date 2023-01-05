import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => {
            const options: JwtModuleOptions = {
              secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            };
            if (configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')) {
              options.signOptions = {
                expiresIn: configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'),
              };
            }
            return options;
          },
          inject: [ConfigService],
    }),
    UserModule],
    controllers:[AuthController],
    providers:[AuthService,UserService,JwtService]
})
export class AuthModule {}
