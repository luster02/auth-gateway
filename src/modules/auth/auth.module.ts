import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'
import { IEnvironmentVariables } from '../../config/config.interface'
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService<IEnvironmentVariables>) {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService, AuthResolver],
  exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule { }
