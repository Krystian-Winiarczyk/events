import { BaseController } from '../../../../base/BaseController';
import {Get, Res, UnauthorizedException} from '@nestjs/common';
import { LoginUserDto } from './../../dtos/LoginUser.dto';
import { LocalAuthGuard } from '../../../../guard/local-auth/local-auth.guard';
import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { JwtAuthGuard } from '../../../../guard/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';
import {JwtRefreshAuthGuard} from "../../../../guard/jwt-refresh-auth/jwt-refresh-auth.guard";
import {User} from "../../../../typeorm/entities/User";
import {SignupDto} from "../../dtos/Signup.dto";

@Controller('auth')
export class AuthController extends BaseController {

    constructor(private authService: AuthService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await this.authService.logout(req?.user?.id);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.apiSuccessResponse(res, req, req?.user);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request,
        @Res() res: Response,
        @Body() loginUser: LoginUserDto,
    ) {
        try {
            const user: User = await this.authService.signIn(loginUser);

            this.apiSuccessResponse(res, req, user);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post('signup')
    async signup(
        @Req() req: Request,
        @Res() res: Response,
        @Body() signupData: SignupDto,
    ) {
        try {
            const user: User = await this.authService.signUp(signupData);

            this.apiSuccessResponse(res, req, user);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Get('refresh')
    async refreshTokens(@Req() req: Request, @Res() res: Response) {
        try {
            const tokens: { accessToken: string; refreshToken: string } =
                await this.authService.refreshTokens(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    req.user.id,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    req.user.refreshToken,
                );

            this.apiSuccessResponse(res, req, tokens);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
