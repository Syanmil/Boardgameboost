// User Schema
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  membershipTier: 'basic' | 'premium';
  membershipStatus: 'active' | 'expired' | 'pending';
  membershipExpiry: Date;
  joinDate: Date;
  totalContributionPoints: number;
  totalTestingPoints: number;
}

// Attachment Schema (e.g., for game materials)
export interface FileAttachment {
  name: string;
  url: string;
  type: string;
  size: number; // in bytes
}

// Game Project Schema
export interface GameProject {
  id: string;
  designerId: string;
  title: string;
  description: string;
  stage: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published';
  playerCount: { min: number; max: number };
  playTime: number; // minutes
  complexity: 1 | 2 | 3 | 4 | 5;
  mechanics: string[];
  currentVersion: string;
  materials: FileAttachment[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  publishedAt?: Date;
}

// Playtest Session Schema
export interface PlayTestSession {
  id: string;
  gameProjectId: string;
  scheduledDate: Date;
  maxPlayers: number;
  registeredPlayers: string[]; // user IDs
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  venue: string;
  notes: string;
  facilitatorId: string;
}

// Playtest Queue Schema
export interface QueueEntry {
  id:string;
  gameProjectId: string;
  submittedAt: Date;
  priority: number; // calculated based on member tier, contribution points
  status: 'queued' | 'scheduled' | 'completed';
}

// Feedback Schema
export interface Feedback {
  id: string;
  sessionId: string;
  gameProjectId: string;
  playerId: string;
  ratings: {
    fun: number; // 1-5
    clarity: number; // 1-5
    balance: number; // 1-5
    theme: number; // 1-5
    mechanics: number; // 1-5
  };
  comments: {
    liked: string;
    disliked: string;
    suggestions: string;
    confusing: string;
  };
  wouldPlayAgain: boolean;
  wouldRecommend: boolean;
  submittedAt: Date;
}

// Game Iteration Schema
export interface GameIteration {
  id: string;
  gameProjectId: string;
  version: string;
  changesDescription: string;
  inspiringFeedback: string[]; // feedback IDs that led to changes
  createdAt: Date;
}

// Gamification Schemas
export interface PointTransaction {
  id: string;
  userId: string;
  type: 'playtest_given' | 'game_tested' | 'feedback_quality' | 'iteration_completed' | 'game_published';
  points: number;
  description: string;
  relatedEntityId?: string; // sessionId, feedbackId, etc.
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: Date;
}
