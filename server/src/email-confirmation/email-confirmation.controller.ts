
import {
    Controller,
    ClassSerializerInterceptor,
    UseInterceptors,
    Post,
    Get,
    Body,
    UseGuards,
    Req,
    Query,
  } from '@nestjs/common';
  import ConfirmEmailDto from './confirmEmail.dto';
  import { EmailConfirmationService } from './email-confirmation.service';
import { Public } from 'src/is-public/is-public.decorator';
   
  @Controller('email-confirmation')
  @UseInterceptors(ClassSerializerInterceptor)
  export class EmailConfirmationController {
    constructor(
      private readonly emailConfirmationService: EmailConfirmationService
    ) {}
   
    @Public()
    @Get('confirm')
    async confirm(@Query() confirmationData: ConfirmEmailDto) {
      console.log(confirmationData);
      const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
      await this.emailConfirmationService.confirmEmail(email);
    }

    @Post('resend-confirmation-link')
    async resendConfirmationLink(@Req() request) {
      await this.emailConfirmationService.resendConfirmationLink(request.user.id);
    }
  }