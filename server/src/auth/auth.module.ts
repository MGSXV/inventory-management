import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [JwtModule.register({}), UserModule],
	controllers: [AuthController],
	providers: [AuthService, AtStrategy, RtStrategy]
})
export class AuthModule {}
