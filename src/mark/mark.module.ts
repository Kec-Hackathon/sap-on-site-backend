import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { MarkSchema } from './schema/mark.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Mark", schema: MarkSchema }]),],
  controllers: [MarkController],
  providers: [MarkService],
  exports: [MarkService]
})
export class MarkModule { }
