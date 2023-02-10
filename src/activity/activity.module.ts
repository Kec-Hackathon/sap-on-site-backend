import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';
import { MarkModule } from 'src/mark/mark.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivitySchema } from './schema/activity.schema';

@Module({
  imports: [MarkModule, MongooseModule.forFeature([{ name: "Activity", schema: ActivitySchema }]), CloudinaryModule],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule { }
