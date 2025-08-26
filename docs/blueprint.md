# **App Name**: BoardGameBoost

## Core Features:

- Member Management: User authentication and profile management to ensure secure access and personalized experience.
- Game Project Management: Project tracking of the development stages (concept, prototype, playtesting) and material uploads.
- Playtest Queue System: Scheduling, registration, and notification functionalities.
- Feedback & Iteration Tracking: System for designers to view and respond to structured feedback on game iterations.
- Gamification & Points System: Calculation and display of points based on member activities.
- AI-Powered Insights: Use generative AI as a tool to summarize feedback, suggest design improvements, and find thematic conflicts based on user submitted text.
- Mobile-First Responsive Design: Ensure the web app is fully functional and visually consistent across various mobile devices.

## Style Guidelines:

- Primary color: Soft green (#A7D1AB) to convey growth and collaboration.
- Background color: Light green (#E5EBE3), almost white, to keep things simple and readable.
- Accent color: Light orange (#E5B9A5) to draw the eye and give a visual kick without overwhelming.
- Font Pairing: 'Space Grotesk' (sans-serif) for headers and 'Inter' (sans-serif) for body.  
- Icons: Simple line icons to match the fonts and create an accessible experience.
- Clean and modular layout to make content easy to find. Generous padding between UI elements improves clarity.
- Subtle transitions when moving through pages or showing extra info.

# PRD: Yogyakarta Board Game Design Club - Custom Web Application

## Executive Summary
**Product:** Community management platform for board game design clubs focusing on member progression, playtest management, and publication tracking.

**Target Users:** 50-100 active members across multiple design communities in Indonesia, with potential for international expansion.

**Business Goals:** Increase publication rate, improve member retention, scale community operations efficiently.

---

## Priority Matrix & Development Phases

### **PRIORITY 1: Core MVP (Months 1-2)**
*Essential functionality to replace Google Sheets system*

#### P1.1: Authentication & Member Management
**Business Impact:** High | **Technical Complexity:** Medium | **Dependencies:** None

**User Stories:**
- As a member, I can register and pay membership fees online
- As a member, I can view my membership status and renewal dates
- As an admin, I can approve/reject membership applications
- As an admin, I can manage membership tiers and pricing

**Technical Specs:**
```typescript
// User Schema
interface User {
  id: string;
  email: string;
  displayName: string;
  membershipTier: 'basic' | 'premium';
  membershipStatus: 'active' | 'expired' | 'pending';
  membershipExpiry: Date;
  joinDate: Date;
  totalContributionPoints: number;
  totalTestingPoints: number;
}
```

**API Endpoints:**
```
POST /auth/register
POST /auth/login
GET /users/profile
PUT /users/profile
POST /admin/users/:id/approve
GET /admin/users?status=pending
```

**Acceptance Criteria:**
- [ ] Email verification required for registration
- [ ] Role-based access (member, admin, super-admin)
- [ ] Payment integration (Midtrans/GoPay)
- [ ] Membership expiry notifications

---

#### P1.2: Game Project Management
**Business Impact:** High | **Technical Complexity:** Medium | **Dependencies:** P1.1

**User Stories:**
- As a designer, I can create and manage my game projects
- As a designer, I can track my game's development stages
- As a member, I can view all active projects in the community
- As a designer, I can upload game materials (rules, components list)

**Technical Specs:**
```typescript
interface GameProject {
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
```

**API Endpoints:**
```
POST /projects
GET /projects?stage=playtesting&active=true
PUT /projects/:id
DELETE /projects/:id
POST /projects/:id/materials
GET /projects/:id/versions
```

**Acceptance Criteria:**
- [ ] File upload for rules, images, print-and-play files
- [ ] Version control for game iterations
- [ ] Public/private visibility settings
- [ ] Rich text editor for descriptions
- [ ] Tag system for mechanics and themes

---

#### P1.3: Basic Playtest Queue System
**Business Impact:** High | **Technical Complexity:** High | **Dependencies:** P1.1, P1.2

**User Stories:**
- As a designer, I can submit my game to the playtest queue
- As a member, I can see upcoming games to be tested
- As an admin, I can schedule playtest sessions
- As a member, I can sign up to test specific games

**Technical Specs:**
```typescript
interface PlayTestSession {
  id: string;
  gameProjectId: string;
  scheduledDate: Date;
  maxPlayers: number;
  registeredPlayers: string[]; // user IDs
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  venue: string;
  notes: string;
  facilatorId: string;
}

interface QueueEntry {
  id: string;
  gameProjectId: string;
  submittedAt: Date;
  priority: number; // calculated based on member tier, contribution points
  estimatedScheduleDate: Date;
  status: 'queued' | 'scheduled' | 'completed';
}
```

**Priority Algorithm:**
```typescript
const calculatePriority = (user: User, submissionDate: Date): number => {
  let priority = 0;
  
  // Member tier bonus
  priority += user.membershipTier === 'premium' ? 100 : 50;
  
  // Contribution bonus (recent testing activity)
  priority += Math.min(user.totalTestingPoints * 2, 50);
  
  // Time waiting penalty (older submissions get higher priority)
  const daysWaiting = Math.floor((Date.now() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
  priority += daysWaiting * 5;
  
  return priority;
};
```

**API Endpoints:**
```
POST /queue/submit
GET /queue?status=queued
PUT /queue/:id/priority
POST /sessions
GET /sessions?upcoming=true
POST /sessions/:id/register
DELETE /sessions/:id/register
```

**Acceptance Criteria:**
- [ ] Automated priority calculation
- [ ] Email notifications for scheduling
- [ ] Waitlist functionality when sessions are full
- [ ] Conflict detection (same designer can't have multiple games in queue)

---

### **PRIORITY 2: Enhanced Features (Months 3-4)**
*Features that improve user experience and community engagement*

#### P2.1: Feedback & Iteration Tracking
**Business Impact:** Medium | **Technical Complexity:** Medium | **Dependencies:** P1.3

**User Stories:**
- As a playtester, I can submit structured feedback after testing
- As a designer, I can view all feedback for my games
- As a designer, I can track how feedback influenced iterations
- As an admin, I can analyze feedback patterns across all games

**Technical Specs:**
```typescript
interface Feedback {
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

interface GameIteration {
  id: string;
  gameProjectId: string;
  version: string;
  changesDescription: string;
  inspiringFeedback: string[]; // feedback IDs that led to changes
  createdAt: Date;
}
```

**API Endpoints:**
```
POST /feedback
GET /feedback?gameId=:gameId
PUT /feedback/:id
POST /iterations
GET /iterations?gameId=:gameId
```

---

#### P2.2: Gamification & Points System
**Business Impact:** Medium | **Technical Complexity:** Low | **Dependencies:** P1.1, P1.3

**User Stories:**
- As a member, I can see my contribution points and ranking
- As a member, I can view leaderboards for different activities
- As a member, I can earn badges for milestones
- As an admin, I can adjust point values for different activities

**Technical Specs:**
```typescript
interface PointTransaction {
  id: string;
  userId: string;
  type: 'playtest_given' | 'game_tested' | 'feedback_quality' | 'iteration_completed' | 'game_published';
  points: number;
  description: string;
  relatedEntityId?: string; // sessionId, feedbackId, etc.
  createdAt: Date;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
}

interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: Date;
}
```

**Point Values:**
- Testing someone's game: 10 points
- Receiving game test: 5 points  
- High-quality feedback (admin rated): 15 points
- Game iteration based on feedback: 20 points
- Game publication: 100 points

---

#### P2.3: Session Management Dashboard
**Business Impact:** Medium | **Technical Complexity:** Medium | **Dependencies:** P1.3

**User Stories:**
- As an admin, I can view real-time session status
- As an admin, I can manage multiple concurrent playtest tables
- As a facilitator, I can track session timing and logistics
- As an admin, I can generate session reports

**Features:**
- Real-time session dashboard
- Timer functionality for testing rounds
- Table assignment management
- Session notes and logistics tracking
- Automated session summary generation

---

### **PRIORITY 3: Advanced Features (Months 5-6)**
*Features for scaling and advanced community management*

#### P3.1: Analytics & Reporting Dashboard
**Business Impact:** High | **Technical Complexity:** High | **Dependencies:** All previous

**Admin Analytics:**
- Member engagement metrics
- Game progression analytics
- Session attendance patterns
- Revenue and growth tracking
- Feedback sentiment analysis

**Designer Analytics:**
- Game development progress
- Feedback trends over iterations
- Playtester engagement with their games
- Publication readiness scoring

**Technical Specs:**
```typescript
interface AnalyticsEvent {
  id: string;
  eventType: string;
  userId?: string;
  sessionId?: string;
  gameProjectId?: string;
  metadata: Record<string, any>;
  timestamp: Date;
}
```

---

#### P3.2: Mobile-First Responsive Design
**Business Impact:** Medium | **Technical Complexity:** Medium | **Dependencies:** UI components

**Features:**
- Progressive Web App (PWA) capabilities
- Offline functionality for basic features
- Push notifications for scheduling
- Mobile-optimized feedback forms
- Quick check-in for sessions

---

#### P3.3: Community Features
**Business Impact:** Medium | **Technical Complexity:** Medium | **Dependencies:** P1.1, P1.2

**User Stories:**
- As a member, I can post in community discussions
- As a member, I can find collaboration partners
- As a member, I can share resources and articles
- As a member, I can organize special interest groups

**Features:**
- Discussion forums by topic
- Resource sharing library
- Collaboration matching system
- Event calendar for special events
- Mentorship program management

---

#### P3.4: External Integrations
**Business Impact:** Low | **Technical Complexity:** High | **Dependencies:** Core platform

**Features:**
- BoardGameGeek integration
- Publisher database connections
- Social media auto-posting
- Calendar integrations (Google Calendar)
- Print-on-demand service connections

---

## Database Architecture

### **Core Tables:**
```sql
-- Users and Authentication
users, user_sessions, membership_payments

-- Game Projects
game_projects, game_versions, game_materials, project_tags

-- Community Sessions
playtest_sessions, queue_entries, session_registrations

-- Feedback System
feedback_submissions, feedback_ratings, game_iterations

-- Gamification
point_transactions, badges, user_badges, leaderboards

-- Analytics
analytics_events, session_metrics, user_engagement_metrics
```

### **Key Relationships:**
- Users → Game Projects (1:many)
- Game Projects → Queue Entries (1:many)
- Sessions → Feedback (1:many)
- Feedback → Game Iterations (many:1)

---

## Technical Stack Recommendations

### **Frontend:**
- **Framework:** Next.js 14+ (React with SSR)
- **Styling:** Tailwind CSS + Shadcn/ui components
- **State Management:** Zustand or React Query
- **Forms:** React Hook Form + Zod validation

### **Backend:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL 15+
- **ORM:** Prisma
- **Authentication:** NextAuth.js or Auth0

### **Infrastructure:**
- **Hosting:** Vercel (frontend) + Railway/Render (backend)
- **Database:** Supabase or Neon
- **File Storage:** Cloudinary or AWS S3
- **Email:** SendGrid or Resend

### **Development:**
- **Monorepo:** Turborepo
- **Testing:** Vitest + Playwright
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry + LogRocket

---

## Success Metrics & KPIs

### **Technical Metrics:**
- 99.5% uptime
- <2s page load times
- <500ms API response times
- Zero data loss tolerance

### **Product Metrics:**
- 90% member adoption within 3 months
- 80% session booking rate
- 50% reduction in admin manual work
- 30% increase in game iterations per project

### **Business Metrics:**
- 25% increase in publication rate
- 85% member retention
- 40% increase in community engagement
- Break-even on development costs within 12 months

---

## Implementation Timeline

### **Month 1-2: Core MVP**
- User auth & membership
- Basic project management
- Simple queue system

### **Month 3-4: Enhanced UX**
- Feedback system
- Gamification
- Session management

### **Month 5-6: Scale Features**
- Analytics dashboard
- Mobile optimization
- Community features

### **Month 7+: Growth & Optimization**
- A/B testing framework
- Advanced analytics
- Multi-community support

Thoughts on this technical roadmap? Should we dive deeper into any specific component or start with technical architecture decisions?