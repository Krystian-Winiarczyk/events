import { BaseController } from '../../../../base/BaseController';
import { Controller } from "@nestjs/common";
import { UserProfilesService } from "../../service/user-profiles/user-profiles.service";
import { UserProfile } from "../../../../typeorm/entities/UserProfile";

@Controller('api/user/profiles')
export class UserProfilesController extends BaseController<UserProfile> {
    constructor(private userProfileService: UserProfilesService) {
        super(userProfileService);
    }
}
