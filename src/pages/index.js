import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import DashboardPage from './dashboard';

export default function WelcomePage () {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div>
      <h1 className="text-2xl mt-6 ml-6 font-bold bg-center">Welcome to Present Manager website!</h1>
      <div className="mt-4">
        <SignedIn>
          <UserButton />
          Welcome! <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 ml-6 mt-6" />
        </SignedOut>
      </div>
      <button
        type="submit"
        className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-500 disabled:opacity-50 ml-6 mt-6"
        onClick={handleGoToDashboard}
      >
        Go to dashboard
      </button>
    </div>
  );
};