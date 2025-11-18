# BoardGameBoost - Technical Specification

**Version:** 2.0
**Date:** 2025-11-18
**Status:** Active

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Database Design](#database-design)
4. [API Specifications](#api-specifications)
5. [Frontend Architecture](#frontend-architecture)
6. [Security Implementation](#security-implementation)
7. [File Storage & Upload](#file-storage--upload)
8. [Email & Notifications](#email--notifications)
9. [Deployment & CI/CD](#deployment--cicd)
10. [Monitoring & Analytics](#monitoring--analytics)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js 15 App (React 18 + TypeScript)      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │   Pages  │  │Components│  │  Hooks   │          │  │
│  │  └──────────┘  └──────────┘  └──────────┘          │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/REST
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Supabase Backend                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │     Auth     │  │   Storage    │     │
│  │   Database   │  │   (JWT)      │  │   (Files)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Realtime   │  │  Edge Funcs  │                        │
│  │   (WebSocket)│  │  (Serverless)│                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 External Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   SendGrid   │  │  Anthropic   │  │   Vercel     │     │
│  │   (Email)    │  │    (AI)      │  │ (Hosting)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**Read Flow:**
```
User Action → Next.js Page → useQuery Hook → Supabase Client
→ PostgreSQL → Row-Level Security Check → Data Return → UI Update
```

**Write Flow:**
```
User Form Submit → Validation (Zod) → useMutation Hook → Supabase Client
→ PostgreSQL Insert/Update → RLS Check → Edge Function Trigger
→ Points Calculation/Email Send → Success Response → UI Update
```

---

## Technology Stack

### Frontend

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | Next.js | 15.3.3 | React framework with App Router |
| Language | TypeScript | 5.x | Type safety |
| UI Library | React | 18.3.1 | Component framework |
| Styling | Tailwind CSS | 3.4.1 | Utility-first CSS |
| Components | shadcn/ui | Latest | Pre-built components |
| Primitives | Radix UI | Latest | Accessible primitives |
| Forms | React Hook Form | 7.54.2 | Form management |
| Validation | Zod | 3.24.2 | Schema validation |
| State | Zustand | (TBD) | Global state management |
| Icons | Lucide React | 0.475.0 | Icon library |
| Charts | Recharts | 2.15.1 | Data visualization |

### Backend & Database

| Component | Technology | Purpose |
|-----------|------------|---------|
| Database | PostgreSQL (Supabase) | Primary datastore |
| Auth | Supabase Auth | User authentication |
| Storage | Supabase Storage | File uploads |
| Realtime | Supabase Realtime | Live updates |
| Functions | Supabase Edge Functions | Serverless logic |
| ORM | Supabase JS Client | Database queries |

### External Services

| Service | Purpose | Tier |
|---------|---------|------|
| Vercel | Frontend hosting & CDN | Hobby/Pro |
| Supabase | Backend infrastructure | Free/Pro |
| SendGrid / Resend | Transactional emails | Free/Paid |
| Anthropic Claude | AI feedback analysis | API |
| Sentry | Error monitoring | Developer |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks |
| TypeScript | Static typing |
| Vitest | Unit testing |
| Playwright | E2E testing |
| Storybook | Component documentation |

---

## Database Design

### Schema Overview

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete details.

**Core Tables:**
- `profiles` - User profiles (extends Supabase auth.users)
- `game_projects` - Board game projects
- `playtest_sessions` - Scheduled playtest sessions
- `queue_entries` - Playtest queue management
- `feedback` - Playtest feedback submissions
- `game_iterations` - Version history
- `point_transactions` - Gamification points
- `badges` - Achievement definitions
- `user_badges` - Earned badges

**Supporting Tables:**
- `notifications` - User notifications
- `session_registrations` - Session attendance
- `project_materials` - File attachments
- `forum_threads` - Community discussions
- `resources` - Shared resources

### Key Relationships

```
profiles
  └── game_projects (1:many)
        ├── queue_entries (1:many)
        ├── playtest_sessions (1:many)
        ├── game_iterations (1:many)
        ├── feedback (1:many)
        └── project_materials (1:many)

playtest_sessions
  ├── session_registrations (1:many)
  └── feedback (1:many)

profiles
  ├── point_transactions (1:many)
  └── user_badges (1:many)
```

### Indexing Strategy

**Performance-Critical Indexes:**
```sql
-- Frequently queried fields
CREATE INDEX idx_projects_designer ON game_projects(designer_id);
CREATE INDEX idx_projects_stage ON game_projects(stage);
CREATE INDEX idx_projects_active ON game_projects(is_active);
CREATE INDEX idx_queue_status ON queue_entries(status);
CREATE INDEX idx_sessions_date ON playtest_sessions(scheduled_date);
CREATE INDEX idx_feedback_project ON feedback(game_project_id);

-- Composite indexes for common queries
CREATE INDEX idx_projects_designer_stage
  ON game_projects(designer_id, stage, is_active);
CREATE INDEX idx_sessions_status_date
  ON playtest_sessions(status, scheduled_date);
```

---

## API Specifications

### RESTful Endpoints (Supabase)

All API calls use Supabase JavaScript client with automatic JWT authentication.

#### Projects

```typescript
// GET /rest/v1/game_projects
// List projects with filters
const { data, error } = await supabase
  .from('game_projects')
  .select(`
    *,
    designer:profiles!designer_id(display_name, avatar_url),
    materials:project_materials(*)
  `)
  .eq('is_active', true)
  .order('created_at', { ascending: false })
  .range(0, 19);

// POST /rest/v1/game_projects
// Create project
const { data, error } = await supabase
  .from('game_projects')
  .insert({
    designer_id: user.id,
    title: 'My Game',
    description: 'Description',
    stage: 'concept',
    // ... other fields
  })
  .select()
  .single();

// PATCH /rest/v1/game_projects
// Update project
const { data, error } = await supabase
  .from('game_projects')
  .update({ stage: 'prototype' })
  .eq('id', projectId)
  .eq('designer_id', user.id) // RLS check
  .select()
  .single();
```

#### Feedback

```typescript
// POST /rest/v1/feedback
// Submit feedback
const { data, error } = await supabase
  .from('feedback')
  .insert({
    session_id: sessionId,
    game_project_id: gameId,
    player_id: user.id,
    ratings: { fun: 4, clarity: 5, ... },
    comments: { liked: '...', ... },
    would_play_again: true,
    would_recommend: true,
  })
  .select();

// After insert, trigger Edge Function for points
```

#### Queue

```typescript
// POST /rest/v1/queue_entries
// Submit to queue
const { data, error } = await supabase
  .from('queue_entries')
  .insert({
    game_project_id: projectId,
    submitted_at: new Date(),
    status: 'queued',
  })
  .select();

// Edge Function calculates priority automatically
```

### Edge Functions (Serverless)

**Function: calculate-priority**
```typescript
// Trigger: ON INSERT queue_entries
// Purpose: Calculate queue priority
export async function handler(req: Request) {
  const { record } = await req.json();

  // Get user data
  const { data: user } = await supabase
    .from('profiles')
    .select('membership_tier, total_testing_points')
    .eq('id', record.designer_id)
    .single();

  // Calculate priority
  let priority = 0;
  priority += user.membership_tier === 'premium' ? 100 : 50;
  priority += Math.min(user.total_testing_points * 2, 50);

  const daysWaiting = daysSince(record.submitted_at);
  priority += daysWaiting * 5;

  // Update record
  await supabase
    .from('queue_entries')
    .update({ priority })
    .eq('id', record.id);

  return new Response('OK');
}
```

**Function: award-points**
```typescript
// Trigger: Various actions
// Purpose: Award points and update totals
export async function handler(req: Request) {
  const { userId, type, points, description, relatedId } = await req.json();

  // Insert transaction
  await supabase.from('point_transactions').insert({
    user_id: userId,
    type,
    points,
    description,
    related_entity_id: relatedId,
  });

  // Update user totals
  const column = type.includes('test')
    ? 'total_testing_points'
    : 'total_contribution_points';

  await supabase.rpc('increment_points', {
    user_id: userId,
    column,
    amount: points,
  });

  // Check for badge unlocks
  await checkBadgeUnlocks(userId);

  return new Response('OK');
}
```

**Function: send-notification**
```typescript
// Trigger: Various events
// Purpose: Send email and in-app notifications
export async function handler(req: Request) {
  const { userId, type, title, message, link } = await req.json();

  // Get user preferences
  const { data: user } = await supabase
    .from('profiles')
    .select('email, notification_preferences')
    .eq('id', userId)
    .single();

  // Insert in-app notification
  await supabase.from('notifications').insert({
    user_id: userId,
    type,
    title,
    message,
    link,
  });

  // Send email if enabled
  if (user.notification_preferences[type]) {
    await sendEmail({
      to: user.email,
      template: type,
      data: { title, message, link },
    });
  }

  return new Response('OK');
}
```

---

## Frontend Architecture

### File Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx            # Sidebar layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── projects/
│   │   │   ├── page.tsx          # Project list
│   │   │   ├── new/              # Create project
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project detail
│   │   │       ├── edit/         # Edit project
│   │   │       └── feedback/     # Submit feedback
│   │   ├── playtest-queue/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   └── admin/                # Admin pages
│   ├── api/                      # API routes (if needed)
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   │   ├── ProjectForm.tsx
│   │   ├── FeedbackForm.tsx
│   │   └── IterationForm.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── ProjectFilters.tsx
│   ├── feedback/
│   ├── queue/
│   └── layout/
│       ├── DashboardNav.tsx
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── api/
│   │   ├── projects.ts           # Project API functions
│   │   ├── feedback.ts
│   │   └── queue.ts
│   ├── schemas/                  # Zod schemas
│   │   ├── project.schema.ts
│   │   ├── feedback.schema.ts
│   │   └── user.schema.ts
│   ├── types/                    # TypeScript types
│   │   ├── database.types.ts     # Auto-generated from Supabase
│   │   └── index.ts
│   └── utils/
│       ├── calculations.ts       # Priority, points, etc.
│       ├── date.ts
│       └── format.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useProjects.ts
│   ├── useFeedback.ts
│   ├── useQueue.ts
│   └── useNotifications.ts
└── store/                        # Zustand stores
    ├── authStore.ts
    └── uiStore.ts
```

### State Management Strategy

**Server State (React Query):**
```typescript
// hooks/useProjects.ts
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => fetchProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
}
```

**Client State (Zustand):**
```typescript
// store/uiStore.ts
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
}));
```

### Form Handling Pattern

```typescript
// components/forms/ProjectForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/lib/schemas/project.schema';

export function ProjectForm({ initialData, onSuccess }) {
  const { mutate, isPending } = useCreateProject();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      stage: 'concept',
      // ...
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Project created!');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

---

## Security Implementation

### Row-Level Security (RLS) Policies

**Profiles:**
```sql
-- Users can view all profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

**Game Projects:**
```sql
-- Everyone can view active public projects
CREATE POLICY "Public projects viewable by all"
  ON game_projects FOR SELECT
  USING (is_active = true AND visibility = 'public');

-- Designers can view their own projects (even private)
CREATE POLICY "Designers can view own projects"
  ON game_projects FOR SELECT
  USING (auth.uid() = designer_id);

-- Only designer can update/delete their project
CREATE POLICY "Designers can update own projects"
  ON game_projects FOR UPDATE
  USING (auth.uid() = designer_id);

CREATE POLICY "Designers can delete own projects"
  ON game_projects FOR DELETE
  USING (auth.uid() = designer_id);
```

**Feedback:**
```sql
-- Designers can view feedback on their projects
CREATE POLICY "Designers can view feedback on own projects"
  ON feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = feedback.game_project_id
      AND designer_id = auth.uid()
    )
  );

-- Playtesters can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON feedback FOR SELECT
  USING (auth.uid() = player_id);

-- Only session attendees can submit feedback
CREATE POLICY "Attendees can submit feedback"
  ON feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM session_registrations
      WHERE session_id = feedback.session_id
      AND user_id = auth.uid()
    )
  );
```

**Admin-Only Tables:**
```sql
-- Only admins can manage sessions
CREATE POLICY "Only admins can manage sessions"
  ON playtest_sessions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );
```

### Input Validation

**Zod Schemas:**
```typescript
// lib/schemas/project.schema.ts
export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Title can only contain letters, numbers, spaces, and hyphens'),

  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must be less than 1000 characters'),

  stage: z.enum(['concept', 'prototype', 'playtesting', 'refining', 'pitching', 'published']),

  playerCount: z.object({
    min: z.number().min(1).max(20),
    max: z.number().min(1).max(20),
  }).refine((data) => data.min <= data.max, {
    message: 'Min players must be less than or equal to max players',
  }),

  playTime: z.number()
    .min(5, 'Play time must be at least 5 minutes')
    .max(600, 'Play time must be less than 10 hours'),

  complexity: z.number().min(1).max(5),

  mechanics: z.array(z.string()).min(1, 'Select at least one mechanic'),
});
```

### File Upload Security

```typescript
// lib/upload.ts
const ALLOWED_FILE_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadFile(file: File, bucket: string) {
  // Validate file type
  if (!ALLOWED_FILE_TYPES[file.type]) {
    throw new Error('Invalid file type');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large (max 10MB)');
  }

  // Generate secure filename
  const ext = ALLOWED_FILE_TYPES[file.type];
  const filename = `${crypto.randomUUID()}.${ext}`;

  // Upload with RLS
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return data.path;
}
```

---

## File Storage & Upload

### Supabase Storage Buckets

**Buckets:**
- `avatars` - User profile pictures (public)
- `project-materials` - Game rules, PDFs (private, RLS)
- `project-images` - Game box art, components (public)
- `resources` - Community resource files (public)

**RLS Policies:**
```sql
-- Anyone can view public buckets
CREATE POLICY "Public buckets are viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('avatars', 'project-images', 'resources'));

-- Only authenticated users can upload avatars
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Project materials: only designer can upload
CREATE POLICY "Designers can upload project materials"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-materials'
    AND EXISTS (
      SELECT 1 FROM game_projects
      WHERE id::text = (storage.foldername(name))[1]
      AND designer_id = auth.uid()
    )
  );
```

### Upload Component

```typescript
// components/FileUpload.tsx
export function FileUpload({ bucket, folder, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const path = await uploadFile(file, bucket, folder);
      const url = getPublicUrl(bucket, path);
      onUploadComplete({ path, url });
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {uploading ? (
        <Progress value={progress} />
      ) : (
        <p>Drag & drop or click to upload</p>
      )}
    </div>
  );
}
```

---

## Email & Notifications

### Email Service (SendGrid / Resend)

**Templates:**
1. Welcome email
2. Session scheduled notification
3. Session reminder (24h before)
4. Feedback submitted on your game
5. Badge unlocked
6. Weekly digest

**Implementation:**
```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSessionScheduledEmail(data: {
  to: string;
  gameName: string;
  date: Date;
  venue: string;
  sessionLink: string;
}) {
  await resend.emails.send({
    from: 'BoardGameBoost <noreply@boardgameboost.com>',
    to: data.to,
    subject: `Your game "${data.gameName}" has been scheduled!`,
    react: SessionScheduledEmail(data),
  });
}
```

### In-App Notifications

**Component:**
```typescript
// components/NotificationBell.tsx
export function NotificationBell() {
  const { data: notifications, refetch } = useNotifications();
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NotificationList notifications={notifications} />
      </PopoverContent>
    </Popover>
  );
}
```

---

## Deployment & CI/CD

### Vercel Deployment

**Configuration:**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key"
  }
}
```

### GitHub Actions CI

```.github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
RESEND_API_KEY=re_xxx...
ANTHROPIC_API_KEY=sk-ant-xxx...
```

---

## Monitoring & Analytics

### Error Monitoring (Sentry)

```typescript
// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### Analytics (Vercel Analytics + Custom)

```typescript
// Track custom events
import { track } from '@vercel/analytics';

track('project_created', {
  stage: 'concept',
  complexity: 3,
});

track('feedback_submitted', {
  project_id: projectId,
  ratings_avg: 4.2,
});
```

### Performance Monitoring

- Lighthouse CI in GitHub Actions
- Vercel Speed Insights
- Custom performance marks

```typescript
performance.mark('feedback-form-start');
// ... form render
performance.mark('feedback-form-end');
performance.measure('feedback-form-render', 'feedback-form-start', 'feedback-form-end');
```

---

## Appendix

### TypeScript Types Generation

```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id <project-id> > lib/types/database.types.ts
```

### Development Scripts

```json
// package.json scripts
{
  "dev": "next dev --turbopack -p 9002",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest",
  "test:e2e": "playwright test",
  "db:types": "npx supabase gen types typescript --local > lib/types/database.types.ts"
}
```

---

**Document Status:** Living document
**Last Updated:** 2025-11-18
**Next Review:** After Phase 1 completion
