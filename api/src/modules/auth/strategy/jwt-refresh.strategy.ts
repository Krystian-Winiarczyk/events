import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import appConfig from 'src/config/app.config';
import { Request } from 'express';
import {UsersService} from "../../users/service/users/users.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: appConfig().jwtRefreshSecret,
    });
  }

  async validate(req: Request, payload: any) {
    const { email } = payload;
    const user = await this.usersService.findOneBy({ where: { email }, relations: ['profiles'] });

    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshToken: string = req
      .get('Authorization')
      .replace('Bearer', '')
      .trim();

    return { ...user, refreshToken };
  }
}
