import { useState } from "react";
import { useSession } from "@clerk/clerk-react";

const useFetch=(cb,options={})=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const {session} = useSession();

    const fn=async(...args)=>{
        setLoading(true);
        setError(null);
        setData(null);
        try{
            const supabaseAccessToken=await session.getToken({
                template:"supabase"
            });
           const response = await cb(supabaseAccessToken,options,...args);
           setData(response);
           setData(null);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }

    }
    return {fn,data,loading,error}

}

export default useFetch;