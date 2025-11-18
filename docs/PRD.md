# BoardGameBoost - Product Requirements Document (PRD)

**Version:** 2.0
**Date:** 2025-11-18
**Status:** Active Development
**Owner:** BoardGameBoost Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Users](#target-users)
4. [User Stories](#user-stories)
5. [Feature Requirements](#feature-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Success Metrics](#success-metrics)
8. [Release Plan](#release-plan)

---

## Executive Summary

BoardGameBoost transforms the chaotic board game design journey into a structured, community-supported framework. By guiding designers through six proven stages—from initial concept to published product—the platform provides clarity, feedback, and momentum for both new and veteran designers.

**Problem Statement:**
Board game designers struggle with unclear next steps, difficulty finding playtesters, inconsistent feedback quality, and lost momentum between iterations.

**Solution:**
A structured framework platform that:
- Provides clear stage-by-stage guidance
- Automates fair playtest scheduling
- Collects structured, actionable feedback
- Tracks iterations and improvement
- Builds community through gamification
- Guides designers toward publication

---

## Product Vision

### Vision Statement
*"Every board game designer deserves a clear path from concept to publishing, supported by an engaged community and powered by intelligent tools."*

### Core Principles

1. **Framework-Driven:** Six stages provide structure without rigidity
2. **Community-Powered:** Success comes from mutual support
3. **Feedback-Focused:** Structured insights drive iteration
4. **Progress-Oriented:** Celebrate journey, not just destination
5. **Transparent & Fair:** Equal opportunity, merit-based priority

### Three-Year Goals

**Year 1 (2025):**
- 100+ active designers
- 500+ playtest sessions completed
- 10+ games reach publishing stage
- 85% designer retention

**Year 2 (2026):**
- 500+ active designers
- Multi-city chapters
- Publisher partnership program
- 25+ games published

**Year 3 (2027):**
- International expansion
- 2000+ active designers
- Industry standard for playtesting
- 100+ games published through platform

---

## Target Users

### Primary Personas

#### 1. **Nova Designer (New Designer)**
**Demographics:**
- Age: 22-35
- Experience: 0-2 games designed
- Motivation: Passion for games, creative outlet
- Pain Points: Don't know where to start, isolated, unclear if ideas are good

**Needs:**
- Clear guidance on next steps
- Access to experienced mentors
- Validation of ideas
- Structured learning
- Community belonging

**Success Metrics:**
- Complete first project
- Submit to playtest queue
- Receive constructive feedback
- Complete first iteration

---

#### 2. **Veteran Designer**
**Demographics:**
- Age: 30-50
- Experience: 3+ games designed, may have published
- Motivation: Improve craft, publish more games
- Pain Points: Finding quality playtesters, managing multiple projects, feedback overload

**Needs:**
- Efficient playtest pipeline
- Professional workflow tools
- Quality feedback, less noise
- Analytics and insights
- Industry connections

**Success Metrics:**
- Manage 2-3 concurrent projects
- Regular playtest schedule
- Measurable iteration improvements
- Successful publishing

---

#### 3. **Active Playtester**
**Demographics:**
- Age: 25-45
- Experience: Game enthusiast, may or may not design
- Motivation: Play unreleased games, help community
- Pain Points: Want to help but don't know how, feedback not valued

**Needs:**
- Easy session discovery and registration
- Recognition for contributions
- Structured feedback templates
- See impact of their feedback

**Success Metrics:**
- Attend 2+ sessions per month
- Provide quality feedback
- Earn community recognition
- Feel valued contributor

---

#### 4. **Community Facilitator (Admin)**
**Demographics:**
- Age: 28-50
- Role: Community organizer, experienced designer
- Motivation: Build thriving design community
- Pain Points: Manual scheduling, tracking engagement, ensuring fairness

**Needs:**
- Efficient session management
- Fair queue algorithm
- Community health metrics
- Moderation tools
- Automated communications

**Success Metrics:**
- 90%+ session capacity
- Fair queue perception
- Low admin overhead
- High community satisfaction

---

## User Stories

### Epic 1: Designer Onboarding & First Project

```
As a new designer,
I want a guided onboarding experience,
So that I understand how to use the platform to develop my game.
```

**Acceptance Criteria:**
- Welcome tour highlights key features
- Stage framework explanation
- First project creation wizard
- Community guidelines introduction
- Membership benefits clarity

---

### Epic 2: Stage-by-Stage Game Development

#### Concept Stage

```
As a designer in the Concept stage,
I want tools to crystallize my game idea,
So that I have a clear vision before prototyping.
```

**Features:**
- Design canvas for brainstorming
- Core mechanics checklist
- Target audience definition
- Theme/mechanics tag selection
- Inspiration library access

---

#### Prototype Stage

```
As a designer in the Prototype stage,
I want to organize my prototype materials and prepare for testing,
So that I can get quality feedback.
```

**Features:**
- Component checklist generator
- Rules document upload
- Prototype photo gallery
- Print-and-play file management
- Playtest readiness validator

---

#### Playtesting Stage

```
As a designer in the Playtesting stage,
I want my game tested by diverse players with structured feedback,
So that I can identify what works and what doesn't.
```

**Features:**
- Submit to playtest queue
- Automated fair scheduling
- Structured feedback collection
- Session attendance tracking
- Feedback analytics dashboard

---

#### Refining Stage

```
As a designer in the Refining stage,
I want to track iterations and link them to specific feedback,
So that I can demonstrate improvement to publishers.
```

**Features:**
- Create iteration with version number
- Link to inspiring feedback
- Document changes made
- Upload updated materials
- Compare versions side-by-side

---

#### Pitching Stage

```
As a designer in the Pitching stage,
I want tools to prepare for publisher presentations,
So that I can increase my chances of publication.
```

**Features:**
- Sell sheet generator
- Publisher database search
- Pitch deck template
- Testimonial collector from playtesters
- Success metrics summary

---

#### Published Stage

```
As a designer with a published game,
I want to showcase my success and mentor others,
So that I can give back to the community.
```

**Features:**
- Success story showcase
- Mentor program enrollment
- Post-launch analytics
- Expansion project tracker
- Legacy profile badge

---

### Epic 3: Playtest Queue & Session Management

```
As a playtester,
I want to easily find and register for upcoming sessions,
So that I can help designers and play interesting games.
```

**Acceptance Criteria:**
- Browse upcoming sessions
- View game details before registering
- One-click registration
- Calendar integration
- Reminder notifications

---

```
As an admin,
I want to efficiently schedule sessions with automatic priority,
So that the queue is fair and sessions are full.
```

**Acceptance Criteria:**
- View prioritized queue
- Create session for top-priority game
- Set date, time, venue, capacity
- Automatically notify designer
- Track RSVPs and capacity

---

### Epic 4: Structured Feedback System

```
As a playtester,
I want a simple structured form to submit feedback,
So that I can provide helpful insights without overthinking.
```

**Acceptance Criteria:**
- Rate on 5 dimensions (1-5 scale)
- Provide comments for 4 categories
- Yes/No behavioral questions
- Mobile-friendly form
- Anonymous option

---

```
As a designer,
I want to see feedback patterns across multiple sessions,
So that I can make data-driven design decisions.
```

**Acceptance Criteria:**
- View average ratings per dimension
- See rating trends over iterations
- Read all qualitative comments
- Filter by session/version
- Export feedback report (PDF)

---

### Epic 5: Gamification & Community

```
As an active member,
I want to earn points and recognition for my contributions,
So that I feel valued and motivated to stay engaged.
```

**Acceptance Criteria:**
- Auto-earn points for actions
- View points history/transactions
- See leaderboard position
- Earn badges for milestones
- Display badges on profile

---

```
As a premium member,
I want priority queue access as a benefit,
So that my membership investment provides tangible value.
```

**Acceptance Criteria:**
- Premium tier bonus in priority algorithm
- Early access to new features
- Extended file storage
- Profile customization options
- Special badge

---

## Feature Requirements

### Phase 1: Functional MVP (Sprints 1-4)

#### FR-1: Project Management

**FR-1.1: Create New Project**
- Multi-step wizard (basic info → details → materials)
- Required fields: title, description, stage, player count, play time
- Optional fields: complexity, mechanics, theme tags
- Auto-save drafts
- Validation: title unique per designer

**FR-1.2: Edit Project**
- Edit all project fields
- Update stage manually
- Add/remove materials (upload files)
- Public/private visibility toggle
- Delete/archive project (with confirmation)

**FR-1.3: View Projects**
- Grid and list view toggle
- Filter by: stage, designer, mechanics, complexity
- Search by title/description
- Sort by: newest, oldest, popular, stage
- Pagination (20 per page)

---

#### FR-2: Playtest Queue System

**FR-2.1: Submit to Queue**
- Validate game is ready (has materials, rules)
- Confirm submission modal
- Show estimated wait time
- Auto-calculate priority on submission

**FR-2.2: Session Registration**
- View upcoming sessions with game details
- Register for session (one-click)
- Unregister before deadline (48 hours)
- Waitlist when full
- Auto-promote from waitlist

**FR-2.3: Session Management (Admin)**
- Create session from queue
- Select game, date, time, venue, capacity
- Assign facilitator
- Send email notifications
- Cancel/reschedule session

---

#### FR-3: Feedback System

**FR-3.1: Submit Feedback**
- Access form via email link after session
- Rate 5 dimensions (1-5 stars)
- Provide comments (4 text fields)
- Answer behavioral questions (checkboxes)
- Submit anonymously option
- Mobile-responsive form

**FR-3.2: View Feedback**
- Designer sees all feedback for their project
- Filter by session, iteration, rating
- Average ratings with visual charts
- Export to PDF report
- Reply to feedback (thank you message)

**FR-3.3: Feedback Analytics**
- Average ratings per dimension over time
- Sentiment trend visualization
- Common keywords/themes
- Compare iterations

---

#### FR-4: Iteration Tracking

**FR-4.1: Create Iteration**
- Form: version number, changes description
- Select inspiring feedback (multi-select)
- Upload new materials
- Automatic created date
- Link to previous version

**FR-4.2: View Iterations**
- Timeline visualization of iterations
- Side-by-side version comparison
- Changelog display
- Linked feedback highlight
- Download version materials

---

#### FR-5: User Profile & Settings

**FR-5.1: Edit Profile**
- Update display name
- Upload avatar image
- Add bio/designer statement (markdown)
- Social links (website, Twitter, BGG)
- Notification preferences
- Privacy settings

**FR-5.2: View Profile**
- Display name, avatar, bio
- Membership tier and points
- Badges earned
- Active projects showcase
- Published games showcase
- Contribution history

---

### Phase 2: Enhanced Experience (Sprints 5-8)

#### FR-6: Stage-Specific Workflows

**FR-6.1: Stage Transition Assistant**
- Suggest stage transition when criteria met
- Checklist for each stage
- Confirm transition modal with next steps
- Auto-update project stage

**FR-6.2: Stage-Specific Dashboards**
- Custom dashboard per stage
- Recommended actions
- Resources and guides
- Progress indicators

---

#### FR-7: AI-Powered Insights

**FR-7.1: Feedback Summarization**
- AI-generated summary of all feedback
- Key themes identification
- Priority issues ranking
- Improvement suggestions

**FR-7.2: Design Assistant**
- Mechanic compatibility checks
- Balance suggestions
- Theme consistency analysis
- Playtime estimation

---

#### FR-8: Community Features

**FR-8.1: Discussion Forums**
- Topic-based threads
- Rich text editor
- Tag system
- Upvote/downvote
- Search and filter

**FR-8.2: Resource Library**
- Article uploads (PDF, links)
- Categorization (rules writing, balance, etc.)
- Rating system
- Curated collections

**FR-8.3: Events & Workshops**
- Event calendar
- Workshop registration
- Video recordings library
- Design challenges

---

#### FR-9: Notification System

**FR-9.1: Email Notifications**
- Session scheduled
- Reminder 24h before session
- Feedback submitted on your game
- Points earned
- Badge unlocked
- Queue position update

**FR-9.2: In-App Notifications**
- Notification bell icon
- Notification center
- Mark as read
- Notification preferences

---

#### FR-10: Admin Panel

**FR-10.1: Member Management**
- View all members with filters
- Approve/reject applications
- Adjust membership tier
- Manual point adjustments
- View detailed member activity

**FR-10.2: Analytics Dashboard**
- Active members graph
- Session utilization
- Popular mechanics/themes
- Revenue tracking
- Growth metrics

**FR-10.3: System Configuration**
- Point value settings
- Priority algorithm parameters
- Membership pricing
- Email template editing
- Feature flags

---

## Non-Functional Requirements

### Performance

**NFR-1: Page Load Time**
- Initial page load: < 2 seconds
- Subsequent navigations: < 500ms
- API response time: < 300ms (p95)
- Database queries: < 100ms (p95)

**NFR-2: Scalability**
- Support 1000 concurrent users
- Handle 10,000 projects
- Store 100,000 feedback entries
- Process 1000 sessions/month

---

### Security

**NFR-3: Authentication & Authorization**
- Supabase Auth with Row-Level Security
- JWT token-based authentication
- Role-based access control (user, admin, super-admin)
- Session timeout: 7 days

**NFR-4: Data Protection**
- HTTPS only (no HTTP)
- Environment variables for secrets
- Input sanitization (prevent XSS, SQL injection)
- Rate limiting on API endpoints
- File upload validation (type, size)

---

### Reliability

**NFR-5: Uptime & Availability**
- 99.5% uptime SLA
- Graceful degradation
- Error boundaries for UI crashes
- Automatic retry for failed requests

**NFR-6: Data Integrity**
- Database constraints and validations
- Atomic transactions
- Backup daily (Supabase automated)
- Soft deletes for critical data

---

### Usability

**NFR-7: Accessibility**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1)
- Focus indicators

**NFR-8: Responsive Design**
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly tap targets (44x44px minimum)
- Optimized images for mobile

**NFR-9: Browser Support**
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

### Maintainability

**NFR-10: Code Quality**
- TypeScript strict mode
- ESLint with custom rules
- Prettier for formatting
- 80%+ test coverage goal
- Documented components (Storybook future)

**NFR-11: Developer Experience**
- Hot reload in development
- Clear error messages
- Type safety throughout
- Consistent code patterns
- Comprehensive README

---

## Success Metrics

### Product Metrics (KPIs)

**Acquisition:**
- New signups per month: 20+
- Signup conversion rate: 30%
- Time to first project: < 7 days

**Activation:**
- Projects created per designer: 1.5+
- Queue submissions: 50%+ of active projects
- Feedback submission rate: 80%+ of attendees

**Engagement:**
- Monthly active users (MAU): 60+
- Projects per active designer: 2.0+
- Sessions attended per playtester: 2.5/month
- Feedback viewed by designer: 95%+

**Retention:**
- 30-day retention: 70%+
- 90-day retention: 50%+
- Premium retention: 85%+

**Revenue:**
- Premium conversion: 25%+
- Monthly recurring revenue: $500+ (Year 1)
- Churn rate: < 5%/month

**Impact:**
- Iterations per project: 3.0+
- Games reaching publishing stage: 10+ (Year 1)
- Community NPS score: 50+

---

### Technical Metrics

**Performance:**
- Lighthouse score: 90+
- Time to Interactive: < 3s
- First Contentful Paint: < 1s
- Cumulative Layout Shift: < 0.1

**Reliability:**
- Error rate: < 0.1%
- Crash-free sessions: 99.9%
- API uptime: 99.5%+

**Quality:**
- Test coverage: 80%+
- Bug escape rate: < 5%
- Hotfix frequency: < 1/month

---

## Release Plan

### Sprint 0: Foundation (2 weeks) - COMPLETE
- ✅ Project setup
- ✅ Authentication integration
- ✅ Basic UI components
- ✅ Data models

### Sprint 1-2: Critical Forms (4 weeks) - IN PROGRESS
- Project create/edit forms
- Feedback submission form
- Iteration creation form
- Profile editing
- Form validation framework

### Sprint 3-4: Queue & Sessions (4 weeks)
- Queue submission workflow
- Session registration
- Session management (admin)
- Email notifications
- Calendar integration

### Sprint 5-6: Analytics & Points (4 weeks)
- Points automation
- Feedback analytics
- Project analytics
- Leaderboard enhancements
- Badge system completion

### Sprint 7-8: Stage Workflows (4 weeks)
- Stage-specific dashboards
- Transition assistants
- Checklists and guides
- Progress indicators
- Stage recommendations

### Sprint 9-10: Community (4 weeks)
- Discussion forums
- Resource library
- Event calendar
- Mentorship matching

### Sprint 11-12: AI & Polish (4 weeks)
- AI feedback summarization
- Design assistant
- Advanced analytics
- Performance optimization
- Testing & bug fixes

---

## Constraints & Assumptions

### Technical Constraints
- Must use Supabase (already chosen)
- Next.js 15 framework
- Budget: Bootstrap/minimal cost
- Team: 1-2 developers

### Business Constraints
- Initial launch: Yogyakarta only
- English interface (Indonesian future)
- Free tier must be valuable
- Premium pricing: $10-15/month

### Assumptions
- Internet connectivity for all users
- Users have email accounts
- Designers have digital prototypes (or can photograph)
- Community meets in person (hybrid online optional)
- Designers speak English

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Low designer adoption | High | Medium | Marketing, onboarding UX, value demos |
| Playtester shortage | High | Medium | Gamification, tester-specific benefits |
| Poor feedback quality | Medium | High | Templates, examples, quality badges |
| Unfair queue perception | High | Low | Transparent algorithm, clear explanation |
| Technical bugs at launch | Medium | Medium | Testing, staged rollout, monitoring |
| Competition from alternatives | Low | Low | Unique framework approach, community focus |

---

## Appendix

### Glossary
- **Designer:** User creating board games
- **Playtester:** User testing board games (may also design)
- **Facilitator:** Admin organizing playtest sessions
- **Iteration:** Version of a game with documented changes
- **Queue:** Prioritized list of games waiting for playtesting
- **Stage:** One of six development phases in framework

### References
- [CLAUDE.md](../CLAUDE.md) - Project overview
- [README.md](../README.md) - Framework documentation
- [FEATURE_AUDIT.md](./FEATURE_AUDIT.md) - Current state analysis
- [blueprint.md](./blueprint.md) - Design system

---

**Document Status:** Living document, updated as requirements evolve
**Last Updated:** 2025-11-18
**Next Review:** After Sprint 2 completion
