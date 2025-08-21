import type { User, GameProject, PlayTestSession, QueueEntry, Feedback, PointTransaction, Badge as BadgeType, UserBadge, GameIteration } from './types';

export const currentUser: User = {
  id: 'user-1',
  email: 'sari.utama@example.com',
  displayName: 'Sari Utama',
  avatarUrl: 'https://placehold.co/100x100.png',
  membershipTier: 'premium',
  membershipStatus: 'active',
  membershipExpiry: new Date('2025-08-15'),
  joinDate: new Date('2022-01-20'),
  totalContributionPoints: 1250,
  totalTestingPoints: 340,
};

export const users: User[] = [
    currentUser,
    {
        id: 'user-2',
        email: 'budi.perkasa@example.com',
        displayName: 'Budi Perkasa',
        avatarUrl: 'https://placehold.co/100x100.png',
        membershipTier: 'basic',
        membershipStatus: 'active',
        membershipExpiry: new Date('2025-06-30'),
        joinDate: new Date('2023-02-10'),
        totalContributionPoints: 850,
        totalTestingPoints: 210,
    },
    {
        id: 'user-3',
        email: 'citra.kirana@example.com',
        displayName: 'Citra Kirana',
        avatarUrl: 'https://placehold.co/100x100.png',
        membershipTier: 'premium',
        membershipStatus: 'active',
        membershipExpiry: new Date('2025-11-01'),
        joinDate: new Date('2021-11-15'),
        totalContributionPoints: 1520,
        totalTestingPoints: 450,
    },
    {
        id: 'user-4',
        email: 'dewi.lestari@example.com',
        displayName: 'Dewi Lestari',
        avatarUrl: 'https://placehold.co/100x100.png',
        membershipTier: 'basic',
        membershipStatus: 'expired',
        membershipExpiry: new Date('2024-03-01'),
        joinDate: new Date('2023-03-01'),
        totalContributionPoints: 300,
        totalTestingPoints: 80,
    }
];

export const gameProjects: GameProject[] = [
    {
        id: 'proj-1',
        designerId: 'user-1',
        title: 'Nusantara Traders',
        description: 'A medium-weight euro game about spice trading in the ancient Indonesian archipelago. Players manage their ships, trade resources, and fulfill contracts to gain the most prestige.',
        stage: 'playtesting',
        playerCount: { min: 2, max: 4 },
        playTime: 90,
        complexity: 4,
        mechanics: ['economic', 'pick-up-and-deliver', 'set-collection'],
        currentVersion: '1.3a',
        materials: [{ name: 'Rulebook v1.3a.pdf', url: '#', type: 'application/pdf', size: 2300000 }],
        createdAt: new Date('2023-05-10'),
        updatedAt: new Date(),
        isActive: true,
    },
    {
        id: 'proj-2',
        designerId: 'user-2',
        title: 'Wayang Legends',
        description: 'A 2-player card dueling game based on the shadow puppet folklore of Java. Summon heroes and cast powerful spells to defeat your opponent.',
        stage: 'refining',
        playerCount: { min: 2, max: 2 },
        playTime: 30,
        complexity: 2,
        mechanics: ['card-drafting', 'hand-management', 'take-that'],
        currentVersion: '2.1',
        materials: [],
        createdAt: new Date('2023-09-01'),
        updatedAt: new Date(),
        isActive: true,
    },
    {
        id: 'proj-3',
        designerId: 'user-3',
        title: 'Borobudur Builders',
        description: 'A cooperative puzzle game where players work together to reconstruct the magnificent Borobudur temple. Features 3D-stacking components and variable player powers.',
        stage: 'pitching',
        playerCount: { min: 1, max: 4 },
        playTime: 60,
        complexity: 3,
        mechanics: ['cooperative', 'tile-placement', 'pattern-building'],
        currentVersion: '3.0 (Final)',
        materials: [{ name: 'Sell Sheet.pdf', url: '#', type: 'application/pdf', size: 1200000 }],
        createdAt: new Date('2022-11-20'),
        updatedAt: new Date(),
        isActive: true,
        publishedAt: new Date('2024-08-01'),
    },
    {
        id: 'proj-4',
        designerId: 'user-1',
        title: 'Gado-Gado Grab',
        description: 'A fast-paced, real-time party game about making the best Indonesian salad. Players grab ingredient cards from a central market. Simple, chaotic fun!',
        stage: 'concept',
        playerCount: { min: 3, max: 6 },
        playTime: 15,
        complexity: 1,
        mechanics: ['real-time', 'set-collection', 'party-game'],
        currentVersion: '0.1',
        materials: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
    },
];

export const playtestSessions: PlayTestSession[] = [
    {
        id: 'session-1',
        gameProjectId: 'proj-1',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        maxPlayers: 4,
        registeredPlayers: ['user-2', 'user-3'],
        status: 'scheduled',
        venue: 'Community Hall - Table 1',
        notes: 'Testing new contract balancing rules.',
        facilitatorId: 'user-1',
    },
    {
        id: 'session-2',
        gameProjectId: 'proj-2',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        maxPlayers: 2,
        registeredPlayers: [],
        status: 'scheduled',
        venue: 'Online - Discord',
        notes: 'Need to verify the new "Kresna" hero card is not overpowered.',
        facilitatorId: 'user-2',
    },
    {
        id: 'session-3',
        gameProjectId: 'proj-1',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() - 3)),
        maxPlayers: 4,
        registeredPlayers: ['user-2', 'user-3', 'user-4'],
        status: 'completed',
        venue: 'Community Hall - Table 3',
        notes: 'Successful test of v1.2. Players enjoyed the new ship upgrade mechanic.',
        facilitatorId: 'user-1',
    }
];

export const queueEntries: QueueEntry[] = [
    {
        id: 'queue-1',
        gameProjectId: 'proj-1',
        submittedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
        priority: 0, // will be calculated
        status: 'queued',
    },
    {
        id: 'queue-2',
        gameProjectId: 'proj-2',
        submittedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
        priority: 0, // will be calculated
        status: 'queued',
    },
    {
        id: 'queue-3',
        gameProjectId: 'proj-3',
        submittedAt: new Date(new Date().setDate(new Date().getDate() - 30)),
        status: 'completed',
        priority: 0,
    }
];

export const feedbacks: Feedback[] = [
    {
        id: 'feedback-1',
        sessionId: 'session-3',
        gameProjectId: 'proj-1',
        playerId: 'user-2',
        ratings: { fun: 4, clarity: 3, balance: 4, theme: 5, mechanics: 4 },
        comments: {
            liked: 'The theme is amazing and feels very integrated. The ship upgrading is a great touch.',
            disliked: 'The end-game scoring feels a bit confusing. Not sure what the best strategy is.',
            suggestions: 'Maybe a player aid for scoring would help. Or a scoring track on the board.',
            confusing: 'The iconography for the different spices could be more distinct.'
        },
        wouldPlayAgain: true,
        wouldRecommend: true,
        submittedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
        id: 'feedback-2',
        sessionId: 'session-3',
        gameProjectId: 'proj-1',
        playerId: 'user-3',
        ratings: { fun: 5, clarity: 4, balance: 3, theme: 5, mechanics: 5 },
        comments: {
            liked: 'I love the tension of the trading. Every decision feels important.',
            disliked: 'The blue player seems to have a slight advantage with their starting port.',
            suggestions: 'Consider auctioning starting positions or giving different starting resources.',
            confusing: ''
        },
        wouldPlayAgain: true,
        wouldRecommend: true,
        submittedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
];

export const gameIterations: GameIteration[] = [
    {
        id: 'iter-1',
        gameProjectId: 'proj-1',
        version: '1.3a',
        changesDescription: 'Reworked the end-game scoring to be more intuitive based on player feedback. Added a scoring summary to the player aids. Adjusted the starting resources for the blue and red players to improve balance.',
        inspiringFeedback: ['feedback-1', 'feedback-2'],
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
    }
]

export const pointTransactions: PointTransaction[] = [
    { id: 'pt-1', userId: 'user-1', type: 'game_tested', points: 5, description: 'Nusantara Traders tested', createdAt: new Date() },
    { id: 'pt-2', userId: 'user-2', type: 'playtest_given', points: 10, description: 'Tested Nusantara Traders', createdAt: new Date() },
    { id: 'pt-3', userId: 'user-3', type: 'feedback_quality', points: 15, description: 'High-quality feedback on Nusantara Traders', createdAt: new Date() },
    { id: 'pt-4', userId: 'user-1', type: 'iteration_completed', points: 20, description: 'Iteration 1.3a of Nusantara Traders', createdAt: new Date() },
    { id: 'pt-5', userId: 'user-3', type: 'game_published', points: 100, description: 'Borobudur Builders published', createdAt: new Date() },
];

export const badges: BadgeType[] = [
    { id: 'badge-1', name: 'First Feedback', description: 'Submitted your first piece of feedback.', icon: '✍️' },
    { id: 'badge-2', name: 'Prolific Tester', description: 'Participated in 10 playtests.', icon: '🔬' },
    { id: 'badge-3', name: 'Creator', description: 'Created your first game project.', icon: '💡' },
    { id: 'badge-4', name: 'Published Designer', description: 'Successfully published a game.', icon: '🎉' },
];

export const userBadges: UserBadge[] = [
    { userId: 'user-1', badgeId: 'badge-3', earnedAt: new Date() },
    { userId: 'user-1', badgeId: 'badge-1', earnedAt: new Date() },
    { userId: 'user-2', badgeId: 'badge-1', earnedAt: new Date() },
    { userId: 'user-3', badgeId: 'badge-4', earnedAt: new Date() },
];
