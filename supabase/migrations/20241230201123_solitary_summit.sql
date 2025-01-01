/*
  # Add day column to waypoints table

  1. Changes
    - Add `day` column to waypoints table to track which day a waypoint belongs to
    - Make the column nullable to support existing data
    - Add index on (journey_id, day) for faster queries

  2. Notes
    - Existing waypoints will have NULL in the day column
    - The day column stores the date as TEXT in ISO format (YYYY-MM-DD)
*/

-- Add day column
ALTER TABLE waypoints 
ADD COLUMN IF NOT EXISTS day text;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_waypoints_journey_day 
ON waypoints(journey_id, day);