import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModuleController } from './auth.controller';
import { UserModule } from 'src/user-module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthModuleController],
  providers: [AuthService],
})
export class AuthModule {}
