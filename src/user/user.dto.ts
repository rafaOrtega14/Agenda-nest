import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()
  readonly age: number;
}

export class CreateContactDto {
  @IsNotEmpty()
  readonly name: string;
  readonly lastname: string;
  @IsNotEmpty()
  readonly phone: string;
  readonly type: string;
  readonly internationalCallingCode: string;
  readonly location: string;
  readonly country: string;
  readonly isMobile: boolean;
  readonly prefix: string;
}
