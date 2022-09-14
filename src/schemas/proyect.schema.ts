import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProyectDocument = Proyect & Document;

@Schema()
export class Proyect {}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);
