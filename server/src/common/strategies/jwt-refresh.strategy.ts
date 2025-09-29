import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
            passReqToCallback: true,
        });
    }

    async validate(req, payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        if (!refreshToken) throw new UnauthorizedException();
        return { ...payload, refreshToken };
    }
}
