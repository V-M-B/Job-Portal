import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import React from 'react';

import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";


import { getCompanies } from "../api/apiCompany";
import { getJobs } from "@/api/apiJobs";


const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();



  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });


  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handelSearch=()=>{
    
  }

  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

    <form onSubmit={handelSearch}>
    <Input type="text" 
    placeholder="Search for a job by title"
    className="h-full flex-1 px-4 text-md"
    />
    </form>





      {/* Add Filteres */}

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
         {console.log("Jobs data:", jobs)}
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job}
              savedInit={job?.saved?.lenght>0}
              />
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;