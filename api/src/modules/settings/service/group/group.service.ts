import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BaseService} from "../../../../base/BaseService";
import {Group} from "../../../../typeorm/entities/Group";

@Injectable()
export class GroupService extends BaseService<Group> {
    constructor(@InjectRepository(Group) private groupRepository: Repository<Group>) {
        super(groupRepository);
    }
}
