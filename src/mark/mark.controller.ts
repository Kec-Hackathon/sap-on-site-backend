import { Controller, Get, Param } from '@nestjs/common';
import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController {
    constructor(private markService: MarkService) { }

    @Get(':id')
    async getMarkById(@Param('id') id: string) {
        const userMark = await this.markService.getMarkByUserId(id)
        return { mark: userMark.mark, message: "Mark Fetched" }
    }
}
