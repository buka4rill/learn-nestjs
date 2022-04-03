// DTO won't look exactly like repo model

import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
