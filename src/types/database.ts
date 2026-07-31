export type SubscriptionTier = 'free' | 'premium';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  branch: string | null;
  year: string | null;
  career_goal: string | null;
  avatar_url: string | null;
  bio: string | null;
  placement_readiness_score: number;
  subscription_tier: SubscriptionTier;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  user_id: string;
  title: string;
  provider: string | null;
  category: string | null;
  skill_level: string | null;
  duration: string | null;
  url: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string | null;
  status: string;
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
  course?: Course | null;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  provider: string | null;
  provider_payment_id: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  tech_stack: string[] | null;
  difficulty: string | null;
  status: string;
  repo_url: string | null;
  demo_url: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string | null;
  title: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
}
