import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService) { }

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

    @Get('/s/:id')
    async getActivityByStudentId(@Param('id') id: string): Promise<any> {
        const activites = await this.activityService.getActivityByUserId(id);
        return { activites: activites.activites }
    }

    @Get('/department/:dept')
    async getActivityByDepartment(@Param('dept') department: string): Promise<any>{
        return await this.activityService.getActivityByDepartment(department);
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
}
