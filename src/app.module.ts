import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './core/cloudinary/cloudinary.module';

@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URL, { dbName: process.env.DB_NAME }),
  CloudinaryModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
