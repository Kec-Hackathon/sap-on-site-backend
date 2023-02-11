import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MarkService } from 'src/mark/mark.service';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService, private markService: MarkService) { }

    @Get()
    async getActivity(): Promise<any> {
        const activities = await this.activityService.getActivity();

        if (activities.activities.length) {
            return {
                activities: activities.activities,
                message: "Activities Fetched"
            }
        } else {
            return {
                activities: 0,
                message: "No Activites Found"
            }
        }
    }

    @Get('/:id')
    async getActivityById(@Param('id') id: string): Promise<any> {
        const activity = await this.activityService.getActivityById(id);
        return activity;
    }

    @Get('/s/:id')
    async getActivityByStudentId(@Param('id') id: string): Promise<any> {
        const activites = await this.activityService.getActivityByUserId(id);
        return { activites: activites.activites }
    }

    @Get('/department/:dept')
    async getActivityByDepartment(@Param('dept') department: string): Promise<any> {
        const activites = await this.activityService.getActivityByDepartment(department);
        const updatedActivites = [];
        activites.forEach(ele => {
            const obj = {};
            obj['name'] = ele.uploader_id.name
            obj['roll_no'] = ele.uploader_id.roll_no
            obj['year'] = ele.uploader_id.year
            obj['uploadedAt'] = `${new Date(ele.createdAt).getDate()} - ${new Date(ele.createdAt).getMonth()} - ${new Date(ele.createdAt).getFullYear()}`
            obj['event'] = ele?.event_name ? ele?.event_name : (ele?.club_name ? ele?.club_name : '')
            obj['mark'] = ele.mark
            obj['is_locked'] = ele.is_locked
            obj['activity'] = ele?.activity_type
            updatedActivites.push(obj);
        })
        return updatedActivites;
    }

    @Post('/')
    @UseInterceptors(FileInterceptor('image'))
    async createActivity(@UploadedFile() image: Express.Multer.File, @Body() activityData: any): Promise<any> {

        const activity = await this.activityService.uploadActivity(activityData, image)

        if (activity?.error) {
            return {
                activity: null,
                message: activity.error
            }
        } else {
            return {
                activity: activity.activity,
                message: "Activity Uploaded Successfully!"
            }
        }
    }

    @Put('/update-status/:id')
    async updateActivityStatus(@Param('id') id: string, @Body() activityData: any) {
        const activity = await this.activityService.updateActivity(id);

        const mark = await this.markService.updateMark(activityData.uploader_id, activityData.mark, activityData.activity_type);

        return { result: true, message: "Activity Status Updated!" }

    }
}
