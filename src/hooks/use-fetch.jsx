import { useSession } from "@clerk/clerk-react";
import { useState } from "react";
import React from 'react';

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null); // Use `null` to indicate no data initially.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      if (!session) {
        throw new Error("Session is not available. Ensure you are signed in.");
      }

      const supabaseAccessToken = await session.getToken({
        template: "supabase", // Ensure "supabase" matches your Clerk token template.
      });

      if (!supabaseAccessToken) {
        throw new Error("Failed to retrieve Supabase access token.");
      }

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
    } catch (err) {
      console.error("Error in useFetch:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;







