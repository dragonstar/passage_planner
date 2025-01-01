/*
  # Create journeys table and related schemas

  1. New Tables
    - `journeys`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `status` (enum: draft, published)
      - `author_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp)
      - `journey_date` (date)
    - `waypoints`
      - `id` (uuid, primary key)
      - `journey_id` (uuid, references journeys)
      - `name` (text)
      - `lat` (float)
      - `lng` (float)
      - `order` (integer)
      - `notes` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Create journey status enum
CREATE TYPE journey_status AS ENUM ('draft', 'published');

-- Create journeys table
CREATE TABLE IF NOT EXISTS journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  status journey_status DEFAULT 'draft',
  author_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  journey_date date
);

-- Create waypoints table
CREATE TABLE IF NOT EXISTS waypoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid REFERENCES journeys(id) ON DELETE CASCADE,
  name text NOT NULL,
  lat float NOT NULL,
  lng float NOT NULL,
  "order" integer NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE waypoints ENABLE ROW LEVEL SECURITY;

-- Journeys policies
CREATE POLICY "Users can read published journeys"
  ON journeys
  FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Users can create their own journeys"
  ON journeys
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own journeys"
  ON journeys
  FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own journeys"
  ON journeys
  FOR DELETE
  USING (auth.uid() = author_id);

-- Waypoints policies
CREATE POLICY "Users can read waypoints of visible journeys"
  ON waypoints
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM journeys
      WHERE journeys.id = waypoints.journey_id
      AND (journeys.status = 'published' OR journeys.author_id = auth.uid())
    )
  );

CREATE POLICY "Users can modify waypoints of their journeys"
  ON waypoints
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM journeys
      WHERE journeys.id = waypoints.journey_id
      AND journeys.author_id = auth.uid()
    )
  );