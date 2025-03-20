
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(private dbService: DatabaseService,
                private jwtService: JwtService
    ) {}

    async singIn(email: string, pass: string): Promise<{access_token: string}> {
        const user = await this.dbService.employee.findUnique({where: {email}})
        if (user?.password !== pass) {
            throw new UnauthorizedException(`Invalid data`)
        }

        const {password, ...payload} = user
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
        // const {password, ...result} = user
        // return result
    }
}