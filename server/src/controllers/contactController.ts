import { Request, Response, NextFunction } from 'express';
import { ContactSubmission } from '../models/ContactSubmission.js';
import { isDbConnected } from '../config/db.js';

// In-memory fallback if database connection drops
const inMemorySubmissions: any[] = [];

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, message, category } = req.body;

    if (isDbConnected()) {
      const submission = await ContactSubmission.create({
        name,
        email,
        message,
        category: category || 'general',
      });
      res.status(201).json({
        success: true,
        message: 'Thank you for reaching out. We have received your message.',
        data: { id: submission._id, createdAt: submission.createdAt },
      });
      return;
    }

    // Fallback store
    const fallbackItem = { id: `local_${Date.now()}`, name, email, message, category, createdAt: new Date() };
    inMemorySubmissions.push(fallbackItem);
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Your message has been received.',
      data: fallbackItem,
    });
  } catch (error) {
    next(error);
  }
};
