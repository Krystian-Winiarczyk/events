import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import appConfig from 'src/config/app.config';
import {UsersService} from "../../users/service/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwtSecret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.usersService.findOneBy({ where: { email }, relations: ['profiles'] });

    if (!user) {
      throw new UnauthorizedException();
    }

    return { ...user };
  }
}
