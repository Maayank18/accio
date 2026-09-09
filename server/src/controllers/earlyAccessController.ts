import { Request, Response, NextFunction } from 'express';
import { EarlyAccess } from '../models/EarlyAccess.js';
import { isDbConnected } from '../config/db.js';

const inMemoryWaitlist: any[] = [];

export const requestEarlyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, useCase, devicePreference } = req.body;

    if (isDbConnected()) {
      const existing = await EarlyAccess.findOne({ email });
      if (existing) {
        res.status(200).json({
          success: true,
          message: "You're already on our Early Access waitlist! We'll reach out as new slots open.",
          data: { email: existing.email },
        });
        return;
      }

      const entry = await EarlyAccess.create({
        email,
        useCase,
        devicePreference: devicePreference || 'desktop',
      });

      res.status(201).json({
        success: true,
        message: 'You have been added to the Accio Early Access program.',
        data: { id: entry._id, email: entry.email },
      });
      return;
    }

    const fallbackEntry = { id: `ea_${Date.now()}`, email, useCase, devicePreference, createdAt: new Date() };
    inMemoryWaitlist.push(fallbackEntry);
    res.status(201).json({
      success: true,
      message: 'You have been added to the Accio Early Access program.',
      data: fallbackEntry,
    });
  } catch (error) {
    next(error);
  }
};
