import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { SerializeUser } from 'src/users/interfaces/IUser';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/username/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  async getByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (user) return new SerializeUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  // @Get('/id/:id')
  // @UseInterceptors(ClassSerializerInterceptor)
  // getById(@Param('id', ParseIntPipe) id: number) {
  //   const user = this.userService.getUserById(id);

  //   if (user) return new SerializeUser(user);
  //   else throw new UserNotFoundException();
  // }

  @Get('/id/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);

    if (user) return new SerializeUser(user);
    else throw new UserNotFoundException();
  }
}
