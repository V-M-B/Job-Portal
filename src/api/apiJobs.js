import { createClient } from '@supabase/supabase-js';
import { useUser } from "@clerk/clerk-react";
import React from "react";

// Define Supabase configuration
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add this supabaseClient function at the top level, before getJobs
const supabaseClient = (token) => {
  return createClient(supabase_url, supabase_anon_key, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = supabaseClient(token);

  let query = supabase.from('jobs').select('*');

  if (location) {
    query = query.eq('location', location);
  }
  if (company_id) {
    query = query.eq('company_id', company_id);
  }
  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.log('Error fetching Jobs:', error);
    return null;
  }
  return data;
}


// Read Saved Jobs
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// Read single job
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  if(alreadySaved){
    const { data, error } = await supabase  
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
  }




  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// - Add / Remove Saved Job
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return null;
    }

    return data;
  } else {
    // If the job is not saved, add it to saved jobs
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}