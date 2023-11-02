import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { AppMode } from '../constants/AppMode';
import { UserPet } from "../typeorm/entities/UserPet";
import { UserProfile } from "../typeorm/entities/UserProfile";
import { Event } from "../typeorm/entities/Event";
import { Competition } from "../typeorm/entities/Competition";
import { File } from "../typeorm/entities/File";
import {EventCompetition} from "../typeorm/entities/EventCompetition";
import {Sponsor} from "../typeorm/entities/Sponsor";
import {Group} from "../typeorm/entities/Group";
import {UserEventCompetition} from "../typeorm/entities/UserEventCompetition";

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
      entities: [Event, Competition, File, User, UserPet, UserProfile, EventCompetition, Sponsor, Group, UserEventCompetition],
      synchronize: configService.get('APP_MODE') === AppMode.DEVELOPMENT,
    };
  },
};
