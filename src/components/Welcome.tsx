"use client";

import { useEffect } from "react";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

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

    function handleLogin(): void {
        router.push("/")
    }

  return (

    <>
      <div className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            Simplify Legal Document Review with AI!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Welcome to <span className="text-blue-800">LegalAI</span>!
        </h1>

        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Your AI-powered legal assistant is here to simplify contract review and analysis. Start reviewing smarter today!
        </p>

        <button
          className="mt-5 w-200 py-3 px-6 bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 hover:shadow-blue-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
          onClick={handleStart}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>

      {/* Background Blobs for a digital feel */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d399] to-[#60a5fa] opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </>
  );
}

export default withAuthInfo(WelcomeContent);
