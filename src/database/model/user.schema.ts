import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AgendaDocument } from './agenda.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  agenda: AgendaDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
