import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/is-public/is-public.decorator';
import { UsersService } from 'src/users/users.service';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(@Body() registrationData) {
    const user = await this.usersService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(registrationData.email);
    return user;
  }

  @Public()
  @Post('sendRestorePassword')
  async sendRestorePassword(@Body() data:{email: string}) {
    return await this.usersService.sendRestorePassword(data.email);
  }

  @Public()
  @Post('restorePassword')
  async restorePassword(@Body() data: { email: string; token: string; password: string }) {
    return await this.usersService.restorePassword(data.email, data.token, data.password);
  }
  
}
