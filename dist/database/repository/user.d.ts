import { Model } from 'mongoose';
import { UserDocument } from '../model/user.schema';
import { CreateUserDto } from '../../user/user.dto';
import { UserDoc } from 'src/user/user.interface';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    saveUser(user: CreateUserDto): Promise<UserDoc>;
}
