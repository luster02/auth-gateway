import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from '../../../config/config.interface';
import { IJwtPayload } from '../interfaces';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService<IEnvironmentVariables>,
    @Inject('AuthService')
    private readonly _authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this._authService.getUsername(username);
    if (!user) throw new UnauthorizedException();
    return payload;
  }

}
