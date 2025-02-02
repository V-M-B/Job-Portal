import createSupabaseClient from '@/utils/supabase';

// Fetch Companies
export async function getCompanies(token) {
  const supabase = createSupabaseClient(token);
  const { data, error } = await supabase.from('companies').select('*');

  if (error) {
    console.error('Error fetching Companies:', error);
    return null;
  }

  return data;
}
