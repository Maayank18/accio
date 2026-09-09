import mongoose, { Document, Schema } from 'mongoose';
import { IEarlyAccess } from '../types/index.js';

export interface IEarlyAccessDoc extends IEarlyAccess, Document {}

const EarlyAccessSchema = new Schema<IEarlyAccessDoc>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    useCase: {
      type: String,
      maxlength: [500, 'Use case notes cannot exceed 500 characters'],
    },
    devicePreference: {
      type: String,
      default: 'desktop',
    },
  },
  {
    timestamps: true,
  }
);

export const EarlyAccess = mongoose.model<IEarlyAccessDoc>(
  'EarlyAccess',
  EarlyAccessSchema
);
