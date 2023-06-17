import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { AppModes } from '../constants/AppModes';
import {Pet} from "../typeorm/entities/Pet";
import {UserProfile} from "../typeorm/entities/UserProfile";
import {Event} from "../typeorm/entities/Event";
import {Competition} from "../typeorm/entities/Competition";
import {CompetitionLevel} from "../typeorm/entities/CompetitionLevel";
import {EventRegistration} from "../typeorm/entities/EventRegistration";
import {EventCompetitionLevel} from "../typeorm/entities/EventCompetitionLevel";
import {File} from "../typeorm/entities/File";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [User, Pet, UserProfile, Event, Competition, CompetitionLevel, EventRegistration, EventCompetitionLevel, File],
      synchronize: true || configService.get('APP_MODE') === AppModes.DEVELOPMENT,
    };
  },
};
