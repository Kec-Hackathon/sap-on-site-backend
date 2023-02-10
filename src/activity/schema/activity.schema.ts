import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export class Data {
    @Prop({ type: String, required: true })
    label: string

    @Prop({ type: Boolean })
    prize: Boolean

    @Prop({ type: Number, required: true })
    mark: number
}

@Schema({
    timestamps: true,
    versionKey: false
})
export class Activity {
    @Prop({ type: String })
    club_name: string

    @Prop({ type: String })
    position: string

    @Prop({ type: String })
    company_name: string

    @Prop({ type: String })
    company_location: string

    @Prop({ type: String })
    placed_date: string

    @Prop({ type: String })
    placed_type: string

    @Prop({ type: String })
    round_short_listed: string

    @Prop({ type: String })
    camp_range: string

    @Prop({ type: String })
    event_name: string

    @Prop({ type: String })
    event_venue: string

    @Prop({ type: String })
    event_mode: string

    @Prop({ type: String })
    registration_number: string

    @Prop({ type: String })
    course_code: string

    @Prop({ type: String })
    course_name: string

    @Prop({ type: String })
    host_instituition: string

    @Prop({ type: String })
    organization_name: string

    @Prop({ type: String })
    course_duration: string

    @Prop({ type: String })
    credit: string

    @Prop({ type: String })
    credit_transfer: string

    @Prop({ type: String })
    title: string

    @Prop({ type: String })
    type: string

    @Prop({ type: String })
    event_date: string

    @Prop({ type: String })
    mode: string

    @Prop({ type: String })
    prize_amount: string

    @Prop({ type: String })
    project_title: string

    @Prop({ type: String })
    project_guide: string

    @Prop({ type: String })
    project_mode: string

    @Prop({ type: String })
    published_in: string

    @Prop({ type: String })
    project_submitted_date: string

    @Prop({ type: String })
    project_published_date: string

    @Prop({ type: String })
    journal_name: string

    @Prop({ type: String })
    authors: string

    @Prop({ type: String })
    journal_detail: string

    @Prop({ type: String })
    issn_number: string

    @Prop({ type: String })
    doi_number: string

    @Prop({ type: String })
    convertion_stage: string

    @Prop({ type: String })
    sport_name: string

    @Prop({ type: String })
    event_date_range: string

    @Prop({ type: String })
    event_level: string

    @Prop({ type: String })
    course_platform: string

    @Prop({ type: String })
    course_date_range: string

    @Prop({ type: String })
    activity_done: string

    @Prop({ type: String })
    workshop_name: string

    @Prop({ type: String })
    exam_name: string

    @Prop({ type: String })
    exam_venue: string

    @Prop({ type: String })
    exam_level: string

    @Prop({ type: String, required: true })
    activity_type: string

    @Prop({ type: Number, required: true })
    mark: number

    @Prop({ type: String })
    image: string

    @Prop({})
    data_object: [Data]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    uploader_id: any

    @Prop({ type: Boolean, default: false })
    is_locked: boolean

}

export const ActivitySchema = SchemaFactory.createForClass(Activity)