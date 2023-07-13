import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDTO, UserLoginDTO } from 'src/user/DTO/user.dto';
import { User } from 'src/user/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { extname } from 'path';
import * as fs from 'fs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
    private readonly authService:AuthService
  ) {}

  async getAllUsers() {
    return await this.userModel.find();
  }

  // User SignUp Service

  async userSignUp({ Email, Name, Number, Password }: UserDTO, image?) {
    try {
      console.log(image);
      const result = await this.userModel.findOne({
        $or: [{ Email: Email, Number: Number }],
      });
      console.log(result);

      if (result) {
        throw new HttpException(
          'User with credentials already exists',
          HttpStatus.CONFLICT,
        );
      }
      const hashedPasswoerd = await bcrypt.hash(Password, 10);
      return await this.userModel.create({
        Email,
        Name,
        Number,
        Password: hashedPasswoerd,
      });
    } catch (error) {
      return error;
    }
  }

  async userSignIn({ Email, Password }: UserLoginDTO) {
    try {
      const result = await this.userModel.findOne({ Email: Email });
      if (!result) {
        throw new HttpException(
          'Email not registered',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const hashedPassword = await bcrypt.compare(Password, result.Password);
      console.log(hashedPassword);

      if (!hashedPassword) {
        throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
      } else {
        console.log(this.authService.generateToken(result.id));
        
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  async getSingleUser(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async uploadProfilePhoto(body, image) {
    const fileExtension = extname(image.originalname);
    const newFilename = `${body.id}${fileExtension}`;

    // Rename the file using the new filename
    fs.renameSync(`./uploads/${image.filename}`, `./uploads/${newFilename}`);

    return await this.userModel.updateOne(
      { _id: body.id },
      { $set: { Image: fileExtension } },
    );
  }
}
