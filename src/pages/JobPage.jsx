import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getSingleJob } from '../api/apiJobs';
import { BarLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { useState } from 'react';

export default function JobPage() {
    const {isloaded,user}=useUser();
    const {id}=useParams();

    const {
        loading: loadingJobs,
        data: jobs,
        fn: fnJobs,
      } = useFetch(getSingleJob, {
        job_id:id,
      });

      useEffect(() => {
        if (isloaded) fnJobs();
      }, [isloaded]);

      if(!isloaded || loadingJobs)
      {
        return <BarLoader className="mb-4 " width={"100%"}  color="#36d7b7"  />
      }

    return (
        <>
            JobPage
        </>
    )
}
