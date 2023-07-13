import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminSigninDTO } from './DTO/admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Schema/admin.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schema/user.schema';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: mongoose.Model<Admin>,
    private readonly userService: UserService,
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
  ) {}

  // Admin SignIn Service
  async adminSignIn(body: AdminSigninDTO) {
    try {
      const result = await this.adminModel.findOne({ Email: body.Email });
      if (!result) {
        throw new HttpException(
          'Email Not Registered as admin ',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const deshashedPassword = await bcrypt.compare(
        body.Password,
        result.Password,
      );
      console.log(deshashedPassword);

      if (!deshashedPassword) {
        throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
      }

      return { id: result.id, Email: result.Email };
    } catch (error) {
      return error;
    }
  }

  // Register Admin Service

  async registerAdmin(body: AdminSigninDTO) {
    const hashedPasswoerd = await bcrypt.hash(body.Password, 10);
    return await this.adminModel.create({
      Email: body.Email,
      Password: hashedPasswoerd,
    });
  }

  // Admin Get All User Service

  async getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (error) {}
  }

  // Admin Delete User Service

  async deleteUser(id: string) {
    try {
      const data = await this.userModel.deleteOne({ _id: id });
      fs.unlinkSync(`./uploads/${id}.png`);
    } catch (error) {}
  }
}
