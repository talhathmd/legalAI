"use client";

import { useEffect, useState } from "react";
import { RedirectToLogin, useAuthInfo } from "@propelauth/react"; // Import the hook for auth info
import { useRouter } from "next/navigation";

// async function submitOnboardingData(userId: string, email: string, name: string) {
//   // Replace this URL with your actual API endpoint to save data to MongoDB
//   const response = await fetch("/api/onboarding", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ userId, email, name }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to submit onboarding data");
//   }
// }

function OnboardingPage() {
  const { isLoggedIn, user } = useAuthInfo(); // Get login status and user data
  const router = useRouter();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

  useEffect(() => {
    async function checkOnboardingStatus() {
      // If the user is not logged in, redirect to the login page
      if (!isLoggedIn) {
        RedirectToLogin;
        return;
      }
      // Check if the user is already onboarded
    //   if (user.onboarded) {
    //     router.push("/dashboard"); // Redirect to dashboard if already onboarded
    //   }
    }
    checkOnboardingStatus();
  }, [isLoggedIn, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submission state to true
    
    // try {
    //   await submitOnboardingData(user.userId, user.email, name); // Send data to the backend
    //   // Optionally, you can set the onboarded status to true in your user object or database here.
    //   router.push("/dashboard"); // Redirect to dashboard after submission
    // } catch (error) {
    //   console.error("Error submitting onboarding data:", error);
    //   // Handle error (e.g., show an error message to the user)
    // } finally {
    //   setIsSubmitting(false); // Reset submission state
    // }
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-heading2-bold text-light-1">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to use the app.
      </p>
      <form className="mt-9 bg-dark-2 p-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-light-1 mb-2">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

export default OnboardingPage;
