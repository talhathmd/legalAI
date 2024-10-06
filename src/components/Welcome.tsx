"use client";

import { useEffect } from "react";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useRouter } from "next/navigation";

function WelcomeContent(props: WithAuthInfoProps) {
  const router = useRouter();

  // Log the full user object to see what fields are available
  useEffect(() => {
    if (props.isLoggedIn && props.user) {
      console.log("Full user object:", props.user); // Check what's available in props.user
    }
  }, [props.isLoggedIn, props.user]);

  // Update MongoDB with user details after login
  const handleStart = async () => {
    try {
      const response = await fetch("/api/auth/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: props.user?.userId,  // Make sure this field exists
          username: props.user?.username || "DefaultUsername",  // Use a fallback for username if not present
          email: props.user?.email,  // Use email from the user object
        }),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log("User successfully added or updated:", responseData);
      } else {
        console.error("Error from server:", responseData.error);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        {props.isLoggedIn && props.user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to LegalAI!</h1>
            {/* <p className="mb-6 text-gray-600">Your User ID: {props.user.userId}</p>
            <p className="mb-6 text-gray-600">Your Email: {props.user.email}</p>
            <p className="mb-6 text-gray-600">Your Username: {props.user.username || "Not provided"}</p> */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        ) : (
          <div>Please log in to view your details.</div>
        )}
      </div>
    </div>
  );
}

export default withAuthInfo(WelcomeContent);
