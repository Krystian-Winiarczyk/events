import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => {
    return {
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: appConfig().jwtExpires + 's' },
    };
  },
};
