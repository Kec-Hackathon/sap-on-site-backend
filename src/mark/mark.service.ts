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

    async updateMark(id: string, activityMark: number, activityType: string) {
        let total = 0, mark = 0;

        const result = await this.markModel.find({ uploader_id: id });

        total = +result[0].total + activityMark;
        result[0][activityType] = result[0][activityType] + activityMark;

        if (total < 20) {
            mark = 0;
        } else if (total >= 20 && total < 40) {
            mark = 1;
        } else if (total >= 40 && total < 60) {
            mark = 2;
        } else if (total >= 60 && total < 80) {
            mark = 3;
        } else if (total >= 80 && total < 100) {
            mark = 4;
        } else if (total >= 100) {
            mark = 5;
        }

        const updatedMark = await this.markModel.updateOne(
            { uploader_id: id },
            {
                $set: {
                    total: total,
                    mark: mark,
                    paper: +result[0].paper,
                    project: +result[0].project,
                    club: +result[0].club,
                    techno_managerial: +result[0].techno_managerial,
                    sports: +result[0].sports,
                    vac: +result[0].vac,
                    project_to_paper: +result[0].project_to_paper,
                    gate_govt_exam: +result[0].gate_govt_exam,
                    placement_intern: +result[0].placement_intern,
                    entrepreneurship: +result[0].entrepreneurship,
                    voluntary: +result[0].voluntary,
                    nptel: +result[0].nptel,
                    nss_ncc: +result[0].nss_ncc,
                },
            },
            { new: true }
        )

        return updatedMark;
    }
}
