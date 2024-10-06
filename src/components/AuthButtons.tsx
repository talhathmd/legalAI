"use client";
import { useEffect } from "react";
import { withAuthInfo, useRedirectFunctions, useLogoutFunction, WithAuthInfoProps } from "@propelauth/react";
import { buttonVariants } from "@/components/ui/button"; // Assuming buttonVariants is in this file
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Using react-feather for the arrow icon
//import { fetchUser } from "@/lib/actions/user.actions"; // Ensure the path is correct
import { useRouter } from "next/navigation"; // Import useRouter

const YourApp = withAuthInfo((props: WithAuthInfoProps) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions();
  const router = useRouter(); // Initialize useRouter

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       if (props.isLoggedIn && props.user) {
//         try {
//           const userInfo = await fetchUser(props.user.userId); // Fetch user info using userId
//           if (!userInfo?.onboarded) {
//             router.push("/onboarding"); // Redirect to onboarding if not onboarded
//           } else {
//             router.push("/dashboard"); // Redirect to dashboard if onboarded
//           }
//         } catch (error) {
//           console.error("Error fetching user information:", error);
//         }
//       }
//     };

//     checkOnboardingStatus();
//   }, [props.isLoggedIn, props.user, router]);

  if (props.isLoggedIn) {
    return (
      <div className="space-x-3">
        <button
          className={buttonVariants({
            size: "sm",
            className: "mt-1",
          })}
          onClick={() => router.push("/account")} // Navigate to account page
        >
          Account
        </button>
        <button
          className={buttonVariants({
            size: "sm",
            className: "mt-1",
          })}
          onClick={() => logoutFunction(true)}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="space-x-3">
        <button
          className={buttonVariants({
            size: "sm",
            className: "mt-1",
          })}
          onClick={() => redirectToLoginPage()}
        >
          Login
        </button>
        
        {/* "Get Started" button with ArrowRight icon and redirect */}
        <Link
          className={buttonVariants({
            size: "sm",
            className: "mt-1 flex items-center", // Flex and items-center to align icon with text
          })}
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            redirectToSignupPage(); // Use redirect to signup page
          }}
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }
});

export default YourApp;
