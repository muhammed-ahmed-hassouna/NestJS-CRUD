import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('appSecret'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService], // Inject ConfigService to use it within useFactory
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,]
})
export class AuthModule { }
