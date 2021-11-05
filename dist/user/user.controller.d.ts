import { CreateContactDto, CreateUserDto } from './user.dto';
import { AgendaDoc, UserDoc } from './user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly appService;
    constructor(appService: UserService);
    postUsers(userData: CreateUserDto): Promise<UserDoc>;
    postContact(contactData: CreateContactDto, id: string): Promise<AgendaDoc>;
    getCommonContact(): Promise<AgendaDoc[]>;
    getContactFromUser(id: string): Promise<AgendaDoc[]>;
}
