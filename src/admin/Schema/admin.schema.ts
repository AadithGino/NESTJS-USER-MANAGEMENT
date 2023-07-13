import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from 'src/Types';

@Schema()
export class Admin {
  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  Role:Roles
}

export const adminSchema = SchemaFactory.createForClass(Admin);
