import mongoose, { Schema, Document } from "mongoose";

export interface UserDetail extends Document {
    userName: string;
    userEmail: string;
    password: string;
}

const userSchema: Schema = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model<UserDetail>('user', userSchema)