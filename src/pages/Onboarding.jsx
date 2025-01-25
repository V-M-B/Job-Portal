import React from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recrutier" ? "/postjob" : "/job"); 
      })
      .catch((error) => {
        console.log("Error updating user metadata:", error);
      });
  };
  

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
        navigate(user.unsafeMetadata.role === "recrutier" ? "/postjob" : "/job"); 
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4 " width={"100%"}  color="#36d7b7"  />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-32">
        <Button variant="blue" size="xl" className="h-36"
        onClick={()=>{handleSelection("recrutier")}}
        >
          Recrutier
        </Button>

        <Button variant="destructive" size="xl" className="h-36"
        onClick={()=>{handleSelection("candidate")}}
        >
          Candidate
        </Button>
      </div>
    </div>
  );
}
