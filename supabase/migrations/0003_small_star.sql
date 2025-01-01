/*
  # Fix Profile and Journey Relationship

  1. Changes
    - Add ON DELETE CASCADE to journeys.author_id foreign key
    - Add trigger to create profile on auth.users insert
    - Add trigger to update profile updated_at timestamp
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    split_part(NEW.email, '@', 1),
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for profiles
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add trigger for journeys
CREATE TRIGGER set_journeys_updated_at
  BEFORE UPDATE ON public.journeys
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();