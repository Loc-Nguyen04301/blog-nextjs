import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtSignTokenPayload } from '../types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'supersecret',
        });
    }

    async validate(payload: JwtSignTokenPayload) {
        const user = await this.userService.findOne(payload.userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }
}

