import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Group } from "../../../../typeorm/entities/Group";
import { GroupService } from "../../service/group/group.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/settings/groups')
export class GroupController extends BaseController<Group> {
    constructor(private groupService: GroupService) {
        super(groupService)
    }
}
