import { Module } from '@nestjs/common';
import { UploaderController } from './controller/uploader/uploader.controller';
import { UploaderService } from './service/uploader/uploader.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "../../typeorm/entities/File";
@Module({
  controllers: [UploaderController],
  imports: [TypeOrmModule.forFeature([File])],
  providers: [UploaderService],
  exports: [UploaderService]
})
export class UploaderModule {}
