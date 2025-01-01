// Extend existing types
import { Database } from './supabase';

export type Journey = Database['public']['Tables']['journeys']['Row'] & {
  start_date?: string;
  end_date?: string;
  daily_entries?: DailyEntry[];
};

export type DailyEntry = {
  date: string;
  description: string;
  estimated_time: number; // in hours
  estimated_distance: number; // in nautical miles
  weather_conditions?: string;
  accommodation?: string;
  points_of_interest?: string[];
};

export type JourneyInsert = Database['public']['Tables']['journeys']['Insert'] & {
  start_date?: string;
  end_date?: string;
};

export type JourneyUpdate = Database['public']['Tables']['journeys']['Update'] & {
  start_date?: string;
  end_date?: string;
};

export type JourneyWithAuthor = Journey & {
  author: {
    username: string;
    full_name: string;
  };
};

export type JourneyStatus = 'draft' | 'published';