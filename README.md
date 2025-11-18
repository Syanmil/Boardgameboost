# BoardGameBoost

> A structured framework and community platform for board game designers to navigate the journey from concept to publishing.

## Overview

**BoardGameBoost** is more than just a project management tool — it's a comprehensive framework that guides board game designers through the proven stages of game development, from initial concept to published product. Built for the Yogyakarta Board Game Design Club and designed to scale globally, this platform embodies best practices in iterative design, community feedback, and systematic development.

Whether you're a first-time designer with a spark of an idea or a veteran designer managing multiple projects, BoardGameBoost provides the structure, community, and tools you need to transform your game from prototype to published reality.

---

## The BoardGameBoost Framework

### The Six Stages of Game Development

BoardGameBoost structures the game design journey into six progressive stages, each with specific goals and activities:

```
Concept → Prototype → Playtesting → Refining → Pitching → Published
```

#### 1. Concept Stage
**Goal:** Crystallize your game idea into a clear vision

- Define core mechanics and player experience
- Identify target audience and player count
- Establish theme and complexity level
- Document initial design vision

**Platform Support:** Create your project profile, articulate your vision, and connect with potential collaborators.

#### 2. Prototype Stage
**Goal:** Create your first playable version

- Build a functional prototype (paper, digital, or hybrid)
- Test basic mechanics work as intended
- Upload rules and component lists
- Prepare materials for initial playtesting

**Platform Support:** Upload prototype materials, document your ruleset, and submit to the playtest queue.

#### 3. Playtesting Stage
**Goal:** Gather feedback through structured community testing

- Regular playtesting with diverse player groups
- Collect structured feedback across 5 key dimensions:
  - **Fun Factor:** Is it enjoyable?
  - **Clarity:** Are rules clear and understandable?
  - **Balance:** Is gameplay fair and competitive?
  - **Theme:** Does the theme shine through?
  - **Mechanics:** Do mechanics serve the experience?
- Observe player behavior and pain points
- Identify what works and what doesn't

**Platform Support:** Fair queue system prioritizes your game, testers provide structured feedback, AI-powered insights summarize patterns.

#### 4. Refining Stage
**Goal:** Iterate based on feedback to enhance your design

- Implement changes based on playtest insights
- Track iterations and link them to specific feedback
- Balance game systems and economy
- Polish components and artwork
- Continue playtesting refined versions

**Platform Support:** Version control for iterations, feedback-to-change tracking, progress visualization.

#### 5. Pitching Stage
**Goal:** Prepare for publisher presentations or crowdfunding

- Develop pitch materials and sell sheets
- Create compelling visual presentations
- Build audience and gather testimonials
- Research potential publishers or crowdfunding strategy
- Practice your pitch with the community

**Platform Support:** Showcase your refined game, gather testimonials from playtesters, connect with industry contacts.

#### 6. Published Stage
**Goal:** Your game is available to the world!

- Celebrate your achievement
- Share your journey to inspire others
- Mentor new designers
- Plan expansions or new projects

**Platform Support:** Showcase your success, earn recognition badges, mentor community members.

---

## Why BoardGameBoost Works

### For New Designers

**Clear Path Forward**
- No more wondering "what's next?" — the framework provides clear stages and goals
- Learn from structured feedback rather than vague opinions
- See how other designers navigate challenges

**Community Support**
- Never design in isolation — connect with fellow designers
- Access experienced mentors who've published games
- Participate in workshops and design challenges

**Structured Learning**
- Understand what makes games work through systematic feedback
- Learn to incorporate criticism productively
- Develop professional workflow habits early

**Motivation & Progress**
- Visualize your progress through stages
- Earn points and badges for active participation
- See tangible improvement across iterations

### For Veteran Designers

**Efficient Playtesting Pipeline**
- Fair priority queue ensures your games get tested
- Access engaged, experienced playtesters
- Multiple concurrent projects supported
- Structured feedback reduces noise

**Professional Workflow**
- Track multiple projects simultaneously
- Version control and iteration history
- Feedback-to-change linkage for publisher presentations
- Analytics and trend identification

**Community Investment**
- Contribution system rewards active participation
- Priority access for helpful community members
- Mentor next generation of designers
- Build reputation and industry connections

**Time Savings**
- Automated scheduling and notifications
- Structured feedback forms reduce ambiguity
- AI-powered insights synthesize feedback patterns
- Integrated project management eliminates spreadsheets

---

## Core Platform Features

### Member Management
- Secure authentication and profile management
- Membership tiers (Basic/Premium) with different benefits
- Point tracking for contributions and activity
- Badge system for achievements and milestones

### Game Project Management
- Track development stage (Concept → Published)
- Upload game materials (rules, components, artwork)
- Version control for game iterations
- Public/private project visibility settings
- Tag system for mechanics and themes

### Playtest Queue System
**Fair Priority Algorithm:**
```
Priority = Membership Tier Bonus
         + Contribution Points × 2
         + Days Waiting × 5
```

- Automatic scheduling based on priority
- Session registration and capacity management
- Email notifications for scheduling
- Waitlist functionality for popular sessions

### Structured Feedback System
Every playtest generates feedback across five dimensions:
- **Ratings:** 1-5 scale for fun, clarity, balance, theme, mechanics
- **Qualitative Comments:** What worked, what didn't, suggestions, confusion points
- **Behavioral Data:** Would play again? Would recommend?
- **Designer Response:** Track how feedback influences iterations

### Iteration Tracking
- Version control for game iterations
- Link specific feedback to design changes
- Track improvement trends across versions
- Document your design evolution

### Gamification & Recognition
**Earn Points For:**
- Playtesting other designers' games (10 points)
- Having your game tested (5 points)
- High-quality feedback (15 points, admin rated)
- Completing iterations based on feedback (20 points)
- Publishing your game (100 points)

**Recognition System:**
- Leaderboard showcases top contributors
- Badges for milestones (first playtest, first publication, etc.)
- Contribution history visible on profile
- Community reputation building

### AI-Powered Insights
- Feedback summarization across multiple sessions
- Pattern recognition in player comments
- Design improvement suggestions
- Thematic consistency analysis

---

## The BoardGameBoost Philosophy

### 1. Community Over Competition
Game design thrives in collaborative environments. By helping others playtest and refine their games, you:
- Build goodwill for when you need playtesters
- Learn from observing other designs
- Develop critical analysis skills
- Create lasting professional relationships

### 2. Structured Feedback Over Opinions
"I don't like it" isn't helpful. Our structured feedback framework ensures:
- Specific, actionable insights
- Separation of preference from design issues
- Balanced evaluation across key dimensions
- Clear direction for improvements

### 3. Iteration Over Perfection
First drafts are never perfect. The framework embraces:
- Rapid prototyping and testing
- Fail fast, learn faster
- Documented improvement over time
- Version control shows your growth

### 4. Progress Over Publishing
While publishing is the goal, the journey matters:
- Celebrate small wins at each stage
- Recognize improvement and effort
- Value learning and skill development
- Community success is collective success

### 5. Transparency Over Gatekeeping
Knowledge should be shared:
- Open documentation of the process
- Successful designers mentor newcomers
- Pitfalls and lessons are public
- Community wisdom is accessible to all

---

## Tech Stack

**Frontend**
- Next.js 15 with Turbopack (React 18)
- TypeScript for type safety
- Tailwind CSS + shadcn/ui components
- Radix UI primitives for accessibility

**Backend & Database**
- Supabase (PostgreSQL, Authentication, Storage)
- Real-time subscriptions for live updates
- Row-level security for data protection

**Key Libraries**
- React Hook Form + Zod for validation
- Recharts for analytics visualization
- Lucide React for iconography
- date-fns for date handling

**Developer Experience**
- TypeScript strict mode
- ESLint + custom rules
- Git-based workflow
- Automated type checking and linting

---

## Documentation

We've created comprehensive planning and technical documentation:

- **[START HERE](docs/00_START_HERE.md)** - Documentation overview and quick navigation
- **[FEATURE_AUDIT](docs/FEATURE_AUDIT.md)** - Current state analysis and gaps
- **[PRD](docs/PRD.md)** - Complete product requirements
- **[TECHNICAL_SPEC](docs/TECHNICAL_SPEC.md)** - System architecture and API specs
- **[DATABASE_SCHEMA](docs/DATABASE_SCHEMA.md)** - Complete database design
- **[UX_ENHANCEMENT_PLAN](docs/UX_ENHANCEMENT_PLAN.md)** - User experience strategy
- **[DEVELOPMENT_ROADMAP](docs/DEVELOPMENT_ROADMAP.md)** - 12-sprint implementation plan

---

## Getting Started

### For Designers (Using the Platform)

1. **Visit the Platform:** Navigate to [your-deployment-url]
2. **Create Account:** Sign up with email
3. **Complete Profile:** Add your designer bio and experience
4. **Choose Your Path:**
   - **Have a game idea?** Create your first project
   - **Want to help?** Browse playtest queue and sign up
   - **Learn first?** Explore community projects and workshops

### For Developers (Running Locally)

#### Prerequisites
- Node.js 20+ and npm
- Supabase account (free tier available)
- Git

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Boardgameboost.git
cd Boardgameboost

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

The application will be available at `http://localhost:9002`

#### Available Scripts

```bash
npm run dev        # Start development server with Turbopack (port 9002)
npm run build      # Create production build
npm run start      # Run production server
npm run lint       # Run ESLint checks
npm run typecheck  # Run TypeScript validation
```

#### Before Committing

Always run these commands to ensure code quality:

```bash
npm run lint       # Check for code issues
npm run typecheck  # Verify TypeScript types
npm run build      # Ensure production build succeeds
```

---

## Project Structure

```
Boardgameboost/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx               # Landing/Dashboard
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── projects/
│   │   │   ├── page.tsx           # Project list
│   │   │   ├── new/page.tsx       # Project creation (NEW ✨)
│   │   │   └── [id]/page.tsx      # Project detail
│   │   ├── playtest-queue/        # Queue management
│   │   ├── leaderboard/           # Community rankings
│   │   └── auth/                  # Authentication
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── forms/                 # Form components (NEW ✨)
│   │   │   └── ProjectForm.tsx    # Multi-step project wizard
│   │   ├── app-layout.tsx         # App layout wrapper (NEW ✨)
│   │   ├── dashboard-nav.tsx      # Navigation
│   │   ├── project-card.tsx       # Project display
│   │   ├── landing-page.tsx       # Landing page
│   │   ├── landing-navbar.tsx     # Landing navbar
│   │   └── icons.tsx              # Icon components
│   ├── lib/
│   │   ├── types/
│   │   │   └── database.types.ts  # Supabase type definitions
│   │   ├── schemas/               # Zod validation schemas (NEW ✨)
│   │   │   ├── project.schema.ts  # Project validation
│   │   │   ├── feedback.schema.ts # Feedback validation
│   │   │   ├── session.schema.ts  # Session validation
│   │   │   ├── profile.schema.ts  # Profile validation
│   │   │   └── iteration.schema.ts# Iteration validation
│   │   ├── api/                   # API layer (NEW ✨)
│   │   │   └── projects.ts        # Project CRUD operations
│   │   ├── supabase/              # Supabase clients (NEW ✨)
│   │   │   └── client.ts          # Browser client
│   │   ├── providers/             # React providers (NEW ✨)
│   │   │   └── query-provider.tsx # React Query setup
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── data.ts                # Sample data
│   │   └── utils.ts               # Utility functions
│   └── hooks/
│       ├── useAuth.tsx            # Authentication hook
│       ├── useProjects.ts         # Project React Query hooks (NEW ✨)
│       ├── use-toast.ts           # Toast notifications (NEW ✨)
│       └── use-mobile.tsx         # Responsive hook
├── supabase/                       # Database (NEW ✨)
│   └── migrations/
│       ├── 20251118000000_initial_schema.sql  # Core schema
│       └── 20251118000001_seed_data.sql       # Seed data
├── docs/                           # Comprehensive documentation
│   ├── 00_START_HERE.md           # Documentation hub
│   ├── FEATURE_AUDIT.md           # Current state analysis
│   ├── PRD.md                     # Product requirements
│   ├── TECHNICAL_SPEC.md          # System architecture
│   ├── DATABASE_SCHEMA.md         # Database design
│   ├── UX_ENHANCEMENT_PLAN.md     # UX strategy
│   ├── DEVELOPMENT_ROADMAP.md     # Implementation plan
│   ├── blueprint.md               # Design system
│   └── architecture.md            # Technical architecture
├── public/                         # Static assets
├── .env.example                    # Environment template (NEW ✨)
└── CLAUDE.md                      # AI assistant context
```

---

## Design System

BoardGameBoost uses a warm, growth-oriented design language:

**Colors**
- Primary: Soft Green (#A7D1AB) — represents growth and collaboration
- Background: Light Green (#E5EBE3) — clean, readable canvas
- Accent: Light Orange (#E5B9A5) — highlights and calls-to-action

**Typography**
- Headers: Space Grotesk (geometric, modern)
- Body: Inter (readable, professional)

**Principles**
- Clean, modular layouts
- Generous padding for clarity
- Simple line icons for accessibility
- Subtle transitions for polish
- Mobile-first responsive design

See [docs/blueprint.md](docs/blueprint.md) for complete design guidelines.

---

## Data Models

### Core Entities

**User**
```typescript
{
  id: string
  email: string
  displayName: string
  membershipTier: 'basic' | 'premium'
  membershipStatus: 'active' | 'expired' | 'pending'
  totalContributionPoints: number
  totalTestingPoints: number
}
```

**GameProject**
```typescript
{
  id: string
  designerId: string
  title: string
  stage: 'concept' | 'prototype' | 'playtesting' |
         'refining' | 'pitching' | 'published'
  playerCount: { min: number; max: number }
  playTime: number
  complexity: 1 | 2 | 3 | 4 | 5
  mechanics: string[]
  materials: FileAttachment[]
}
```

**PlayTestSession**
```typescript
{
  id: string
  gameProjectId: string
  scheduledDate: Date
  maxPlayers: number
  registeredPlayers: string[]
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  venue: string
  facilitatorId: string
}
```

**Feedback**
```typescript
{
  id: string
  sessionId: string
  gameProjectId: string
  playerId: string
  ratings: {
    fun: number        // 1-5
    clarity: number    // 1-5
    balance: number    // 1-5
    theme: number      // 1-5
    mechanics: number  // 1-5
  }
  comments: {
    liked: string
    disliked: string
    suggestions: string
    confusing: string
  }
  wouldPlayAgain: boolean
  wouldRecommend: boolean
}
```

**GameIteration**
```typescript
{
  id: string
  gameProjectId: string
  version: string
  changesDescription: string
  inspiringFeedback: string[]  // Links to feedback IDs
  createdAt: Date
}
```

See [src/lib/types.ts](src/lib/types.ts) for complete type definitions.

---

## Roadmap

### Current Status (Sprint 1 - Complete ✅ → Sprint 2 Starting)

**Sprint 1 Completed:**
- [x] Complete database schema (12 tables with RLS)
- [x] Validation layer (Zod schemas: projects, feedback, sessions, profiles, iterations)
- [x] React Query setup for state management
- [x] Automated triggers (points, priority calculation)
- [x] Seed data (badges, mechanics, themes)
- [x] Project CRUD API layer (src/lib/api/projects.ts)
- [x] Project creation form (multi-step wizard with 3 steps)
- [x] React Query hooks (useProjects with mutations and queries)
- [x] Toast notification system
- [x] Environment configuration (.env setup)
- [x] Authentication integration (useAuth hook with Supabase)

**Project Creation Feature (LIVE):**
✨ Users can now create game projects via `/projects/new` with:
- **Step 1:** Basic project info (title, tagline, description, stage)
- **Step 2:** Game details (player count, play time, complexity, mechanics, themes)
- **Step 3:** Review and submit
- Real-time validation with Zod schemas
- Automatic redirect to project detail page
- Success/error notifications via toast

**UI/Display Features:**
- [x] Landing page with community info
- [x] Project listing and detail pages
- [x] Playtest queue display
- [x] Leaderboard display
- [x] User authentication (Supabase)
- [x] Responsive sidebar navigation
- [x] Multi-step form wizard pattern

**Next Up (Sprint 2 - Starting Now):**
- [ ] Feedback submission form (5-dimension ratings + comments)
- [ ] Profile editing form
- [ ] File upload component for project materials
- [ ] Queue submission workflow
- [ ] Session registration system
- [ ] Email notifications
- [ ] Admin session management

### Phase 2: Enhanced Feedback (Sprints 5-6)
- [ ] Complete feedback submission system
- [ ] Iteration tracking with feedback linkage
- [ ] AI-powered feedback summarization
- [ ] Designer analytics dashboard
- [ ] Feedback visualization (radar charts)

### Phase 3: Community Features
- [ ] Discussion forums by topic
- [ ] Resource sharing library
- [ ] Mentorship program matching
- [ ] Design challenges and competitions
- [ ] Event calendar integration

### Phase 4: Publishing Support
- [ ] Publisher database and matching
- [ ] Pitch material templates
- [ ] Crowdfunding campaign tools
- [ ] Print-on-demand integrations
- [ ] BoardGameGeek integration

### Phase 5: Scale & Optimize
- [ ] Multi-community support
- [ ] Advanced analytics and reporting
- [ ] Mobile app (iOS/Android)
- [ ] Internationalization (i18n)
- [ ] API for third-party integrations

---

## Contributing

We welcome contributions from both developers and game designers!

### For Developers
- Review open issues and pick one to work on
- Follow the TypeScript and React best practices
- Ensure tests pass and code is linted
- Submit pull requests with clear descriptions

### For Designers
- Provide feedback on the UX/workflow
- Suggest features that would help your design process
- Test the platform with real projects
- Share your success stories

---

## Community

**Yogyakarta Board Game Design Club**
- Weekly workshops and playtesting sessions
- Monthly industry talks and design challenges
- Active community of 50+ designers
- Based in Yogyakarta, Indonesia

**Get Involved**
- Join our playtesting sessions
- Participate in design challenges
- Share your expertise through workshops
- Mentor aspiring designers

---

## License

This project is built for the Yogyakarta Board Game Design Club community.

---

## Acknowledgments

Built with love for the board game design community. Special thanks to all the designers, playtesters, and contributors who make this platform possible.

**Core Philosophy:** Great games are built through iteration, feedback, and community. BoardGameBoost exists to make that process systematic, supportive, and successful.

---

## Questions?

- **Technical Issues:** Open an issue on GitHub
- **Feature Requests:** Submit via GitHub discussions
- **General Questions:** Reach out to the community
- **Partnership Inquiries:** Contact the maintainers

---

**Remember:** Every published game started as an idea. BoardGameBoost helps you navigate the journey from concept to reality, one playtest at a time.

*Happy designing!*
