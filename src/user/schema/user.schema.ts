import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose/dist";
import mongoose from "mongoose";

export enum USER_TYPE {
    STUDENT = 'Student',
    MENTOR = 'Mentor'
}

@Schema({
    timestamps: true,
    versionKey: false
})

export class User {
    @Prop({ required: true, type: String })
    name: string

    @Prop({ required: true, type: String, unique: true })
    email: string

    @Prop({ type: String, unique: true })
    roll_no: string

    @Prop({ required: true, type: String, minlength: 6 })
    password: string

    @Prop({ required: true })
    department: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", default: null })
    mentor_id: string

    @Prop({ type: Number })
    year: string

    @Prop({ type: String })
    profile: string

    @Prop({ type: String, required: true })
    user_type: USER_TYPE

    @Prop({ type: Boolean })
    is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)