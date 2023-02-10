import { Body, Controller, Get, Post } from '@nestjs/common';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/signup')
    async createNewUser(@Body() createNewDto: CreateUserDto): Promise<{user: any, token: string, message: string}> {        
        const createdUser = await this.userService.signUp(createNewDto); 

        if (createdUser.error) {
            return {
                user: null,
                token: null,
                message: createdUser.error
            }
        } else {
            return {
                user: createdUser.user,
                token: createdUser.token,
                message: "User Created Successfully!"
            }
        }
    }

    @Post('/login')
    async userLogin(@Body() loginUserDto: LoginUserDto): Promise<{ user: User, token: string, message: string }> {
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
}
