import mongoose, { Document, Schema } from 'mongoose';
import { IContactSubmission } from '../types/index.js';

export interface IContactSubmissionDoc extends IContactSubmission, Document {}

const ContactSubmissionSchema = new Schema<IContactSubmissionDoc>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    category: {
      type: String,
      enum: ['general', 'research', 'collaboration', 'accessibility_feedback', 'partnerships'],
      default: 'general',
    },
  },
  {
    timestamps: true,
  }
);

export const ContactSubmission = mongoose.model<IContactSubmissionDoc>(
  'ContactSubmission',
  ContactSubmissionSchema
);
