import { Document } from 'mongoose';
export declare type AgendaDocument = Agenda & Document;
export declare class Agenda {
    name: string;
    lastname: string;
    phone: string;
    type: string;
    internationalCallingCode: string;
    location: string;
    country: string;
    isMobile: boolean;
    prefix: string;
}
export declare const AgendaSchema: import("mongoose").Schema<Document<Agenda, any, any>, import("mongoose").Model<Document<Agenda, any, any>, any, any, any>, {}>;
