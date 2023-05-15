import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Jwt } from 'src/constants/Jwt';
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {JwtRefreshStrategy} from "./strategy/jwt-refresh.strategy";
import {jwtConfig} from "../../config/jwt.config";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
