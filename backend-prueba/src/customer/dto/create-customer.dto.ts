import { IsString, IsEmail, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}$/, {
    message:
      'Password must be 10-15 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol.',
  })
  password: string;
}
