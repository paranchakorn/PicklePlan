export type Language = 'TH' | 'EN';

export type BodyCondition = 'tired' | 'sore' | 'stiff' | 'fresh';
export type TimeAvailable = 'short' | 'long'; // short: 10-15 min, long: 30-60 min
export type Bottleneck =
  | 'mobility'
  | 'footwork'
  | 'strength'
  | 'ready_position'
  | 'serve'
  | 'soft_touch'
  | 'wall_reps'
  | 'match_warmup'
  | 'recovery';

export interface Exercise {
  nameEn: string;
  nameTh: string;
  durationOrSetsEn: string;
  durationOrSetsTh: string;
  durationSeconds?: number; // helper for timers
}

export interface SessionPlan {
  id: number;
  slug: string;
  titleEn: string;
  titleTh: string;
  useWhenEn: string;
  useWhenTh: string;
  goalEn: string;
  goalTh: string;
  coachRuleEn: string;
  coachRuleTh: string;
  easyExercises: Exercise[];
  easyDurationRange: string;
  fullExercises: Exercise[];
  fullDurationRange: string;
  imageUrl?: string;
  fallbackUrl?: string;
  easyImageUrl?: string;
  fullImageUrl?: string;
}

export interface TrainingLog {
  id: string;
  date: string; // ISO string
  sessionId: number;
  sessionTitle: string;
  version: 'easy' | 'full';
  notes?: string;
}
