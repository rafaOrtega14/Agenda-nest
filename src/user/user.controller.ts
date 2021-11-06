import {
  Body,
  Catch,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { NoContactsError } from 'src/Errors/NoContactsError';
import { CreateContactDto, CreateUserDto } from './user.dto';
import { AgendaDoc, UserDoc } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
@Catch(NoContactsError)
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  postUsers(@Body() userData: CreateUserDto): Promise<UserDoc> {
    try {
      return this.appService.saveUser(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/contact/:userId')
  postContact(
    @Body() contactData: CreateContactDto,
    @Param('userId') id: string,
  ): Promise<AgendaDoc> {
    try {
      if (!id) {
        new HttpException(
          'Invalid Id param pls try again',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.appService.createContact(contactData, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/contact/common')
  async getCommonContact(): Promise<AgendaDoc[]> {
    try {
      const common = await this.appService.getCommonContacts();
      if (common.length === 0) throw new NoContactsError();
      return common;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/contacts/:userId')
  getContactFromUser(@Param('userId') id: string): Promise<AgendaDoc[]> {
    try {
      if (!id) {
        new HttpException(
          'Invalid Id param pls try again',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.appService.getContactFromUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
