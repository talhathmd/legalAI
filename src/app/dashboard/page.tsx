"use client";
import { withAuthInfo, useRedirectFunctions, useLogoutFunction, WithAuthInfoProps } from '@propelauth/react';
import { useOnboardingCheck } from '@/components/hooks/useOnboarding'; // Adjust the import path as needed

const Dashboard = withAuthInfo((props: WithAuthInfoProps) => {
    const logoutFunction = useLogoutFunction();
    const { redirectToLoginPage } = useRedirectFunctions();

    // Redirect if not logged in
    if (!props.isLoggedIn) {
        redirectToLoginPage();
        return null; // Prevent further rendering
    }

    // Use the onboarding check hook with the user object
    useOnboardingCheck(props.isLoggedIn, props.user); // Pass the entire user object

    return (
        <div>
            <p>{props.user.userId}</p>
            <p>{props.user.email}</p>
            <button onClick={() => redirectToLoginPage()}>Account</button>
            <button onClick={() => logoutFunction(true)}>Logout</button>
        </div>
    );
});

export default Dashboard;
