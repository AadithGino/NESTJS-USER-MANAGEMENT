import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './Schema/admin.schema';
import { UserModule } from 'src/user/user.module';
import { userSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: adminSchema },
      { name: 'User', schema: userSchema },
    ]),
    UserModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
