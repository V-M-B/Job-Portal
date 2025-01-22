import React from 'react'

export  async function getJobs(token) {
    const supabase =await supabaseClient(token);
    

    let query = supabase.from(`job`).select("*")
    
    
    const {data, error} =await query;

    if(error){
        console.log("Error fetching Jobs:",error);
        return null;
        
    }
    return data;
}
