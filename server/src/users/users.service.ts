import { Injectable } from '@nestjs/common';
import User from './user.entity';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'john',
      password: 'changeme',
      isEmailConfirmed: true

    },
    {
      id: 2,
      email: 'maria',
      password: 'guess',
      isEmailConfirmed: true
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
  
  async markEmailAsConfirmed(email: string) {

    const userByEmail = await this.findOne(email)

    if(userByEmail){
      userByEmail.isEmailConfirmed = true
    }
    
    return  Boolean(userByEmail)

  }

  async register({email , password }){
    const tempUser = {
      id: this.users.length+1,
      email,
      password,
      isEmailConfirmed: false
    }
    this.users.push(tempUser)
    const {
      password: _,
      ...registeredUser
    } = tempUser

    return registeredUser
  }

}
