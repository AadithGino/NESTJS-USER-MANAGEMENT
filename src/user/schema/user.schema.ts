import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from 'src/Types';

@Schema({ timestamps: true })
export class User {
  @Prop()
  Name: string;

  @Prop()
  Email: string;

  @Prop()
  Number: number;

  @Prop()
  Password: string;

  @Prop()
  Image:string;

  @Prop()
  Role:Roles
}

export const userSchema = SchemaFactory.createForClass(User);
