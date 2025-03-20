import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthGuard } from "./auth.guard";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    singIn(@Body() singIn: Record<string, any>) {
        return this.authService.singIn(singIn.email, singIn.password)
    }


    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user
    }
}