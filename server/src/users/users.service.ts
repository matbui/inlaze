import { ConflictException, Injectable } from '@nestjs/common';
import {User} from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) 
    private userModel: typeof User
  ) {}


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

}
