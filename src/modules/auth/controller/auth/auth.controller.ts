import { UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './../../dtos/LoginUser.dto';
import { LocalAuthGuard } from '../../../../guard/local-auth/local-auth.guard';
import { Controller, Post, Req, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { JwtAuthGuard } from '../../../../guard/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUser: LoginUserDto) {
        const user = await this.authService.validateUser(loginUser.email, loginUser.password)

        if (!user) throw new UnauthorizedException()
        
        return this.authService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async profile(@Req() request: Request) {
        return request.body
    }

}
