import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {ConfigService} from "@nestjs/config";
import {AppMode} from "../../constants/AppMode";

@Injectable()
export class DevelopmentGuard implements CanActivate {
    constructor(private configService: ConfigService) {}
    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
        return this.configService.get('APP_MODE') === AppMode.DEVELOPMENT;
    }
}
