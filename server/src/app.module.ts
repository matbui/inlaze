import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { MoviesModule } from './movies/movies.module';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { EmailService } from './email/email.service';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MoviesModule, EmailConfirmationModule, EmailModule],
  controllers: [AppController, EmailConfirmationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    EmailConfirmationService,
    EmailService,
  ],
})
export class AppModule {}
