import { useSession } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { getJobs } from '../api/apiJobs'
import useFetch from '@/hooks/use-fetch'

export default function JobListing() {
    const {fn:fnJobs,
        data:dataJobs,
        loading:loadingJobs,
        }= useFetch(getJobs,{})
    
        console.log(dataJobs);
        

        useEffect(() => {
            fnJobs()
        }, [])
    
    return (
        <div>
            jobListing
        </div>
    )
}
