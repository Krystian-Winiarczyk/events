import { BaseController } from './../../../BaseController';
import { Res, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './../../dtos/LoginUser.dto';
import { LocalAuthGuard } from '../../../../guard/local-auth/local-auth.guard';
import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { JwtAuthGuard } from '../../../../guard/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController extends BaseController {

    constructor(private authService: AuthService) {
        super();
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request, @Res() res: Response,
        @Body() loginUser: LoginUserDto
    ) {
        const user = await this.authService.validateUser(loginUser.email, loginUser.password)

        if (!user) throw new UnauthorizedException()
        
        try {
            const data = await this.authService.login(user)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
}
