import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { EmailService } from 'src/email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private emailService: EmailService
  ) { }


  async findEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: { email }
    });
  }

  async getById(id: number): Promise<User | undefined> {
    return this.userModel.findOne({
      where: { id }
    });
  }

  async markEmailAsConfirmed(email: string) {
    const userByEmail = await this.findEmail(email);

    if (userByEmail) {
      await this.userModel.update(
        { isEmailConfirmed: true },
        { where: { email } }
      );
      userByEmail.isEmailConfirmed = true;
    }

    return Boolean(userByEmail);
  }

  async register({ email, password }: { email: string; password: string }): Promise<User> {
    const existingUser = await this.findEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashedPassword });
  }

  async sendRestorePassword(email: string) {
    const user = await this.findEmail(email);
    if (!user) throw new ConflictException('User not found');
    
    const verificationCode = crypto.randomInt(100000, 1000000).toString();

    const text = `Your verification code is: ${verificationCode} 
                  click here: localhost:3000/reset-pasword`;
    
    await this.emailService.sendEmail({
      to: email,
      subject: 'Password reset',
      text
    });
    
    await this.userModel.update(
      { token: verificationCode },
      { where: { email } }
    );

    const response = {
      message: "Verification code sent via email",
      status: 200
    };

    return response;
}

  async restorePassword(email: string, token: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email, token }
    });
    if (!user) throw new ConflictException('Invalid token');
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.update(
      { password: hashedPassword },
      { where: { email } }
    );

    const response = {
      message: "Password changed",
      status: 200
    };

    return response;
  }
}
