import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminSigninDTO } from './DTO/admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Admin Signin
   * Endpoint: POST /admin/signin
   * Allows the admin to sign in.
   * @param body - AdminSigninDTO containing email and password.
   * @returns The result of the admin sign-in operation.
   */
  @Post('/signin')
  adminSignin(@Body() body: AdminSigninDTO) {
    return this.adminService.adminSignIn(body);
  }

  /**
   * Admin Get All User
   * Endpoint: GET /admin/allusers
   * Retrieves a list of all users.
   * @returns An array of user objects.
   */
  @Get('/allusers')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  /**
   * Delete User
   * Endpoint: DELETE /admin/delete-user/:id
   * Allows the admin to delete a user.
   * @param id - User ID to be deleted.
   * @returns The result of the user deletion operation.
   */
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
