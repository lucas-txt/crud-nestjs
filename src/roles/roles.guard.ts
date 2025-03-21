import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from '../auth.constants';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            console.log("invalid token trying")
            throw new UnauthorizedException("invalid token")
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            })

            if (payload.role == "ADMIN") {
                return true
            } else {
                return false
            }
        } catch {
            console.log("invalid token trying")
            throw new UnauthorizedException("Invalid token")
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type == "Bearer" ? token : undefined
    }
}