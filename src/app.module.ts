import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { IEnvironmentVariables } from './config/config.interface'
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GqlModule } from './gql/gql.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    GqlModule
  ],
  controllers: [AppController]
})
export class AppModule {
  static port: number;
  constructor(private configService: ConfigService<IEnvironmentVariables>) {
    AppModule.port = this.configService.get<number>('PORT')
  }
}
