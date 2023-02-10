import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { Activity } from './schema/activity.schema';

@Injectable()
export class ActivityService {

    constructor(@InjectModel(Activity.name) private activityModel: Model<Activity>, private cloudinaryService: CloudinaryService) { }

    async getActivity(): Promise<{ activities: any[] }> {
        const activities = await this.activityModel.find({});
        return { activities };
    }

    async getActivityByUserId(id: string): Promise<any> {
        const activites = await this.activityModel.find({ uploader_id: id });
        return { activites }
    }

    async getActivityByDepartment(department: string): Promise<any> {
        const activites = await this.activityModel.find({})

        return activites
    }

    async uploadActivity(activityData: any, image: Express.Multer.File): Promise<{ activity: any, error: string | null }> {

        const profileUrl: any = await this.cloudinaryService.uploadImage(image, 'activity').catch(() => {
            return { activity: null, error: "Invalid Image file type" }
        });

        let activity;

        try {
            activity = await this.activityModel.create({
                club_name: activityData.clubName,
                position: activityData.position,
                company_name: activityData.companyName,
                company_location: activityData.companyLocation,
                placed_date: activityData.placedDate,
                placed_type: activityData.placedType,
                round_short_listed: activityData.roundShortListed,
                camp_range: activityData.campRange,
                event_name: activityData.eventName,
                event_venue: activityData.eventVenue,
                registration_number: activityData.registrationNumber,
                course_code: activityData.courseCode,
                course_name: activityData.courseName,
                host_instituition: activityData.hostInstituition,
                organization_name: activityData.organizationName,
                course_duration: activityData.courseDuration,
                credit: activityData.credit,
                credit_transfer: activityData.creditTransfer,
                title: activityData.title,
                type: activityData.type,
                event_date: activityData.eventDate,
                mode: activityData.mode,
                event_mode: activityData.eventMode,
                prize_amount: activityData.prizeAmount,
                project_title: activityData.projectTitle,
                project_guide: activityData.projectGuide,
                project_mode: activityData.projectMode,
                published_in: activityData.publishedIn,
                project_submitted_date: activityData.projectSubmittedDate,
                project_published_date: activityData.projectPublishedDate,
                journal_name: activityData.journalName,
                authors: activityData.authors,
                journal_detail: activityData.journalDetail,
                issn_number: activityData.issnNumber,
                doi_number: activityData.doiNumber,
                convertion_stage: activityData.convertionStage,
                sport_name: activityData.sportName,
                event_date_range: activityData.eventDateRange,
                event_level: activityData.eventLevel,
                course_platform: activityData.coursePlatform,
                course_date_range: activityData.courseDateRange,
                activity_done: activityData.activityDone,
                workshop_name: activityData.workshopName,
                exam_name: activityData.examName,
                exam_venue: activityData.examVenue,
                exam_level: activityData.examLevel,
                activity_type: activityData.activityType,
                mark: Number(activityData.mark),
                data_object: {
                    label: activityData.label,
                    prize: activityData.prize,
                    mark: activityData.mark,
                },
                uploader_id: activityData.uploaderId,
                is_locked: false,
                image: profileUrl.secure_url,
            });

        } catch (e) {
            console.log(e);

            return { activity: null, error: "Uploading Activity Failed" }
        }


        if (activity) {
            return {
                activity,
                error: null
            }
        }
    }
}
