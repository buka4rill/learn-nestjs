import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { IUser, SerializeUser } from 'src/users/interfaces/IUser';
import { User, UserDocument } from 'src/users/schema/User.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private users: IUser[] = [
    {
      id: 1,
      username: 'buka',
      password: 'buka',
    },
    {
      id: 2,
      username: 'adam',
      password: 'adam',
    },
    {
      id: 3,
      username: 'eve',
      password: 'eve',
    },
    {
      id: 4,
      username: 'john',
      password: 'john',
    },
  ];

  getUsers() {
    // return this.users;
    // return data without password
    // return this.users.map((user) => plainToClass(SerializeUser, user));
    return this.users.map((user) => new SerializeUser(user));

    // return this.userModel.find(new SerializeUser(this.userModel))
  }

  getUserByUsername(username: string) {
    // return this.users.find((user) => user.username === username);

    return this.userModel.findOne({ username }).exec();
  }

  getUserById(id: number) {
    // return this.users.find((user) => user.id === id);

    return this.userModel.findById({ id }).exec();
  }
}
