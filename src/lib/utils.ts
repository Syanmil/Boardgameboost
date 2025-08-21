import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculatePriority = (user: User, submissionDate: Date): number => {
  let priority = 0;
  
  // Member tier bonus
  priority += user.membershipTier === 'premium' ? 100 : 50;
  
  // Contribution bonus (recent testing activity)
  priority += Math.min(user.totalTestingPoints * 2, 50);
  
  // Time waiting penalty (older submissions get higher priority)
  const daysWaiting = Math.floor((new Date().getTime() - new Date(submissionDate).getTime()) / (1000 * 60 * 60 * 24));
  priority += daysWaiting * 5;
  
  return priority;
};
