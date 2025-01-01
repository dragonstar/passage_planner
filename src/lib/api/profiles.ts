import { supabase } from '../supabase';

export async function createProfile(userId: string, data: { username?: string; full_name?: string }) {
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      username: data.username,
      full_name: data.full_name,
    });

  if (error) throw error;
}