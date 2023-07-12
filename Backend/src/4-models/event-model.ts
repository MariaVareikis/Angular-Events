import mongoose from "mongoose";
import { EventTypeModel } from "./event-type-model";

// 1. Interface
export interface IEventModel extends mongoose.Document {
    _id: string;
    eventTypeId: mongoose.Schema.Types.ObjectId;
    eventDate: string;
    description: string;
    eventAddress: string;
    eventPeopleAmount: number;
}

// 2. Schema
export const EventSchema = new mongoose.Schema<IEventModel>({
    eventTypeId: {
        type: mongoose.Schema.Types.ObjectId
    },
    eventDate: {
        type: String,
        required: [true, "Missing date and time"],
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description must be minimum 2 chars"],
        maxlength: [100, "Description can't exceed 100 chars"],
        trim: true
    },
    eventAddress: {
        type: String,
        required: [true, "Missing address"],
        minlength: [2, "Address must be minimum 2 chars"],
        maxlength: [100, "Address can't exceed 100 chars"],
        trim: true
    },
    eventPeopleAmount: {
        type: Number,
        required: [true, "Missing amount of people"],
        min: [5, "Amount of people must be minimum 5 chars"],
        max: [1000, "Amount of people can't exceed 1000 chars"]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

EventSchema.virtual("event-type", {
    ref: EventTypeModel,
    localField: "eventTypeId",
    foreignField: "_id",
    justOne: true
});

// 3. Model
export const EventModel = mongoose.model<IEventModel>("EventModel", EventSchema, "events");
