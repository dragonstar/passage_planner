import { supabase } from '../supabase';
import type { Waypoint } from '../types/waypoint';

/**
 * Creates multiple waypoints for a journey
 */
export async function createWaypoints(journeyId: string, waypoints: Waypoint[]) {
  if (!waypoints.length) return [];

  const waypointData = waypoints.map((waypoint, index) => ({
    journey_id: journeyId,
    name: waypoint.name,
    lat: waypoint.lat,
    lng: waypoint.lng,
    order: index,
    notes: waypoint.notes || '',
    day: waypoint.day // Add day field
  }));

  const { data, error } = await supabase
    .from('waypoints')
    .insert(waypointData)
    .select();

  if (error) {
    console.error('Error creating waypoints:', error);
    throw new Error(`Failed to create waypoints: ${error.message}`);
  }

  return data;
}

/**
 * Updates waypoints for a journey
 */
export async function updateWaypoints(journeyId: string, waypoints: Waypoint[]) {
  // First delete existing waypoints
  const { error: deleteError } = await supabase
    .from('waypoints')
    .delete()
    .eq('journey_id', journeyId);

  if (deleteError) {
    console.error('Error deleting existing waypoints:', deleteError);
    throw new Error(`Failed to delete existing waypoints: ${deleteError.message}`);
  }

  // If there are no new waypoints, we're done
  if (!waypoints.length) return;

  // Create new waypoints
  return createWaypoints(journeyId, waypoints);
}

/**
 * Retrieves waypoints for a journey
 */
export async function getWaypoints(journeyId: string) {
  const { data, error } = await supabase
    .from('waypoints')
    .select('*')
    .eq('journey_id', journeyId)
    .order('day')
    .order('order');

  if (error) {
    console.error('Error fetching waypoints:', error);
    throw new Error(`Failed to fetch waypoints: ${error.message}`);
  }

  return data;
}