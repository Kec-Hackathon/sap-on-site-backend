import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    timestamps: true,
    versionKey: false
})

export class Mark {
    @Prop({ type: Number, default: 0, min: 0 })
    total: number

    @Prop({ type: Number, default: 0, min: 0, max: 5 })
    mark: number

    @Prop({ type: Number, default: 0, min: 0, max: 75 })
    paper: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    project: number

    @Prop({ type: Number, default: 0, min: 0 })
    club: number

    @Prop({ type: Number, default: 0, min: 0, max: 50 })
    techno_managerial: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    sports: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    vac: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    project_to_paper: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    gate_govt_exam: number

    @Prop({ type: Number, default: 0, min: 0, max: 50 })
    placement_intern: number

    @Prop({ type: Number, default: 0, min: 0, max: 100 })
    entrepreneurship: number

    @Prop({ type: Number, default: 0, min: 0, max: 50 })
    voluntary: number

    @Prop({ type: Number, default: 0, min: 0 })
    nptel: number

    @Prop({ type: Number, default: 0, min: 0 })
    nss_ncc: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    uploader_id: any
}

export const MarkSchema = SchemaFactory.createForClass(Mark)