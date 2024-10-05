"use client";
import { withAuthInfo, useRedirectFunctions, useLogoutFunction, WithAuthInfoProps } from '@propelauth/react';
import { useRouter } from "next/navigation";

const Dashboard = withAuthInfo((props: WithAuthInfoProps) => {
    const logoutFunction = useLogoutFunction();
    const { redirectToLoginPage } = useRedirectFunctions();
    const router = useRouter();

    // Redirect if not logged in
    if (!props.isLoggedIn) {
        redirectToLoginPage();
        return null; // Prevent further rendering
    }
   



    // TODO MongoDB Onboarding
    // else {
    //     router.push('./onboarding');
    // }
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
