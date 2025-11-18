# BoardGameBoost - UX/UI Enhancement Plan

**Version:** 1.0
**Date:** 2025-11-18
**Focus:** Stage-Driven User Experience

---

## Table of Contents

1. [UX Vision](#ux-vision)
2. [Design Principles](#design-principles)
3. [User Journey Maps](#user-journey-maps)
4. [Key UX Enhancements](#key-ux-enhancements)
5. [Component Library](#component-library)
6. [Micro-interactions](#micro-interactions)
7. [Accessibility](#accessibility)
8. [Mobile Experience](#mobile-experience)

---

## UX Vision

### Core UX Goal
*"Every designer always knows their next step, feels supported by the community, and sees tangible progress toward publishing."*

### UX Tenets

1. **Clarity Over Cleverness**
   - Clear labels, no jargon
   - Explicit next actions
   - Obvious affordances

2. **Progress Over Perfection**
   - Celebrate small wins
   - Visualize improvement
   - Reduce intimidation

3. **Community Over Competition**
   - Highlight helping behaviors
   - Show impact of contributions
   - Foster connections

4. **Guidance Over Gates**
   - Suggest, don't block
   - Educate inline
   - Empower choices

5. **Feedback Over Silence**
   - Acknowledge all actions
   - Show system status
   - Explain wait times

---

## Design Principles

### Visual Design

**Color Psychology:**
- **Green (#A7D1AB):** Growth, progress, collaboration
- **Orange (#E5B9A5):** Action, warmth, encouragement
- **Neutral (#E5EBE3):** Calm, clarity, focus

**Typography:**
- **Headers (Space Grotesk):** Modern, geometric, approachable
- **Body (Inter):** Readable, professional, versatile
- **Monospace (for code/versions):** JetBrains Mono

**Spacing:**
- Generous padding (1.5-2rem minimum)
- Clear section separation
- Breathing room prevents overwhelm

**Icons:**
- Lucide React (consistent stroke width)
- Line icons (not filled) for lightness
- Always paired with text labels

---

## User Journey Maps

### Journey 1: New Designer - First Project

**Goal:** Successfully create and submit first project to playtest queue

**Touchpoints:**

1. **Landing Page**
   ```
   User Feeling: Curious but unsure
   Key Message: "Clear path from idea to publishing"
   CTA: "Join Our Community"
   ```

2. **Signup / Onboarding**
   ```
   User Feeling: Excited but overwhelmed
   UX: 3-step wizard with progress indicator
   - Step 1: Account creation
   - Step 2: Profile basics (name, avatar)
   - Step 3: Framework intro (interactive tour)
   Success: "Welcome! Let's create your first project."
   ```

3. **First Project Creation**
   ```
   User Feeling: Uncertain what to include
   UX: Guided form with inline help
   - Start at Concept stage (pre-selected)
   - Required fields only (title, description, basic specs)
   - Optional: "Add more details later"
   - Examples shown for each field
   Success: "Project created! Here's what to do next."
   ```

4. **Stage Dashboard (Concept)**
   ```
   User Feeling: Motivated but needs direction
   UX: Checklist-based dashboard
   - ✅ Create project (completed)
   - ☐ Define core mechanics
   - ☐ Identify target audience
   - ☐ Document theme
   - ☐ Move to Prototype stage
   Resources: "Read: How to Define Your Core Loop"
   ```

5. **Transition to Prototype**
   ```
   User Feeling: Ready but cautious
   UX: Transition assistant modal
   - "Congrats! Your concept is ready for prototyping."
   - Checklist of Prototype stage requirements
   - "Update project stage" button
   Success: "Now in Prototype stage! Time to build."
   ```

6. **Submit to Queue**
   ```
   User Feeling: Nervous but hopeful
   UX: Readiness validator
   - Checks: Rules uploaded? Components defined?
   - Estimated wait time shown: "~2-3 weeks"
   - Explain priority algorithm transparently
   Success: "You're in the queue! We'll email when scheduled."
   ```

7. **Session Scheduled Email**
   ```
   User Feeling: Excited and a bit nervous
   UX: Clear email with all details
   - Game name, date, time, venue
   - What to bring checklist
   - Calendar .ics attachment
   - Link to session prep guide
   CTA: "Prepare for Your Playtest"
   ```

8. **Post-Session Feedback**
   ```
   User Feeling: Eager to see reactions
   UX: Feedback dashboard
   - Overall ratings visualization (radar chart)
   - Comments categorized and highlighted
   - Patterns identified: "3/4 found rules confusing"
   CTA: "Create your first iteration"
   ```

9. **First Iteration**
   ```
   User Feeling: Accomplished and motivated
   UX: Iteration form with feedback integration
   - Select which feedback to address
   - Document changes made
   - Version number guidance (1.0 → 1.1)
   - Upload new rulebook
   Success: "Iteration v1.1 created! +20 points earned."
   Badge Unlocked: "Iterative Designer"
   ```

**Total Journey Time:** 2-3 weeks
**Success Metric:** 70% of new users complete first iteration

---

### Journey 2: Veteran Designer - Multi-Project Management

**Goal:** Efficiently manage 3 projects in different stages

**Touchpoints:**

1. **Dashboard Overview**
   ```
   User Need: Quick status of all projects
   UX: Project cards with stage badges
   - Visual pipeline showing stage distribution
   - Next action for each project
   - Quick filters: by stage, by priority
   ```

2. **Stage-Specific Views**
   ```
   User Need: Focus on one stage at a time
   UX: Stage tabs with counts
   - "Playtesting (2)" tab
   - Shows only relevant actions per stage
   - Bulk actions: "Submit all to queue"
   ```

3. **Analytics Dashboard**
   ```
   User Need: Track improvement trends
   UX: Comparative analytics
   - Feedback scores over time (line chart)
   - Iteration velocity per project
   - Publication readiness score
   ```

---

### Journey 3: Playtester - Finding & Attending Sessions

**Goal:** Attend 2 sessions per month and provide quality feedback

**Touchpoints:**

1. **Browse Sessions**
   ```
   User Need: Find interesting games to test
   UX: Session cards with game previews
   - Game cover, title, description snippet
   - Date, time, venue clearly visible
   - "Spots left: 2/4" with urgency color
   - Filter: by date, by venue, by mechanics
   ```

2. **Session Registration**
   ```
   User Need: Quick, painless signup
   UX: One-click registration
   - "Register" button → Confirmation modal
   - Auto-add to calendar option
   - Reminder preference toggle
   Success: "Registered! Reminder set for 24h before."
   ```

3. **Pre-Session Reminder**
   ```
   User Need: Don't forget to attend
   UX: Email + in-app notification
   - 24 hours before: Reminder with venue details
   - Include: What to expect, how long, what to bring
   - Quick "Can't make it" cancellation link
   ```

4. **Post-Session Feedback Form**
   ```
   User Need: Share feedback without overthinking
   UX: Mobile-friendly, structured form
   - 5 sliders for ratings (visual, tactile)
   - 4 text boxes with placeholders/examples
   - Auto-save drafts every 30 seconds
   - "Submit anonymously" checkbox
   Success: "Thanks! Designer will appreciate this. +10 points"
   ```

5. **See Impact**
   ```
   User Need: Know feedback was valuable
   UX: Notification when iteration created
   - "Your feedback helped improve [Game Name]!"
   - Link to see iteration changelog
   - Designer's thank you message
   Reward: Potential "Quality Feedback" badge
   ```

---

## Key UX Enhancements

### 1. Stage Progress Indicator

**Visual Component:**
```
┌─────────────────────────────────────────────────────────┐
│  [●]───[●]───[○]───[ ]───[ ]───[ ]                     │
│  Concept  Prototype  Playtesting  Refining  Pitching  Published │
│              ↑ You are here                             │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Horizontal stepper component
- Completed stages: filled circle (●)
- Current stage: outlined circle (○)
- Future stages: empty circle ( )
- Click stages to see stage-specific info

**Location:**
- Top of project detail page
- Project cards (mini version)
- Dashboard (overall progress across all projects)

---

### 2. Next Action Panel

**Component:**
```
┌─────────────────────────────────────────┐
│ 🎯 Next Steps for "Nusantara Traders"  │
├─────────────────────────────────────────┤
│ ✅ Upload prototype rules               │
│ ✅ Add component list                   │
│ ⚠️  Submit to playtest queue            │
│    ↳ Estimated wait: 2-3 weeks          │
│                                          │
│ [Submit to Queue] →                     │
└─────────────────────────────────────────┘
```

**Features:**
- Checklist of stage requirements
- Progress indication
- Primary CTA for next action
- Contextual help/tooltips

---

### 3. Feedback Visualization Dashboard

**Rating Trends:**
```
   5 ┤         ╭─●
   4 ┤       ╭─╯
   3 ┤     ╭─╯
   2 ┤   ●─╯
   1 ┤ ●─╯
     └─────────────────
     v1.0  v1.1  v1.2
```

**Radar Chart:**
```
        Fun (4.2)
            ●
           /│\
Clarity   / │ \  Theme
  (3.8)  ●  │  ● (4.5)
          \ │ /
           \│/
            ●
      Mechanics (4.0)
```

**Comment Highlights:**
- Most common positive words (word cloud)
- Most common issues (tagged list)
- Sentiment trend (😊 70% positive)

---

### 4. Smart Notifications

**Notification Center:**
```
┌────────────────────────────────────────┐
│ 🔔 Notifications                  [3]  │
├────────────────────────────────────────┤
│ ● Your game "Wayang Legends" has been  │
│   scheduled for playtesting!            │
│   📅 Dec 5 at 7:00 PM                  │
│   2 hours ago                           │
├────────────────────────────────────────┤
│ ● New feedback on "Nusantara Traders"  │
│   ⭐ 4.2 average rating                │
│   1 day ago                             │
├────────────────────────────────────────┤
│   Badge unlocked: Iterative Designer!   │
│   🏆 You've completed your 3rd iteration│
│   3 days ago                            │
└────────────────────────────────────────┘
```

**Features:**
- Unread badge count
- Grouping by type
- Quick actions (view, dismiss)
- Mark all as read
- Notification preferences link

---

### 5. Onboarding Tour

**Interactive Walkthrough:**

**Step 1: Welcome**
```
┌─────────────────────────────────┐
│  Welcome to BoardGameBoost!     │
│                                  │
│  We help designers navigate     │
│  from concept to publishing.    │
│                                  │
│  [Skip Tour]    [Start Tour] → │
└─────────────────────────────────┘
```

**Step 2: Six Stages**
```
← Highlight stage progress bar →
│
│  Your game will progress through
│  6 stages. Each stage has specific
│  goals and community support.
│
│  [Back]    [Next 2/5] →
```

**Step 3-5:** Projects, Queue, Feedback
**Step 6:** Create First Project CTA

---

### 6. Gamification Elements

**Points Counter (Animated):**
```
╔════════════════════════╗
║  🏆 Your Points        ║
╠════════════════════════╣
║  ┌──────┐  ┌──────┐  ║
║  │ 1250 │  │ 340  │  ║
║  │ ⬆️+10 │  │      │  ║
║  └──────┘  └──────┘  ║
║  Contribution Testing ║
╚════════════════════════╝
```

**Badge Showcase:**
```
Your Badges (4/12)
┌────┬────┬────┬────┐
│ ✍️ │ 💡 │ 🔬 │ 🎉 │
│ 1st│Crea│Test│Pub │
│Feed│ tor│ er │lish│
└────┴────┴────┴────┘
     [View All] →
```

**Leaderboard Snippet:**
```
Community Leaders
┌─────────────────────┐
│ 🥇 Citra   1520 pts │
│ 🥈 You     1250 pts │ ← Highlighted
│ 🥉 Budi     850 pts │
│ 4️⃣  Sari     680 pts │
│ 5️⃣  Dewi     450 pts │
└─────────────────────┘
   [Full Leaderboard]
```

---

## Component Library

### Core Components (Already Built)

From shadcn/ui:
- Button, Card, Badge, Input, Textarea
- Dialog, Dropdown, Popover, Tabs
- Table, Form, Select, Calendar

### Custom Components (To Build)

**1. StageProgressBar**
```tsx
<StageProgressBar
  currentStage="playtesting"
  completedStages={['concept', 'prototype']}
  onClick={(stage) => showStageInfo(stage)}
/>
```

**2. NextActionPanel**
```tsx
<NextActionPanel
  projectId="proj-1"
  stage="prototype"
  actions={[
    { id: 1, label: 'Upload rules', completed: true },
    { id: 2, label: 'Submit to queue', completed: false },
  ]}
  primaryAction={{
    label: 'Submit to Queue',
    onClick: () => submitToQueue()
  }}
/>
```

**3. FeedbackRadarChart**
```tsx
<FeedbackRadarChart
  ratings={{
    fun: 4.2,
    clarity: 3.8,
    balance: 4.0,
    theme: 4.5,
    mechanics: 4.0
  }}
  iterations={['v1.0', 'v1.1', 'v1.2']}
/>
```

**4. ProjectCard (Enhanced)**
```tsx
<ProjectCard
  project={project}
  showStage={true}
  showStats={true}
  onQuickAction={(action) => handleAction(action)}
  quickActions={['edit', 'view', 'submit']}
/>
```

**5. SessionCard**
```tsx
<SessionCard
  session={session}
  game={game}
  spotsLeft={2}
  onRegister={() => register()}
  registered={false}
/>
```

**6. FeedbackForm**
```tsx
<FeedbackForm
  sessionId="session-1"
  gameProjectId="proj-1"
  onSubmit={(data) => submitFeedback(data)}
  allowAnonymous={true}
/>
```

**7. PointsBadge (Animated)**
```tsx
<PointsBadge
  points={1250}
  recentIncrease={10}
  type="contribution"
  animate={true}
/>
```

**8. BadgeGrid**
```tsx
<BadgeGrid
  badges={earnedBadges}
  totalBadges={12}
  onBadgeClick={(badge) => showBadgeDetails(badge)}
/>
```

---

## Micro-interactions

### 1. Button Feedback
- **Hover:** Slight lift (translateY: -2px)
- **Click:** Scale down (scale: 0.98)
- **Loading:** Spinner replaces text
- **Success:** Checkmark animation

### 2. Form Validation
- **Invalid:** Red border + shake animation
- **Valid:** Green checkmark appears
- **Auto-save:** Subtle "Saved" indicator fades in/out

### 3. Points Earned
- **Animation:** Number counts up
- **+10:** Briefly shows in green
- **Sound:** Subtle "ding" (optional, user pref)

### 4. Badge Unlock
- **Modal:** Badge zooms in with sparkle effect
- **Confetti:** Brief confetti animation
- **Share:** "Share achievement" CTA

### 5. Stage Transition
- **Progress Bar:** Fills to next stage
- **Confetti:** Stage milestone celebration
- **Modal:** "You've reached [Stage]! Here's what's next."

### 6. Feedback Submission
- **Form:** Smooth expand/collapse sections
- **Submit:** Button shows progress
- **Success:** Form morphs into thank you message

### 7. Notification Toast
- **Appear:** Slide in from top-right
- **Dismiss:** Swipe right to dismiss
- **Auto-dismiss:** Fade out after 5s

### 8. Loading States
- **Skeleton:** Content-aware skeleton screens
- **Spinner:** Only for long operations (>2s)
- **Progressive:** Show partial data immediately

---

## Accessibility

### WCAG 2.1 Level AA Compliance

**1. Color Contrast**
- Text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

**2. Keyboard Navigation**
- All interactive elements focusable
- Focus indicators visible (2px outline)
- Logical tab order
- Skip links for navigation

**3. Screen Readers**
- Semantic HTML (headings, lists, etc.)
- ARIA labels where needed
- Form labels always associated
- Error messages announced

**4. Forms**
- Clear labels
- Error messages specific
- Success confirmation
- Required fields marked

**5. Images**
- Alt text for meaningful images
- Decorative images: alt=""
- Icon buttons: aria-label

**6. Responsive Text**
- Minimum 16px body text
- Scalable (rem units)
- No horizontal scrolling at 200% zoom

**7. Motion**
- Respect prefers-reduced-motion
- Option to disable animations
- No auto-playing videos

---

## Mobile Experience

### Mobile-First Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-Specific Features

**1. Bottom Navigation (Mobile)**
```
┌──────────────────────────┐
│     Content Area         │
│                          │
└──────────────────────────┘
┌─────┬─────┬─────┬─────┬─────┐
│  🏠 │  📋 │  ⏰ │  🏆 │  👤 │
│Home │Proj │Queue│Lead │Prof │
└─────┴─────┴─────┴─────┴─────┘
```

**2. Swipe Gestures**
- Swipe left/right: Navigate tabs
- Swipe down: Refresh
- Swipe notification: Dismiss

**3. Mobile Forms**
- One input per screen (wizard style)
- Large touch targets (44x44px minimum)
- Native inputs (date, number)
- Sticky CTA button at bottom

**4. Mobile Session Registration**
```
╔══════════════════════════╗
║ Nusantara Traders        ║
╠══════════════════════════╣
║ 📅 Dec 5, 7:00 PM       ║
║ 📍 Community Hall        ║
║ 👥 2/4 spots left        ║
║                          ║
║ [Register] (Full width)  ║
╚══════════════════════════╝
```

**5. Mobile Feedback Form**
- Star ratings (large tap targets)
- Expandable text areas
- Auto-save progress
- "Save draft" prominent

**6. PWA Features**
- Add to home screen
- Offline project viewing
- Push notifications for sessions
- Background sync for drafts

---

## Visual Design Examples

### Dashboard (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ BoardGameBoost         🔔(3)  🔍  [👤 Sari]              │
├──────┬──────────────────────────────────────────────────────┤
│      │  Welcome back, Sari!                                 │
│  📊  │  Here's your design journey today.                   │
│ Dash │                                                       │
│ board│  ┌─────────┬─────────┬─────────┬─────────┐          │
│      │  │ 🏆 1250 │ 📊 340  │ 🎮 3    │ ⭐ Prem │          │
│ ────│  │  Points │ Testing │Projects │  ium   │          │
│  📋  │  └─────────┴─────────┴─────────┴─────────┘          │
│ Proj │                                                       │
│ ects │  Your Active Projects                                │
│      │  ┌──────────────┬──────────────┬──────────────┐     │
│ ────│  │ Nusantara    │ Wayang       │ Gado-Gado    │     │
│  ⏰  │  │ Traders      │ Legends      │ Grab         │     │
│ Queue│  │ [Playtest]   │ [Refining]   │ [Concept]    │     │
│      │  │ Next: Submit │ Next: Iter   │ Next: Proto  │     │
│ ────│  └──────────────┴──────────────┴──────────────┘     │
│  🏆  │                                                       │
│Leader│  Upcoming Playtests                                  │
│ board│  [Show all sessions →]                               │
│      │                                                       │
└──────┴──────────────────────────────────────────────────────┘
```

### Project Detail (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Projects              [Edit] [Share] [•••]        │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────┐  Nusantara Traders           [Playtest]  │
│ │               │  by Sari Utama                            │
│ │  Game Image   │                                           │
│ │               │  A medium-weight euro game about spice    │
│ └───────────────┘  trading in the ancient archipelago...    │
│                                                              │
│ [●]───[●]───[●]───[ ]───[ ]───[ ]                          │
│ Concept  Prototype  Playtesting  Refining  Pitching Published│
│                     ↑ You are here                          │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🎯 Next Steps                                           ││
│ │ ✅ Prototype complete                                   ││
│ │ ⚠️  In playtest queue (Priority: 245, Wait: ~2 weeks)  ││
│ │ ☐ Collect feedback from session                        ││
│ ├─────────────────────────────────────────────────────────┤│
│ │             [Prepare for Playtest] →                    ││
│ └─────────────────────────────────────────────────────────┘│
│                                                              │
│ [Details] [Feedback (3)] [Iterations (2)] [Materials (4)]   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ... tab content ...                                     ││
│ └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Priority

### Phase 1: Critical UX (Sprints 1-2)
1. ✅ Stage progress indicator component
2. ✅ Next action panel component
3. ✅ Form validation and feedback
4. ✅ Loading states and skeletons
5. ✅ Toast notifications

### Phase 2: Enhanced Experience (Sprints 3-4)
6. Feedback visualization dashboard
7. Smart notifications center
8. Onboarding tour
9. Mobile optimization
10. Gamification animations

### Phase 3: Polish & Delight (Sprints 5-6)
11. Micro-interactions library
12. Advanced animations
13. PWA features
14. Accessibility audit & fixes
15. Performance optimization

---

**Document Status:** Living document
**Last Updated:** 2025-11-18
**Next Review:** After Phase 1 UX testing
