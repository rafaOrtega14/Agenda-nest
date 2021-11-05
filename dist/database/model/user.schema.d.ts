import { Document } from 'mongoose';
import { AgendaDocument } from './agenda.schema';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    lastname: string;
    age: number;
    agenda: AgendaDocument[];
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
