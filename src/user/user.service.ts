import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService
  ) { }

  async getUserDetailById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getUsersListById(id: string): Promise<{ usersList: any }> {
    const usersList = await this.userModel.find({ mentor_id: id }).sort([['year', -1]]);
    return { usersList };
  }

  async getStudentListByDepartment(department: string): Promise<any> {
    const userList = await this.userModel.find({ user_type: "Student", department: department }).populate('mentor_id')
    return userList;
  }

  async getAdminsByDepartment(department: string): Promise<any> {
    const adminList = await this.userModel.find({ user_type: "Mentor", department: department })
    return adminList;
  }

  async updateStudentMentor(id: string, userDetail: any): Promise<any> {
    const student = await this.userModel.findByIdAndUpdate(id, {
      name: userDetail.name,
      email: userDetail.email,
      roll_no: userDetail.roll_no,
      password: userDetail.password,
      department: userDetail.department,
      mentor_id: userDetail.mentor_id,
      year: userDetail.year,
      profile: userDetail.profile,
      user_type: 'Student'
    }, { new: true })

    return student;
  }

  async signUp(createUserDto: CreateUserDto, profile: Express.Multer.File): Promise<{ user: any; token: string; error: string }> {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    let profileUrl;

    if (createUserDto.user_type === 'Student') {
      profileUrl = await this.cloudinaryService.uploadImage(profile, 'profile').catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
    }
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
        profile: profileUrl.secure_url ? profileUrl.secure_url : '',
        user_type: createUserDto.user_type
      });
    } catch (e) {
      if (e.keyPattern.email) {
        return {
          user: null,
          error: `Email Already exsist - ${createUserDto.email}`,
          token: null,
        }
      } else if (e.keyPattern.roll_no) {
        return {
          user: null,
          error: `Roll Number Already exsist - ${createUserDto.roll_no}`,
          token: null,
        }
      }
    }

    const token = this.jwtService.sign({ id: user._id });

    return { user, token, error: null };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ error?: string, token?: string, user?: any }> {

    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { error: `User Does not exsist with email: ${email}` }
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return { error: "Wrong Password" }
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token: token, user: user };
  }

  async confirmPassword(id: string, password: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return {
        error: "User Does not exsist"
      }
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return { error: "Wrong Password" }
    }

    return {
      error: null,
      message: "Password Verified"
    }

  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{ user?: User, error?: any }> {
    let user;

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 12);

    try {
      user = await this.userModel.findByIdAndUpdate(id, {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: hashedPassword,
        roll_no: updateUserDto.roll_no,
        department: updateUserDto.department,
        mentor_id: updateUserDto.mentor_id,
        year: updateUserDto.year,
        // profile: profileUrl,
      }, {
        new: true,
        runValidators: true,
      })

      return { user }

    } catch (e) {
      console.log(e);
      if (e.keyPattern.email) {
        return {
          user: null,
          error: "Email Already exsist",
        }
      } else if (e.keyPattern.roll_no) {
        return {
          user: null,
          error: "Roll Number Already exsist",
        }
      }
    }
  }
}
