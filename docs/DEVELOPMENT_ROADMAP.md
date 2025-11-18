# BoardGameBoost - Development Roadmap

**Version:** 1.0
**Date:** 2025-11-18
**Timeline:** 12 Sprints (24 weeks / 6 months)
**Sprint Duration:** 2 weeks

---

## Table of Contents

1. [Overview](#overview)
2. [Sprint Plan](#sprint-plan)
3. [Release Milestones](#release-milestones)
4. [Resource Allocation](#resource-allocation)
5. [Risk Management](#risk-management)
6. [Success Criteria](#success-criteria)

---

## Overview

### Development Philosophy

- **Iterative Delivery:** Ship functional features every sprint
- **User-Centric:** Real user testing after every 2 sprints
- **Quality First:** No technical debt accumulation
- **Documentation:** Update docs alongside code

### Release Strategy

**Alpha (After Sprint 4):**
- Core CRUD functionality
- Internal testing only
- 10-20 test users

**Beta (After Sprint 8):**
- Full MVP feature set
- Community beta (50-100 users)
- Public but limited access

**v1.0 Launch (After Sprint 12):**
- Polished, tested, documented
- Public release
- Marketing push

---

## Sprint Plan

### Sprint 1-2: Critical Forms & CRUD (Weeks 1-4)

**Goal:** Enable basic data input and management

#### Sprint 1 (Week 1-2)

**Database Setup**
- [ ] Create Supabase project
- [ ] Run database migrations (all tables)
- [ ] Set up Row-Level Security policies
- [ ] Create Edge Functions (priority, points)
- [ ] Generate TypeScript types from schema

**Project Management - Part 1**
- [ ] Project creation form component
  - Multi-step wizard (basic info → details → materials)
  - Zod validation schema
  - React Hook Form integration
  - Auto-save drafts to localStorage
- [ ] Supabase API functions (createProject, updateProject)
- [ ] Connect form to database
- [ ] Success/error handling with toasts

**Developer Tools**
- [ ] Set up React Query for server state
- [ ] Create API client pattern
- [ ] Error boundary implementation
- [ ] Toast notification system

**Testing**
- [ ] Unit tests for validation schemas
- [ ] Integration tests for form submission
- [ ] Manual E2E testing checklist

#### Sprint 2 (Week 3-4)

**Project Management - Part 2**
- [ ] Project edit form (reuse creation components)
- [ ] Project deletion with confirmation
- [ ] Project visibility toggle (public/private)
- [ ] Project archive functionality
- [ ] Optimistic UI updates

**File Upload System**
- [ ] File upload component (drag & drop)
- [ ] Supabase Storage bucket setup
- [ ] Upload to project-materials bucket
- [ ] File type and size validation
- [ ] Upload progress indicator
- [ ] File deletion functionality

**Profile Management**
- [ ] Profile edit form
- [ ] Avatar upload
- [ ] Bio editor (markdown support)
- [ ] Social links fields
- [ ] Notification preferences

**Testing & Documentation**
- [ ] User acceptance testing (UAT) scenarios
- [ ] Update component documentation
- [ ] Write API usage examples

**Sprint 1-2 Deliverables:**
- ✅ Users can create, edit, delete projects
- ✅ Users can upload files to projects
- ✅ Users can edit their profiles
- ✅ All forms have proper validation

---

### Sprint 3-4: Queue, Sessions & Registration (Weeks 5-8)

**Goal:** Functional playtest queue and session management

#### Sprint 3 (Week 5-6)

**Queue Submission**
- [ ] "Submit to Queue" button on project page
- [ ] Readiness validation (has materials, rules, etc.)
- [ ] Queue submission form/modal
  - Confirm game is ready
  - Show estimated wait time
  - Explain priority system
- [ ] Create queue_entry in database
- [ ] Trigger priority calculation Edge Function
- [ ] Success confirmation with queue position

**Queue Display**
- [ ] Queue page enhancements
  - Real-time priority updates
  - Filter by status
  - Sort by priority
  - Pagination
- [ ] Queue entry cards showing:
  - Game info
  - Designer info
  - Priority score breakdown
  - Days waiting
  - Estimated schedule date

**Session Registration (User)**
- [ ] Session card component
  - Game details
  - Date, time, venue
  - Spots remaining
  - Register/unregister button
- [ ] Registration modal
  - Confirm attendance
  - Add to calendar option
  - Reminder preferences
- [ ] Create session_registration record
- [ ] Handle capacity limits
- [ ] Waitlist functionality

**Notifications - Part 1**
- [ ] Email service setup (Resend/SendGrid)
- [ ] Email templates (welcome, session scheduled)
- [ ] Send email on session registration
- [ ] In-app notifications table
- [ ] Notification bell component

#### Sprint 4 (Week 7-8)

**Session Management (Admin)**
- [ ] Admin panel foundation
  - Protected routes (admin role check)
  - Admin layout with nav
- [ ] Session creation form
  - Select game from queue
  - Set date, time, venue
  - Set capacity
  - Assign facilitator
  - Add notes
- [ ] Batch actions on queue
  - Schedule multiple games
  - Bulk status updates
- [ ] Session editing and cancellation
- [ ] Email notifications to designer & attendees

**Session Status Updates**
- [ ] Mark session as "ongoing"
- [ ] Mark session as "completed"
- [ ] Attendance tracking
  - Mark attendees present/absent
  - No-show tracking
- [ ] Trigger feedback request emails

**Calendar Integration**
- [ ] Generate .ics calendar files
- [ ] Download calendar event
- [ ] Google Calendar quick-add link

**Testing**
- [ ] Admin workflow testing
- [ ] Registration flow E2E tests
- [ ] Email delivery testing

**Sprint 3-4 Deliverables:**
- ✅ Designers can submit games to queue
- ✅ Users can register for sessions
- ✅ Admins can schedule sessions from queue
- ✅ Email notifications working
- **Milestone:** Alpha Release (Internal Testing)

---

### Sprint 5-6: Feedback & Iterations (Weeks 9-12)

**Goal:** Complete feedback loop with iterations

#### Sprint 5 (Week 9-10)

**Feedback Submission**
- [ ] Feedback form component
  - 5 rating sliders (fun, clarity, balance, theme, mechanics)
  - 4 comment text areas (liked, disliked, suggestions, confusing)
  - Behavioral checkboxes (would play again, recommend)
  - Anonymous submission option
  - Mobile-optimized layout
- [ ] Validation (require all ratings, at least one comment)
- [ ] Auto-save drafts
- [ ] Submit feedback to database
- [ ] Award points to playtester (+10)

**Feedback Display**
- [ ] Feedback tab on project detail page
- [ ] Feedback cards showing:
  - Tester name (or "Anonymous")
  - Date submitted
  - Star ratings
  - Comments categorized
- [ ] Filter feedback by session/date
- [ ] Export feedback to PDF

**Feedback Analytics Dashboard**
- [ ] Average ratings calculation
- [ ] Radar chart component (5 dimensions)
- [ ] Rating trends over time (line chart)
- [ ] Common keywords extraction
- [ ] Sentiment summary (positive/negative ratio)

#### Sprint 6 (Week 11-12)

**Iteration Creation**
- [ ] "Create Iteration" form
  - Version number input (with guidance)
  - Changes description (markdown editor)
  - Select inspiring feedback (multi-select checkboxes)
  - Upload new materials
- [ ] Link iteration to feedback IDs
- [ ] Update project current_version
- [ ] Award points to designer (+20)

**Iteration Display**
- [ ] Iterations tab on project page
- [ ] Iteration timeline visualization
- [ ] Iteration cards showing:
  - Version number
  - Date created
  - Changes description
  - Linked feedback (click to view)
  - Materials diff (new files highlighted)
- [ ] Version comparison view (side-by-side)

**Designer-Feedback Interaction**
- [ ] Reply to feedback (thank you message)
- [ ] Mark feedback as "addressed in iteration"
- [ ] Ask follow-up questions to tester
- [ ] Notification to tester when replied

**Testing & Polish**
- [ ] Feedback workflow E2E testing
- [ ] Analytics accuracy verification
- [ ] UI/UX polish pass
- [ ] Performance optimization

**Sprint 5-6 Deliverables:**
- ✅ Playtesters can submit structured feedback
- ✅ Designers can view feedback analytics
- ✅ Designers can create iterations linked to feedback
- ✅ Complete feedback loop functional

---

### Sprint 7-8: Gamification & Points (Weeks 13-16)

**Goal:** Automated points system and community features

#### Sprint 7 (Week 13-14)

**Points Automation**
- [ ] Edge Function: award_points
  - Trigger on feedback insert (+10 to tester)
  - Trigger on session complete (+5 to designer)
  - Trigger on iteration insert (+20 to designer)
  - Trigger on game published (+100 to designer)
- [ ] Point transaction logging
- [ ] Update user total points (contribution & testing)
- [ ] Point balance component with animation
- [ ] Points history page
  - Transaction log
  - Filter by type
  - Monthly summary

**Badge System**
- [ ] Seed badge definitions in database
- [ ] Edge Function: check_badge_unlocks
  - Runs after point transactions
  - Checks criteria for all badges
  - Awards badge if criteria met
  - Sends notification
- [ ] Badge unlock modal with animation
- [ ] Badge showcase on profile
  - Grid of earned badges
  - Locked badges (greyed out)
  - Progress toward next badge
- [ ] Badge detail modal (how to earn)

**Leaderboard Enhancements**
- [ ] Multiple leaderboard types
  - All-time (current)
  - Monthly
  - Weekly
  - By category (testers, designers)
- [ ] Leaderboard filters and tabs
- [ ] Highlight current user position
- [ ] Climb/drop indicators (↑/↓)
- [ ] Top 3 special styling (gold/silver/bronze)

#### Sprint 8 (Week 15-16)

**Notifications - Part 2**
- [ ] Notification bell with unread count
- [ ] Notification center dropdown
  - List all notifications
  - Group by type
  - Mark as read
  - Dismiss notification
  - Click to navigate to related content
- [ ] Notification types:
  - Session scheduled
  - Feedback received
  - Badge unlocked
  - Points earned
  - Queue position update
- [ ] Email notification templates
  - Session reminder (24h before)
  - Weekly digest
  - Feedback summary
- [ ] Notification preferences in profile

**Stage-Specific Dashboards - Part 1**
- [ ] Dashboard component architecture
- [ ] Concept stage dashboard
  - Checklist: define mechanics, audience, theme
  - Resources: articles, templates
  - CTA: Move to Prototype
- [ ] Prototype stage dashboard
  - Checklist: build prototype, test basics, upload materials
  - Resources: prototyping guides
  - CTA: Submit to queue
- [ ] Stage transition assistant modal
  - Congrats message
  - Next stage preview
  - Confirm transition button

**Testing & Beta Prep**
- [ ] Full regression testing
- [ ] Performance audit
- [ ] Security audit
- [ ] Bug bash session
- [ ] Beta user onboarding materials

**Sprint 7-8 Deliverables:**
- ✅ Points automatically awarded for all actions
- ✅ Badge system fully functional
- ✅ Notifications working (email + in-app)
- ✅ Stage-specific guidance launched
- **Milestone:** Beta Release (Community Testing)

---

### Sprint 9-10: AI & Analytics (Weeks 17-20)

**Goal:** AI-powered insights and advanced analytics

#### Sprint 9 (Week 17-18)

**AI Feedback Summarization**
- [ ] Anthropic Claude API integration
- [ ] Feedback summarization Edge Function
  - Collect all feedback for a project
  - Generate summary with Claude
  - Extract key themes
  - Identify priority issues
  - Suggest improvements
- [ ] AI insights component on project page
  - Summary paragraph
  - Key themes (tagged)
  - Priority issues list
  - Improvement suggestions
- [ ] Regenerate summary button
- [ ] Cache summaries for performance

**AI Design Assistant (Experimental)**
- [ ] Mechanic compatibility checker
  - Input: selected mechanics
  - Output: potential conflicts/synergies
- [ ] Theme consistency analyzer
  - Input: project description
  - Output: theme integration score
- [ ] Playtime estimator
  - Input: mechanics, complexity, player count
  - Output: estimated play time range
- [ ] Balance suggestions
  - Input: feedback ratings
  - Output: specific balance recommendations

#### Sprint 10 (Week 19-20)

**Designer Analytics Dashboard**
- [ ] Project analytics page
  - Views count over time
  - Playtest attendance stats
  - Feedback trends (ratings over iterations)
  - Iteration velocity
  - Time in each stage
  - Publication readiness score
- [ ] Multi-project comparison
  - Compare ratings across projects
  - Identify best-performing mechanics
- [ ] Export analytics to PDF/CSV

**Admin Analytics Dashboard**
- [ ] Community health metrics
  - Active members (DAU, MAU)
  - New signups per month
  - Retention rates (30/60/90 day)
- [ ] Engagement metrics
  - Sessions per month
  - Feedback submissions
  - Iteration rate
  - Projects by stage distribution
- [ ] Queue health
  - Average wait time
  - Queue length over time
  - Session utilization rate
- [ ] Revenue tracking (if premium launched)
  - Premium conversions
  - MRR growth
  - Churn rate

**Advanced Filtering & Search**
- [ ] Full-text search (PostgreSQL tsvector)
- [ ] Advanced filters on projects page
  - Multi-select mechanics
  - Complexity range slider
  - Player count range
  - Play time range
  - Designer filter
  - Stage filter
- [ ] Save filter presets
- [ ] Sort options (newest, popular, rating)

**Sprint 9-10 Deliverables:**
- ✅ AI-powered feedback summarization
- ✅ Designer analytics dashboard
- ✅ Admin analytics dashboard
- ✅ Advanced search and filtering

---

### Sprint 11-12: Polish, Testing & Launch Prep (Weeks 21-24)

**Goal:** Production-ready platform with exceptional UX

#### Sprint 11 (Week 21-22)

**UX Polish Pass**
- [ ] Loading states everywhere (skeletons)
- [ ] Empty states with helpful CTAs
- [ ] Error states with recovery options
- [ ] Success confirmations
- [ ] Micro-interactions library
  - Button hover/click animations
  - Form validation animations
  - Points earning animation
  - Badge unlock animation
  - Stage transition animation
- [ ] Onboarding tour (interactive walkthrough)
- [ ] Help tooltips throughout app

**Mobile Optimization**
- [ ] Mobile navigation (bottom tabs)
- [ ] Touch gesture support
- [ ] Mobile-optimized forms (one field per step)
- [ ] Large touch targets (44x44px minimum)
- [ ] Mobile feedback form redesign
- [ ] Mobile session cards
- [ ] PWA manifest and service worker
- [ ] Offline support (view projects/feedback)
- [ ] Add to home screen prompt

**Accessibility Audit**
- [ ] Keyboard navigation testing
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Color contrast fixes
- [ ] ARIA labels review
- [ ] Focus management improvements
- [ ] Form accessibility enhancements
- [ ] Error announcements
- [ ] Skip links

#### Sprint 12 (Week 23-24)

**Performance Optimization**
- [ ] Lighthouse audit (target: 90+)
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting and lazy loading
- [ ] Bundle size reduction
- [ ] Database query optimization
- [ ] Implement caching strategies
- [ ] CDN for static assets

**Testing & QA**
- [ ] Comprehensive E2E test suite
  - User onboarding flow
  - Project creation flow
  - Queue submission flow
  - Feedback submission flow
  - Iteration creation flow
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (iOS, Android)
- [ ] Load testing (100 concurrent users)
- [ ] Security penetration testing
- [ ] Bug bash with team

**Documentation & Training**
- [ ] User guide documentation
- [ ] Video tutorials (project creation, feedback, etc.)
- [ ] Admin training materials
- [ ] API documentation (for future integrations)
- [ ] Troubleshooting guide
- [ ] FAQ page

**Launch Preparation**
- [ ] Marketing website copy
- [ ] Social media assets
- [ ] Press kit
- [ ] Beta feedback incorporation
- [ ] Production deployment checklist
- [ ] Monitoring and alerting setup
- [ ] Backup and disaster recovery plan

**Sprint 11-12 Deliverables:**
- ✅ Polished, accessible, performant UX
- ✅ Comprehensive testing completed
- ✅ Documentation finalized
- ✅ Production deployment ready
- **Milestone:** v1.0 Public Launch 🚀

---

## Release Milestones

### Alpha Release (After Sprint 4)

**Date:** Week 8
**Users:** 10-20 internal testers
**Features:**
- Project CRUD
- Profile management
- Queue submission
- Session registration
- Admin session scheduling

**Success Criteria:**
- 0 critical bugs
- All core workflows functional
- Positive feedback from testers

---

### Beta Release (After Sprint 8)

**Date:** Week 16
**Users:** 50-100 community members
**Features:**
- Everything from Alpha
- Feedback submission & display
- Iteration tracking
- Points & badges
- Notifications
- Stage dashboards

**Success Criteria:**
- 80% feature completeness
- <5 high-priority bugs
- 70%+ user satisfaction
- 60%+ complete first project

---

### v1.0 Launch (After Sprint 12)

**Date:** Week 24
**Users:** Public (target 100+ in first month)
**Features:**
- Complete MVP feature set
- AI insights
- Advanced analytics
- Mobile PWA
- Full accessibility

**Success Criteria:**
- 0 critical bugs, <3 high bugs
- 90+ Lighthouse score
- WCAG AA compliant
- 75%+ user satisfaction
- 20+ new signups per month

---

## Resource Allocation

### Team Structure

**Ideal Team:**
- 1 Full-stack Developer (primary)
- 1 Part-time Frontend Developer
- 1 Designer/UX (consultant basis)
- 1 Community Manager (part-time, from Sprint 8)

**Minimum Viable Team:**
- 1 Full-stack Developer
- 1 Designer (10 hours/sprint for Sprint 1-4, 11-12)

### Time Allocation per Sprint

**Development:** 60% (coding, implementation)
**Testing:** 20% (unit, integration, E2E)
**Documentation:** 10% (code docs, user guides)
**Meetings & Planning:** 10% (sprint planning, retro)

---

## Risk Management

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Supabase outage | Low | High | Have backup, monitor status |
| Performance issues at scale | Medium | Medium | Early load testing, optimization |
| Complex RLS policies | Medium | Low | Extensive testing, clear docs |
| File upload failures | Low | Medium | Retry logic, clear error messages |

### Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Low user adoption | Medium | High | Marketing, onboarding UX, value demos |
| Playtester shortage | Medium | High | Gamification, tester benefits |
| Poor feedback quality | High | Medium | Templates, examples, quality badges |
| Feature creep | High | Medium | Strict sprint scope, prioritization |

### Schedule Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Unexpected complexity | Medium | Medium | Buffer time, flexible scope |
| Developer availability | Low | High | Clear docs, knowledge sharing |
| Dependency delays (APIs) | Low | Medium | Plan alternatives, mock early |

---

## Success Criteria

### Sprint Success Metrics

Each sprint considered successful if:
- ✅ All planned features implemented
- ✅ 0 critical bugs, <3 high-priority bugs
- ✅ Code review completed
- ✅ Tests passing (80%+ coverage)
- ✅ Documentation updated
- ✅ Demo to stakeholders completed

### Release Success Metrics

**Alpha Success:**
- 10+ active testers
- All core workflows functional
- Feedback collected and prioritized

**Beta Success:**
- 50+ active users
- 30+ projects created
- 20+ playtest sessions completed
- 70%+ positive feedback

**v1.0 Success:**
- 100+ registered users
- 50+ active monthly users
- 10+ games reach publishing stage
- 75%+ NPS score
- <1% error rate
- 90+ Lighthouse score

---

## Sprint Ceremonies

### Sprint Planning (Week Start)

**Duration:** 2 hours
**Attendees:** Full team
**Agenda:**
1. Review previous sprint
2. Prioritize backlog
3. Select sprint goals
4. Break down tasks
5. Assign responsibilities
6. Set definition of done

### Daily Standups

**Duration:** 15 minutes
**Format:** Async (Slack) or sync call
**Questions:**
1. What did you complete yesterday?
2. What are you working on today?
3. Any blockers?

### Sprint Review (Week End)

**Duration:** 1 hour
**Attendees:** Team + stakeholders
**Agenda:**
1. Demo completed features
2. Collect feedback
3. Review sprint metrics
4. Discuss next priorities

### Sprint Retrospective

**Duration:** 1 hour
**Attendees:** Team only
**Agenda:**
1. What went well?
2. What could be improved?
3. Action items for next sprint

---

## Backlog Management

### Backlog Prioritization (MoSCoW)

**Must Have (P0):**
- Critical to release
- Blocks other work
- Security/legal requirement

**Should Have (P1):**
- Important but not critical
- Has workaround
- Significantly improves UX

**Could Have (P2):**
- Nice to have
- Low effort, high value
- Can be deferred

**Won't Have (P3):**
- Not in scope
- Future consideration
- Low value

---

## Post-Launch Roadmap (v1.1+)

**v1.1 (Sprint 13-14):**
- Discussion forums
- Resource library
- Mentorship matching

**v1.2 (Sprint 15-16):**
- Publisher database
- Sell sheet generator
- Pitch deck templates

**v1.3 (Sprint 17-18):**
- Multi-community support
- White-label options
- Advanced admin tools

**v2.0 (Future):**
- Mobile native apps (iOS/Android)
- International expansion (i18n)
- API for third-party integrations
- BoardGameGeek integration

---

## Appendix

### Definition of Done

A feature is "done" when:
- ✅ Code implemented and peer-reviewed
- ✅ Unit tests written and passing
- ✅ Integration tests passing
- ✅ UI matches designs
- ✅ Accessibility requirements met
- ✅ Documentation updated
- ✅ Deployed to staging
- ✅ QA sign-off
- ✅ Product owner acceptance

### Git Workflow

**Branches:**
- `main` - Production code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes

**Process:**
1. Create feature branch from `develop`
2. Commit with conventional commits
3. Open PR with description
4. Code review (1+ approval)
5. Merge to `develop`
6. Deploy to staging
7. Merge `develop` to `main` at sprint end
8. Deploy to production

---

**Document Status:** Living roadmap, updated after each sprint
**Last Updated:** 2025-11-18
**Next Review:** End of Sprint 1
