import { Request, Response } from 'express';
import { isDbConnected } from '../config/db.js';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: isDbConnected() ? 'connected' : 'disconnected_or_fallback',
    version: '1.0.0',
    service: 'Accio Accessibility API',
  });
};
