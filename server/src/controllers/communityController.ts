import { Request, Response, NextFunction } from 'express';
import { CommunityMember } from '../models/CommunityMember.js';
import { isDbConnected } from '../config/db.js';

const inMemoryMembers: any[] = [];

export const joinCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, role, interests } = req.body;

    if (isDbConnected()) {
      // Check existing
      const existing = await CommunityMember.findOne({ email });
      if (existing) {
        res.status(200).json({
          success: true,
          message: 'Welcome back! You are already registered with the Accio community.',
          data: { email: existing.email, role: existing.role },
        });
        return;
      }

      const member = await CommunityMember.create({
        name,
        email,
        role: role || 'Advocate',
        interests: interests || [],
      });

      res.status(201).json({
        success: true,
        message: 'Welcome to the Accio community! Together towards a more inclusive digital world.',
        data: { id: member._id, email: member.email },
      });
      return;
    }

    const fallbackMember = { id: `mem_${Date.now()}`, name, email, role, interests, createdAt: new Date() };
    inMemoryMembers.push(fallbackMember);
    res.status(201).json({
      success: true,
      message: 'Welcome to the Accio community!',
      data: fallbackMember,
    });
  } catch (error) {
    next(error);
  }
};
