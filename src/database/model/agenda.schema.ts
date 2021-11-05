import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgendaDocument = Agenda & Document;

@Schema()
export class Agenda {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  phone: string;

  @Prop()
  type: string;

  @Prop()
  internationalCallingCode: string;

  @Prop()
  location: string;

  @Prop()
  country: string;

  @Prop()
  isMobile: boolean;

  @Prop()
  prefix: string;
}

export const AgendaSchema = SchemaFactory.createForClass(Agenda);
