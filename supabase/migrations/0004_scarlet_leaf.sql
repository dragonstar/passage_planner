/*
  # Update profile policies

  1. Changes
    - Add insert policy for profiles to allow users to create their own profile
    - Update existing policies for better clarity

  2. Security
    - Users can only insert their own profile
    - Maintains existing read/update restrictions
*/

-- Drop existing policies to recreate them with better names
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate policies with better names and clarity
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);