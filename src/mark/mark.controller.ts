import { Controller, Get, Param, Put } from '@nestjs/common';
import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController {
    constructor(private markService: MarkService) { }

    @Get(':id')
    async getMarkById(@Param('id') id: string) {
        const userMark = await this.markService.getMarkByUserId(id)
        return { mark: userMark.mark, message: "Mark Fetched" }
    }

    @Put('/update-mark/:id')
    async updateUserMark(@Param('id') id: string, activity: any, markData: any): Promise<any> {
        const updatedMark = await this.markService.updateMark(id, activity.mark, activity.activity_type);

        return { updatedMark }
    }
}
