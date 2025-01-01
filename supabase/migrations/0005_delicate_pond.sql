/*
  # Add journey date fields

  1. Changes
    - Add start_date and end_date columns to journeys table
    - Update existing journey_date to start_date for data consistency
  
  2. Notes
    - Preserves existing data by copying journey_date to start_date
    - Adds end_date defaulting to start_date for single-day journeys
*/

-- Add new date columns
ALTER TABLE journeys
ADD COLUMN start_date date,
ADD COLUMN end_date date;

-- Copy existing journey_date to start_date
UPDATE journeys
SET start_date = journey_date,
    end_date = journey_date
WHERE journey_date IS NOT NULL;

-- Make start_date required
ALTER TABLE journeys
ALTER COLUMN start_date SET NOT NULL,
ALTER COLUMN end_date SET NOT NULL;