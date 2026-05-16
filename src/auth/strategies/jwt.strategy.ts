import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import {ExtractJwt, Strategy,} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,) {
  constructor() {
    super({
      // =========================
      // EXTRACT JWT FROM COOKIE
      // =========================

      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (request: any) => {
            return request?.cookies
              ?.accessToken;
          },
        ]),

      // =========================
      // TOKEN SETTINGS
      // =========================

      ignoreExpiration: false,

      secretOrKey:
        process.env.JWT_SECRET!,
    });
  }

  // =========================
  // VALIDATE JWT PAYLOAD
  // =========================

  async validate(payload: any) {
    return {
      userId: payload.sub,

      email: payload.email,

      role: payload.role,
    };
  }
}