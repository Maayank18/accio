import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  category: z.enum(['general', 'research', 'collaboration', 'accessibility_feedback', 'partnerships']).optional(),
});

export const communitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  role: z.enum(['User', 'Caregiver', 'Researcher', 'Developer', 'Advocate', 'Other']).default('Advocate'),
  interests: z.array(z.string()).optional(),
});

export const earlyAccessSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  useCase: z.string().max(500).optional(),
  devicePreference: z.string().optional(),
});

export const validateBody = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
        return;
      }
      next(error);
    }
  };
};
