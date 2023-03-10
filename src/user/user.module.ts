import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ActivityModule } from 'src/activity/activity.module';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';
import { MarkController } from 'src/mark/mark.controller';
import { MarkModule } from 'src/mark/mark.module';
import { MarkService } from 'src/mark/mark.service';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]), 
    CloudinaryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRATION'),
          },
        };
      },
    }),
    MarkModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule]
})
export class UserModule { }
