import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private cloudinaryService: CloudinaryService
      ) { }
    
      async signUp(createUserDto: CreateUserDto): Promise<{ user: any; token: string; error: string }> {
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        // const profileUrl = await this.cloudinaryService.uploadImage(createUserDto.profile.file, createUserDto.profile.folder).catch(() => {
        //                     throw new BadRequestException('Invalid file type.');
        //                   });
    
        let user: any;

        try {
          user = await this.userModel.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
            roll_no: createUserDto.roll_no,
            department: createUserDto.department,
            mentor_id: createUserDto.mentor_id,
            year: createUserDto.year,
            // profile: profileUrl,
            user_type: createUserDto.user_type
          });
        } catch (e) {
          if(e.keyPattern.email) {
            return {
              user: null,
              error: "Email Already exsist",
              token: null,
            }
          } else if(e.keyPattern.roll_no) {
            return {
              user: null,
              error: "Roll Number Already exsist",
              token: null,
            }
          }          
        }
        
        const token = this.jwtService.sign({ id: user._id });
    
        return { user, token, error: null };
      }
    
      async login(loginUserDto: LoginUserDto): Promise<any> {
        const { email, password } = loginUserDto;
    
        const user = await this.userModel.findOne({ email });        

        if (!user) {
          return  { error: "User Does not exsist" }
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return { error: "Invalid Password" }
        }
      
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
}
