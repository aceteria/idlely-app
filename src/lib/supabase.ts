import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdrpwodkvavcphvthxxj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcnB3b2RrdmF2Y3BodnRoeHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjMzNzAsImV4cCI6MjA3NzIzOTM3MH0.vYIkVu91aMKKmpvBqALBsRSDwSB28mGfiGTPJ7FInDM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  active_theme_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high';
  target_date?: string;
  ai_insights?: any;
  progress: number;
  confidence_score?: number;
  ai_category?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  user_id: string;
  goal_id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  ai_scheduled_time?: string;
  estimated_duration?: number;
  confidence_score?: number;
  ai_category?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  preview_url?: string;
  price: number; // Stored in dollars (e.g., 2.99)
  theme_config: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
  };
  is_premium: boolean;
  created_at: string;
}

export interface UserTheme {
  id: string;
  user_id: string;
  theme_id: string;
  purchase_date: string;
  amount_paid: number;
  stripe_payment_id?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: 'assignment' | 'exam' | 'goal' | 'custom' | 'class' | 'meeting';
  color?: string;
  is_all_day: boolean;
  recurrence_rule?: string;
  location?: string;
  reminder_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface AcademicActivity {
  id: string;
  user_id: string;
  item_type: 'assignment' | 'test' | 'exam' | 'quiz' | 'remedial' | 'project' | 'goal' | 'event';
  title: string;
  description?: string;
  due_date?: string;
  estimated_duration?: number;
  detected_language?: string;
  original_text?: string;
  confidence_score?: number;
  ai_category?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ConversationThread {
  id: string;
  user_id: string;
  title: string;
  summary?: string;
  message_count: number;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationMessage {
  id: string;
  thread_id: string;
  user_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  message_type: 'text' | 'file' | 'image' | 'system';
  file_url?: string;
  file_name?: string;
  file_type?: string;
  metadata?: any;
  created_at: string;
}

export interface FileUpload {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size_bytes: number;
  storage_path: string;
  public_url?: string;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  extracted_text?: string;
  detected_language?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}


// Phase 5 & 6 Types
export interface AIFeedback {
  id: string;
  user_id: string;
  inbox_item_id?: string;
  feedback_type: 'thumbs_up' | 'thumbs_down' | 'text';
  rating?: number; // 1 or -1
  feedback_text?: string;
  ai_response?: string;
  original_input?: string;
  created_at: string;
  metadata?: any;
}

export interface AIRecommendation {
  id: string;
  user_id: string;
  recommendation_type: 'study_schedule' | 'optimal_time' | 'priority_task';
  recommendation_data: any;
  status: 'active' | 'dismissed' | 'completed';
  created_at: string;
  expires_at?: string;
  metadata?: any;
}

export interface StudyAnalytics {
  id: string;
  user_id: string;
  session_date: string;
  subject?: string;
  duration_minutes: number;
  focus_score?: number;
  interruptions?: number;
  completion_rate?: number;
  created_at: string;
  metadata?: any;
}

export interface StreakHistory {
  id: string;
  user_id: string;
  streak_date: string;
  streak_count: number;
  streak_type: 'study' | 'assignment' | 'goal';
  was_broken: boolean;
  created_at: string;
}

export interface CountryPricing {
  id: string;
  country_code: string;
  country_name: string;
  currency_code: string;
  base_price_usd: number;
  local_price: number;
  exchange_rate?: number;
  updated_at: string;
}