import {
  Body,
  Controller,
  Get,
  UseInterceptors,
  HttpStatus,
  Put,
  Post,
  UploadedFile,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserLoginDTO } from 'src/user/DTO/user.dto';
import { uploadInterceptor } from 'src/multer';
import { RoleGuards } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    return this.userService.getSingleUser(id);
  }

  @Post('/signup')
  userSignUp(@Body() body: UserDTO) {
    return this.userService.userSignUp(body);
  }

  @Post('/signin')
  userSignin(@Body() body: UserLoginDTO) {
    return this.userService.userSignIn(body);
  }

  @Put('/add-profile-photo')
  @UseGuards(RoleGuards)
  @Roles('user','admin')
  @UseInterceptors(uploadInterceptor())
  addProfilePhoto(@UploadedFile() image, @Body() body: { id: string }) {
    return this.userService.uploadProfilePhoto(body, image);
  }
}
