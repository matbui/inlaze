import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), EmailModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
