import { IsDate, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'First name must have atleast 2 characters.' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must have atleast 2 characters.' })
  lastName: string;

  @IsDate()
  birthday: Date;
}
