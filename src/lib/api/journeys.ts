import { supabase } from '../supabase';
import type { JourneyInsert, JourneyUpdate, JourneyStatus } from '../types/journey';

/**
 * Retrieves a list of journeys with optional status filter
 */
export async function getJourneys(status?: JourneyStatus) {
  const query = supabase
    .from('journeys')
    .select(`
      *,
      author:profiles(username, full_name),
      waypoints(*)
    `)
    .order('updated_at', { ascending: false });

  if (status) {
    query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch journeys: ${error.message}`);
  return data;
}

/**
 * Retrieves a single journey by ID with error handling
 */
export async function getJourney(id: string) {
  // First check if the journey exists
  const { count, error: countError } = await supabase
    .from('journeys')
    .select('*', { count: 'exact', head: true })
    .eq('id', id);

  if (countError) throw new Error(`Failed to check journey: ${countError.message}`);
  if (count === 0) throw new Error('Journey not found');

  // Fetch the journey with related data
  const { data, error } = await supabase
    .from('journeys')
    .select(`
      *,
      author:profiles(username, full_name),
      waypoints(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch journey: ${error.message}`);
  return data;
}

/**
 * Creates a new journey
 */
export async function createJourney(journey: JourneyInsert) {
  const { data, error } = await supabase
    .from('journeys')
    .insert(journey)
    .select()
    .single();

  if (error) throw new Error(`Failed to create journey: ${error.message}`);
  return data;
}

/**
 * Updates an existing journey
 */
export async function updateJourney(id: string, updates: JourneyUpdate) {
  const { data, error } = await supabase
    .from('journeys')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update journey: ${error.message}`);
  return data;
}

/**
 * Deletes a journey
 */
export async function deleteJourney(id: string) {
  const { error } = await supabase
    .from('journeys')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete journey: ${error.message}`);
}

/**
 * Updates journey status
 */
export async function updateJourneyStatus(id: string, status: JourneyStatus) {
  const { data, error } = await supabase
    .from('journeys')
    .update({
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update journey status: ${error.message}`);
  return data;
}