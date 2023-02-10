import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mark } from './schema/mark.schema';

@Injectable()
export class MarkService {
    constructor(@InjectModel(Mark.name) private markModel: Model<Mark>) { }

    async createMarkForNewUser(id: string): Promise<{ mark: Mark }> {
        const mark = await this.markModel.create({
            uploader_id: id
        })
        return { mark };
    }

    async getMarkByUserId(id: string): Promise<any> {
        const mark = await this.markModel.find({ uploader_id: id })        
        if (mark) {
            return { mark: mark[0] }
        } else {
            return { mark: null }
        }
    }
}
