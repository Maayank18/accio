import mongoose, { Document, Schema } from 'mongoose';
import { ICommunityMember } from '../types/index.js';

export interface ICommunityMemberDoc extends ICommunityMember, Document {}

const CommunityMemberSchema = new Schema<ICommunityMemberDoc>(
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
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      enum: ['User', 'Caregiver', 'Researcher', 'Developer', 'Advocate', 'Other'],
      default: 'Advocate',
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const CommunityMember = mongoose.model<ICommunityMemberDoc>(
  'CommunityMember',
  CommunityMemberSchema
);
