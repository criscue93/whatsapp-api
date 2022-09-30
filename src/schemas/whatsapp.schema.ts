import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WhatsappDocument = Whatsapp & Document;

@Schema()
export class Whatsapp {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Object })
  origen: any;

  @Prop({ type: Object })
  destino: any;

  @Prop({ type: Boolean })
  enviado: boolean;
}

export const WhatsappSchema = SchemaFactory.createForClass(Whatsapp);
