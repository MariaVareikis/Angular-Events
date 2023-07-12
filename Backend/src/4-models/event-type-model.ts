import mongoose from "mongoose";

// 1. Interface
export interface IEventTypeModel extends mongoose.Document {
    _id: string;
    eventType: string;
}

// 2. Schema
export const EventTypeSchema = new mongoose.Schema<IEventTypeModel>({
    eventType: {
        type: String,
        required: [true, "Missing event type"],
        minlength: [2, "Description must be minimum 2 chars"],
        maxlength: [100, "Description can't exceed 100 chars"],
        trim: true
    }
});

// 3. Model
export const EventTypeModel = mongoose.model<IEventTypeModel>("EventTypeModel", EventTypeSchema, "event-types");
