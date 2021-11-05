import { HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { AgendaDoc, UserDoc } from './user.interface';
import { UserDocument } from '../database/model/user.schema';
import { CreateContactDto, CreateUserDto } from './user.dto';
export declare class UserService {
    private userModel;
    private httpService;
    constructor(userModel: Model<UserDocument>, httpService: HttpService);
    getCommonContacts(): Promise<AgendaDoc[]>;
    getContactFromUser(userId: string): Promise<AgendaDoc[]>;
    saveUser(user: CreateUserDto): Promise<UserDoc>;
    createContact(contact: CreateContactDto, id: string): Promise<AgendaDoc>;
    private phoneInfo;
}
