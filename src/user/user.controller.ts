import { Body, Controller, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { MarkService } from 'src/mark/mark.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private markService: MarkService) { }

    @Get('/get-students/:id')
    async getUserListByAdminId(@Param('id') id: string): Promise<{ usersList: any, message: string }> {
        const usersList = await this.userService.getUsersListById(id);
        return { usersList: usersList.usersList, message: "Fetched Successfully!" }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<{ user: any, message: string }> {

        const user = await this.userService.getUserDetailById(id);

        if (user) {
            return {
                user,
                message: "User Detail Fetched!"
            }
        } else {
            return {
                user: null,
                message: "User Detail fetching failed!"
            }
        }
    }

    @Get('/s/department/:dept')
    async getUserDetailById(@Param('dept') dept: string): Promise<any> {
        const userList = await this.userService.getStudentListByDepartment(dept);
        return userList;
    }

    @Get('/m/department/:dept')
    async getAdminDetailByDepartment(@Param('dept') dept: string): Promise<any> {
        const adminList = await this.userService.getAdminsByDepartment(dept);
        return adminList;
    }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('profile'))
    async createNewUser(@UploadedFile() profile: Express.Multer.File, @Body() createNewDto: CreateUserDto): Promise<{ user: User, token: string, message: string }> {
        const createdUser = await this.userService.signUp(createNewDto, profile);


        if (createdUser.error) {
            return {
                user: null,
                token: null,
                message: createdUser.error
            }
        } else {
            if (createdUser.user.user_type === 'Student') {
                await this.markService.createMarkForNewUser(createdUser.user._id);
                return {
                    user: createdUser.user,
                    token: createdUser.token,
                    message: "User Created Successfully!"
                }
            } else {
                return {
                    user: createdUser.user,
                    token: createdUser.token,
                    message: "User Created Successfully!"
                }
            }
        }
    }

    @Post('/login')
    async userLogin(@Body() loginUserDto: LoginUserDto): Promise<{ user: any, token: string, message: string }> {
        const userLogin = await this.userService.login(loginUserDto);

        if (userLogin.error) {
            return {
                user: null,
                token: null,
                message: userLogin.error
            }
        } else {
            return {
                user: userLogin.user,
                token: userLogin.token,
                message: "User Logged in Successfully!"
            }
        }
    }

    @Post('/confirm-password')
    async confirmPassword(@Body() body: { id: string, password: string }): Promise<{ verified: boolean, message: string }> {
        const check = await this.userService.confirmPassword(body.id, body.password);

        if (check.error) {
            return {
                verified: false,
                message: check.error
            }
        } else {
            return {
                verified: true,
                message: "User Verified"
            }
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ user: any, message: string }> {

        const updatedUser = await this.userService.updateUser(id, updateUserDto);

        if (updatedUser.error) {
            return {
                user: null,
                message: updatedUser.error
            }
        } else {
            return {
                user: updatedUser.user,
                message: "User Updated Successfully!"
            }
        }
    }

    @Put('update-admin/:id')
    async updateAdmin(@Param('id') id: string, @Body() userDetail: string): Promise<any> {
        const student = await this.userService.updateStudentMentor(id, userDetail);
        return student;
    }
}
